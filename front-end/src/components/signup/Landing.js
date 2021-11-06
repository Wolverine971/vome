import React from "react";
import { Link } from "react-router-dom"
import './Landing.css'

const Landing = () => {
    return (
        <div className="landing">
            <div>
                <h1>Welcome Vome</h1>
                <p>Helping Homeless Veterans find the resources they need.</p>
            </div>
            <div className="landing-btns">
                <Link to="/seeker" className="btn">Support Seeker</Link>
                <Link to="/giver" className="btn">Support Giver</Link>
            </div>
        </div>
    )
}

export default Landing