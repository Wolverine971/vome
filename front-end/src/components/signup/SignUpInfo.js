import React from "react";
import "./SignUpInfo.css";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const Signup_MUTATION = gql`
  mutation Signup(
    $firstName: String
    $lastName: String
    $address: String
    $city: String
    $state: String
    $zipCode: String
    $serviceName: String 
    $category: String 
    $description: String
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      state: $state
      zipCode: $zipCode
      serviceName: $serviceName 
      category: $category 
      description: $description
    ) {
      id
    }
  }
`;

function SignUpInfo() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [signupMutation] = useMutation(Signup_MUTATION);

  function signup() {
    signupMutation({
      variables: { firstName, lastName, address, city, state, zipCode, serviceName, category, description },
    }).then((result) => console.log(result));
  }

  return (
    <div>
      <form className="contact-form">
        <h2 className="contact-title">Contact Info</h2>

        <label className="first-name-label" htmlFor="firstName">
          First Name
        </label>
        <input
          className="first-name-input field-input"
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="last-name-label" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="last-name-input field-input"
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="address-label" htmlFor="address">
          Address
        </label>
        <input
          className="address-input field-input"
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label className="city-label" for="city">
          City
        </label>
        <input
          className="city-input field-input"
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label className="state-label" for="state">
          State
        </label>
        <select
          className="state-input field-input"
          id="state"
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="---">---</option>
          <option value="Alabama">Alabama</option>
          <option value="Alaska">Alaska</option>
          <option value="Arizona">Arizona</option>
          <option value="Arkansas">Arkansas</option>
          <option value="California">California</option>
          <option value="Colorado">Colorado</option>
          <option value="Connecticut">Connecticut</option>
          <option value="Delaware">Delaware</option>
          <option value="District of Columbia">District of Columbia</option>
          <option value="Florida">Florida</option>
          <option value="Georgia">Georgia</option>
          <option value="Guam">Guam</option>
          <option value="Hawaii">Hawaii</option>
          <option value="Idaho">Idaho</option>
          <option value="Illinois">Illinois</option>
          <option value="Indiana">Indiana</option>
          <option value="Iowa">Iowa</option>
          <option value="Kansas">Kansas</option>
          <option value="Kentucky">Kentucky</option>
          <option value="Louisiana">Louisiana</option>
          <option value="Maine">Maine</option>
          <option value="Maryland">Maryland</option>
          <option value="Massachusetts">Massachusetts</option>
          <option value="Michigan">Michigan</option>
          <option value="Minnesota">Minnesota</option>
          <option value="Mississippi">Mississippi</option>
          <option value="Missouri">Missouri</option>
          <option value="Montana">Montana</option>
          <option value="Nebraska">Nebraska</option>
          <option value="Nevada">Nevada</option>
          <option value="New Hampshire">New Hampshire</option>
          <option value="New Jersey">New Jersey</option>
          <option value="New Mexico">New Mexico</option>
          <option value="New York">New York</option>
          <option value="North Carolina">North Carolina</option>
          <option value="North Dakota">North Dakota</option>
          <option value="Northern Marianas Islands">
            Northern Marianas Islands
          </option>
          <option value="Ohio">Ohio</option>
          <option value="Oklahoma">Oklahoma</option>
          <option value="Oregon">Oregon</option>
          <option value="Pennsylvania">Pennsylvania</option>
          <option value="Puerto Rico">Puerto Rico</option>
          <option value="Rhode Island">Rhode Island</option>
          <option value="South Carolina">South Carolina</option>
          <option value="South Dakota">South Dakota</option>
          <option value="Tennessee">Tennessee</option>
          <option value="Texas">Texas</option>
          <option value="Utah">Utah</option>
          <option value="Vermont">Vermont</option>
          <option value="Virginia">Virginia</option>
          <option value="Virgin Islands">Virgin Islands</option>
          <option value="Washington">Washington</option>
          <option value="West Virginia">West Virginia</option>
          <option value="Wisconsin">Wisconsin</option>
          <option value="Wyoming">Wyoming</option>
        </select>

        <label className="zipcode-label" htmlFor="zipcode">
          Zipcode
        </label>
        <input
          className="zipcode-input field-input"
          type="text"
          id="zipcode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />

        <h2 className="service">Service</h2>

        <label className="service-label" htmlFor="serviceName">
          Name of Service
        </label>
        <input
          className="service-input field-input"
          type="text"
          id="serviceName"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />

        <label className="category-label" for="category">
          Category
        </label>
        <select
          className="category-input field-input"
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="---">---</option>
          <option value="Food">Food</option>
          <option value="Shelter">Shelter</option>
        </select>

        <label className="description-label" htmlFor="description">
          Description
        </label>
        <input
          className="description-input field-input"
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
      <button type="button" onClick={signup}>
        Signup
      </button>
    </div>
  );
}

export default SignUpInfo;
