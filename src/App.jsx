import { useState } from "react";
import routes from "./data/routes";
import stations from "./data/stations";
import "./App.css";

export default function App() {
  const [inputFields, setInputFields] = useState([
    { train: "", start: "", stop: "" },
  ]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);

    console.log(inputFields);
  };

  const addFields = () => {
    let newfield = { train: "", start: "", stop: "" };

    setInputFields([...inputFields, newfield]);
  };

  return (
    <main>
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
              </div>
            );
          })}
          <button onClick={addFields}>Add More...</button>
      </section>
    </main>
  );
}
