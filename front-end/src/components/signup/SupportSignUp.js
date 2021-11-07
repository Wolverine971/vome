import React from "react";
import "./SupportSignUp.css"
import Map from "../map/map"
import MapNav from "../mapNav/mapNav"
import {  useState } from "react";

function SupportSignUp() {
    const [selectedState, setSelectedState] = useState("");

    return (
        <div>
            <h1>Veterans Find Assistance</h1>
            <h2 >Search by Category, State, City to see available services</h2>
            <MapNav setterFunc={setSelectedState}  />

            <Map selectedState={selectedState}/>
        </div>
    )
}

export default SupportSignUp