import React from "react";
import "./GiverSignUp.css"
import SignUpInfo from "./SignUpInfo";

function GiverSignUp() {
    return (
    <div className="support-giver-sign-up">
        <h1>Support Giver Sign Up</h1>

        <SignUpInfo />

        <form className="availability">
            <h2 className="availability-header">Availability</h2>
                <label className="category-label">Category </label>
                <input type="text" className="category-input field-input" />

                <label className="time-label">Time </label>
                <input type="time" className="time-input field-input" />
        </form>

        <form>
            <h2 className="privacy-header">Privacy Mode</h2>
            <p className="privacy-disclaimer">Turn on Privacy Mode to not display your address and phone number (connections can only be made via in-app messaging)</p>

            <input type="checkbox" id="privacy-mode-on" />
            <label htmlFor="privacy-mode-on" className="privacy-mode-on">On</label>
            <input type="checkbox" id="privacy-mode-off" />
            <label htmlFor="privacy-mode-off">Off</label>
        </form>
    </div>
    )
}

export default GiverSignUp