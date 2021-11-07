import React, { useEffect, useState } from "react";
// import env from "react-dotenv";
import "./mapNav.css";

import { gql, useQuery } from "@apollo/client";

const GETSTATES = gql`
  query getStates {
    getStates
  }
`;

export default function Map(props) {
  const { setterFunc } = props;
  const [selectedState, setSelectedState] = useState("");
  const [availableStates, setSvailableStates] = useState([]);

  const { data } = useQuery(GETSTATES);

  useEffect(() => {
    // apicall
    if (data) {
      setSvailableStates(data.getStates);
    }
    // setSvailableStates(["Florida", "Virginia"]);
  }, [data]);
  function setSelectedStateVal(val) {
    setterFunc(val);
    setSelectedState(val);
  }

  return (
    <div className="map-nav-container">
      <div className="">
        <select
          className="selectedState-input field-input"
          id="selectedState"
          name="selectedState"
          value={selectedState}
          onChange={(e) => setSelectedStateVal(e.target.value)}
        >
          {availableStates.map((state) => {
            return (
              <option value={state} key={state}>
                {state}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
