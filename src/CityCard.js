import React, {useContext, useState} from 'react';
import "./index.css";

function CityCard(props) {
	return(
      <li className="city">
        <figure>
          <h2 className="city-name">
            <span>{props.data.name}</span>
            <sup>{props.data.sys.country}</sup>
          </h2>
          <img className="city-icon" src={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/" + props.data.weather[0].icon + ".svg"} alt={props.data.weather[0].main}/>
          <span className="city-temp">{Math.round(props.data.main.temp)}<sup>°C</sup></span>
          <figcaption>{props.data.weather[0].description}</figcaption>
        </figure>
      </li>
	);
}

export default CityCard;