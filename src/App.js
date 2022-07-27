import React, {useContext, useState} from 'react';
import "./index.css";
import CityCard from "./CityCard";

function App() {
  const apiKey = "807225f54428005b49a82f754b9e185c";
  let [value, setvalue] = useState("");
  let [msg, setmsg] = useState("");
  let [cities, setcities] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let correctedvalue = "";
    if (value.includes(",")) {
      correctedvalue = value.split(",")[0] + "," + value.split(",")[1].substring(0,2);
    } else correctedvalue = value;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + correctedvalue + "&appid=" + apiKey + "&units=metric";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod === "404" ||data.cod === "400" ) {
          throw data;
        }
        if (cities.find(element => element.name === data.name && element.sys.country === data.sys.country) === undefined){
          setcities(prevList => [...prevList, data]);
        }
        setvalue("");
        setmsg("");
      })
      .catch(() => {
          setmsg("Please search for a valid city 😩");
          setvalue("");
      });
  }
  const handleChange = (e) => {
    setvalue(e.target.value);
  }

  return (
    <div className="App">
      <section className="top-banner">
        <div className="container">
          <h1 className="heading">Weather Tracker</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={value} placeholder="Search for a city"/>
            <button type="submit">SUBMIT</button>
            <span className="msg">{msg}</span>
          </form>
        </div>
      </section>
      <section className="ajax-section">
        <div className="container">
          <ul className="cities">
            {cities.map((city, index) => (<CityCard key={index} data={city} />))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
