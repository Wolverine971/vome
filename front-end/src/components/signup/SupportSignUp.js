import React from "react";
import { Link } from "react-router-dom"
import "./SupportSignUp.css"
import Map from "../map/map"
import MapNav from "../mapNav/mapNav"
import {  useState } from "react";

function SupportSignUp() {
    const [selectedState, setSelectedState] = useState("");

    return (
        <div className="support-sign-up">
            <div className="support-header">
                <div className="support-title">
                    <h1>Veterans Find Assistance</h1>
                    <h2 >Search Available Services by State</h2>
                </div>
                <Link to="/giver" className="btn giver-to-service">Add a Service?</Link>
            </div>

            <MapNav setterFunc={setSelectedState} />
            <Map selectedState={selectedState} />
            
        </div>
    )
}

export default SupportSignUp