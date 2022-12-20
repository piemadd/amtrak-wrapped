import { useState } from "react";
import routes from "./data/routes";
import stations from "./data/stations";
import "./App.css";

export default function App() {
  const calculateDistanceBetweenCoordinates = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
  };

  const [inputFields, setInputFields] = useState([
    { train: "", start: "", stop: "" },
  ]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);

    console.log(inputFields);
  };

  const deleteFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);

    if (data.length === 0) data.push({ train: "", start: "", stop: "" });
    setInputFields(data);
  };

  const copyFields = (index) => {
    let data = [...inputFields];
    data.push(data[index]);
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = { train: "", start: "", stop: "" };
    setInputFields([...inputFields, newfield]);
  };

  return (
    <main>
      <h1>Traked</h1>
      <p id="slogan">How has your year <i>Traked</i>?</p>
      <section>
          <datalist id="trainList">
            {routes.map((route) => {
              return <option key={`trainList-${route}`} value={route} />;
            })}
          </datalist>

          <datalist id="stationsList">
            {Object.keys(stations).map((stationKey) => {
              return (
                <option key={`trainList-${stationKey}`} value={`${stationKey} - ${stations[stationKey]}`} />
              );
            })}
          </datalist>

          {inputFields.map((input, index) => {
            return (
              <div key={index} className="trainSelector">
                <label htmlFor={`train-${index}`}>Train Name:&nbsp;&nbsp;</label>
                <input
                  list="trainList"
                  id={`train-${index}`}
                  name="train"
                  value={input.train}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <br />
                <label htmlFor={`origin-${index}`}>Origin Stop:&nbsp;&nbsp;</label>
                <input
                  list="stationsList"
                  id={`origin-${index}`}
                  name="start"
                  value={input.start}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <br />

                <label htmlFor={`destination-${index}`}>Destination Stop:&nbsp;&nbsp;</label>
                <input
                  list="stationsList"
                  id={`destination-${index}`}
                  name="stop"
                  value={input.stop}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <br />

                <button onClick={() => deleteFields(index)}>Delete</button>&nbsp;
                <button onClick={() => copyFields(index)}>Copy</button>
              </div>
            );
          })}
          <button onClick={addFields}>Add More...</button>
      </section>
    </main>
  );
}
