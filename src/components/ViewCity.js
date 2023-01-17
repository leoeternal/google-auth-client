import React from "react";
import "./city.css";

function ViewCity({ data }) {
  const { cities } = data;
  return (
    <div className="viewcity-wrapper">
      <h1 id="city-title">Cities you've added</h1>
      {cities.map((city, index) => {
        return (
          <p id="city-name" key={index}>
            {city}
            {cities.length - 1 === index ? null : ", "}
          </p>
        );
      })}
    </div>
  );
}

export default ViewCity;
