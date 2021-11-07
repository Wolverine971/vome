import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
// import env from "react-dotenv";
import axios from "axios";
import "./map.css";
import * as L from "leaflet";

import { client } from "../../apollo";
import { gql } from "@apollo/client";

  import house from "../../icons/house.svg"
  
  import food from "../../icons/food.svg"
mapboxgl.accessToken =
  "pk.eyJ1IjoiZGp3YXluZTMiLCJhIjoiY2t1b2Q2N2xtMmVsYTJ4bXh5MTVna2kyMiJ9.qs9ffyy-AcnWcLUgEJNO_w";
const Map = (props) => {
  const { selectedState } = props;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-82.0);
  const [lat, setLat] = useState(40.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (selectedState) {
      let json = window.localStorage.getItem(selectedState);
      if (json) {
        console.log(json);
        let parsedJSON = JSON.parse(json);
        var polygon = L.polygon(
          recurseArr(parsedJSON.features[0].geometry.coordinates),
          { color: "red", name: selectedState }
        ).addTo(map.current);
        map.current.fitBounds(polygon.getBounds());
        polygon.on("click", function (e) {
          GetServices(e);
        });
        // load state on map
      } else {
        // go get it
        axios
          .get(
            `https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/0/query?where=&text=${selectedState}&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson`
          )
          .then((resp) => {
            if (resp && resp.data) {
              window.localStorage.setItem(
                selectedState,
                JSON.stringify(resp.data)
              );
              var polygon = L.polygon(
                recurseArr(resp.data.features[0].geometry.coordinates),
                { color: "red", name: selectedState }
              ).addTo(map.current);
              map.current.fitBounds(polygon.getBounds());

              polygon.on("click", function (e) {
                GetServices(e);
              });
            }
          });
      }
    }
  }, [selectedState]);

  useEffect(() => {
    if (map.current) return;
    map.current = L.map("mapid", {
      center: [40.35, -82.0],
      zoom: 13,
    });

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        maxZoom: 15,
        minZoom: 3,
        id: "mapbox/dark-v10", // "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiZGp3YXluZTMiLCJhIjoiY2t1b2Q2N2xtMmVsYTJ4bXh5MTVna2kyMiJ9.qs9ffyy-AcnWcLUgEJNO_w",
      }
    ).addTo(map.current);
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [lat, lng, zoom]);

  function getCords() {
    console.log(
      "lat: " +
        map.current.getCenter().lat.toFixed(4) +
        ", lng: " +
        map.current.getCenter().lng.toFixed(4)
    );
  }

  function recurseArr(newArr) {
    return newArr.map((item) => {
      if (item.length === 2) {
        return [item[1], item[0]];
      } else {
        return recurseArr(item);
      }
    });
  }

  function GetServices(e) {
    client
      .query({
        query: gql`
          query GetServicesInState($state: String, $cursorId: String) {
            getServicesInState(state: $state, cursorId: $cursorId) {
              services {
                name
                category
                description
                coordinates
                address
                city
                state
                zipCode
              }
              count
            }
          }
        `,
        variables: {
          state: e.target.options.name,
          cursorId: "",
        },
      })
      .then((result) => {
        console.log(result);
        if (
          result &&
          result.data &&
          result.data.getServicesInState &&
          result.data.getServicesInState.services
        ) {
            let houseIcon = L.icon({
                iconUrl: house,
                iconSize: 40
              })
              let foodIcon = L.icon({
                iconUrl: food,
                iconSize: 30,
                shadowSize: [68, 95]
              })
          result.data.getServicesInState.services.forEach((service) => {
              
            let marker = L.marker(service.coordinates, {
              title: service.name,
              icon: service.category === "Food" ? foodIcon : houseIcon,
            }).bindPopup(`<div class="card card-1"><h1>${service.name}</h1><h2>${service.description}</h2><h3>Address: ${service.address} </h3></div>`)
            
            .addTo(map.current);
            marker.on("click", function (e) {
              console.log(e);
            });
          });
        }
      });
  }

  return (
    <div className="map-parent-container">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        id="mapid"
        ref={mapContainer}
        className="map-container"
        onClick={getCords}
      ></div>
    </div>
  );
};

export default Map;
