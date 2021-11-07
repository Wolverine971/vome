import React from 'react';
import { Link } from "react-router-dom"
import './GiverSignUp.css';
import SignUpInfo from './SignUpInfo';

function GiverSignUp() {
  return (
    <div className='support-giver-sign-up'>
        <div className="header">
          <div>
            <h1>YOU CAN HELP VETERANS</h1>
            <p>Sign up to offer your services, or assistance, to veterans.</p>
          </div>
            <Link to="/seeker" className="btn">Looking for Services?</Link>
        </div>

      <SignUpInfo />

      {/* <form className='availability'>
        <h2 className='availability-header'>Availability</h2>
        <label className='category-label'>Category </label>
        <select className='category-input field-input'>
          <option value="---">---</option>
          <option value="Mental-Health">Mental Health</option>
          <option value="Transportation">Transportation</option>
          <option value="Clothing">Clothing</option>
        </select>

        <label className='time-label'>Time </label>
        <select className='time-input field-input'>
          <option value="---">---</option>
          <option value="Morning">8:00 a.m. - 12:00 p.m.</option>
          <option value="Afternoon">2:00 p.m. - 4:00 p.m.</option>
          <option value="Evening">6:00 p.m. - 12:00 a.m.</option>
        </select>
      </form>

      <form>
        <h2 className='privacy-header'>Privacy Mode</h2>
        <p className='privacy-disclaimer'>
          Turn on Privacy Mode to not display your address and phone number
          (connections can only be made via in-app messaging)
        </p>

        <input type='checkbox' id='privacy-mode-on' />
        <label htmlFor='privacy-mode-on' className='privacy-mode-on'>
          On
        </label>
        <input type='checkbox' id='privacy-mode-off' />
        <label htmlFor='privacy-mode-off'>Off</label>
      </form>

      <button type="submit" className="signup-btn btn">Signup as Helper</button> */}
    </div>
  );
}

export default GiverSignUp;
