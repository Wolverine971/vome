import React from "react";
import './Landing.css'

const Landing = () => {
    return (
        <div className="landing">
            <div>
                <h1>Welcome Vome</h1>
                <p>Helping Homeless Veterans find the resources they need.</p>
            </div>
            <div className="landing-btns">
                <button className="btn">Support Seeker</button>
                <button className="btn">Support Giver</button>
            </div>
        </div>
    )
}

export default Landing