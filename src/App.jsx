import { useState } from "react";
import routes from "./data/routes";
import stations from "./data/stations";
import "./App.css";

import Distance from "./components/distance.jsx";
import Driving from "./components/driving.jsx";
import Flying from "./components/flying.jsx";
import States from "./components/states.jsx";
import Summary from "./components/summary.jsx";

//grams co2 per passenger mile
const carbonStats = {
  // https://kleinmanenergy.upenn.edu/news-insights/traveling-across-the-united-states-the-old-fashioned-way/
  amtrak: 360_000 / 3099, //116.2
  // https://kleinmanenergy.upenn.edu/news-insights/traveling-across-the-united-states-the-old-fashioned-way/
  plane: 570_000 / 2402, //237.3
  // per mile https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle#driving
  // avg passengers https://css.umich.edu/publications/factsheets/mobility/personal-transportation-factsheet
  car: 404 / 1.5, //269.33
};

console.log("carbonStats", carbonStats);

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

    const d = R * c; // in meters
    const dMiles = d * 0.000621371; // in miles
    return dMiles;
  };

  const flatAndSort = (array) => {
    //flatten array
    let flatArray = array.flat();
    //remove duplicates
    flatArray = [...new Set(flatArray)];
    //sort
    let sortedArray = flatArray.sort();
    return sortedArray;
  };

  const [inputFields, setInputFields] = useState([
    {
      train: "Acela",
      start: "BAL - Baltimore Penn Station",
      stop: "BAL - Baltimore Penn Station",
      count: 1,
    },
  ]);

  const [results, setResults] = useState({
    completed: false,
    totalDistance: 0,
    totalTrips: 0,
    carbonSavedPlane: 0,
    carbonSavedCar: 0,
    trips: [],
  });

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);

    console.log(inputFields);
  };

  const deleteFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);

    if (data.length === 0)
      data.push({
        train: "Acela",
        start: "BAL - Baltimore Penn Station",
        stop: "BAL - Baltimore Penn Station",
        count: 1,
      });
    setInputFields(data);
  };

  const copyFields = (index) => {
    let data = [...inputFields];
    data.push(JSON.parse(JSON.stringify(data[index])));
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = {
      train: "Acela",
      start: "BAL - Baltimore Penn Station",
      stop: "BAL - Baltimore Penn Station",
      count: 1,
    };
    setInputFields([...inputFields, newfield]);
  };

  const findInbetweenStations = (start, stop, train) => {
    let startStation = start.split(" - ")[0];
    let stopStation = stop.split(" - ")[0];

    for (let i = 0; i < routes[train].length; i++) {
      const trainArray = routes[train][i];
      let startStationIndex = trainArray.indexOf(startStation);
      let stopStationIndex = trainArray.indexOf(stopStation);

      if (startStationIndex === -1 || stopStationIndex === -1) continue;

      let inbetweenStations = [];

      if (startStationIndex < stopStationIndex) {
        inbetweenStations = trainArray.slice(
          startStationIndex,
          stopStationIndex + 1
        );
      } else {
        inbetweenStations = trainArray.slice(
          stopStationIndex,
          startStationIndex + 1
        );
      }

      return inbetweenStations;
    }

    return [];
  };

  const processResults = () => {
    let trips = [];
    let states = [];
    let totalDistance = 0;
    let totalTrips = 0;
    let totalCarbonSavedPlane = 0;
    let totalCarbonSavedCar = 0;

    inputFields.forEach((input) => {
      let train = input.train;
      let start = input.start;
      let stop = input.stop;
      let count = input.count;

      if (train && start && stop) {
        const allStations = findInbetweenStations(start, stop, train);

        let distance = 0;
        allStations.forEach((station, index, arr) => {
          if (!states.includes(stations[station].state)) {
            states.push(stations[station].state);
          }

          if (index === 0 || index === arr.length - 1) return;

          for (let i = 0; i < count; i++) {
            distance += calculateDistanceBetweenCoordinates(
              stations[station].lat, // lat1
              stations[station].lon, // lon1
              stations[arr[index + 1]].lat, // lat2
              stations[arr[index + 1]].lon // lon2
            );
          }
        });

        const carbonSavedPlane =
          distance * carbonStats.plane - distance * carbonStats.amtrak;
        const carbonSavedCar =
          distance * carbonStats.car - distance * carbonStats.amtrak;

        trips.push({
          train,
          start,
          stop,
          distance,
          carbonSavedPlane,
          carbonSavedCar,
        });

        totalDistance += distance;
        totalTrips += 1;
        totalCarbonSavedPlane += carbonSavedPlane;
        totalCarbonSavedCar += carbonSavedCar;
      }
    });

    const final = {
      completed: true,
      totalDistance,
      totalTrips,
      carbonSavedPlane: totalCarbonSavedPlane,
      carbonSavedCar: totalCarbonSavedCar,
      trips,
      states,
    };

    setResults(final);

    console.log(final);
    //console.log(JSON.stringify(final, null, 2));
  };

  return (
    <main>
      <section id="title">
        <h1>Backtrak</h1>
        <p id="slogan">
          How have you <i>Amtraked</i>?
        </p>
        <hr className="solid" />
      </section>

      {results.completed ? (
        <section id="results">
          <div>
            <h2>Results</h2>
            <ul>
              {results.trips.map((trip, index) => {
                return null;
                return <li key={index}>{JSON.stringify(trip, null, 2)}</li>;
              })}
            </ul>
          </div>
          <Distance distance={results.totalDistance} />
          <br />
          <Driving grams={results.carbonSavedCar} />
          <br />
          <Flying grams={results.carbonSavedPlane} />
          <br />
          <States states={results.states} />
          <br />
          <Summary
            states={results.states}
            miles={results.totalDistance}
            trips={results.trips}
          />
        </section>
      ) : (
        <section id="trips">
          <h2>Trips</h2>
          <datalist id="trainList">
            {Object.keys(routes)
              .sort()
              .map((route) => {
                return <option key={`trainList-${route}`} value={route} />;
              })}
          </datalist>
          <datalist id="stationsList">
            {Object.keys(stations).map((stationKey) => {
              return (
                <option
                  key={`trainList-${stationKey}`}
                  value={`${stationKey} - ${stations[stationKey].name}`}
                />
              );
            })}
          </datalist>
          <section>
            {inputFields.map((input, index) => {
              return (
                <div key={index} className="trainSelector">
                  <label htmlFor={`train-${index}`}>
                    Train Name:&nbsp;&nbsp;
                  </label>
                  <select
                    list="trainList"
                    id={`train-${index}`}
                    name="train"
                    value={input.train}
                    onChange={(event) => handleFormChange(index, event)}
                  >
                    {Object.keys(routes)
                      .sort()
                      .map((route) => {
                        return (
                          <option key={`trainList-${route}`} value={route}>
                            {route}
                          </option>
                        );
                      })}
                  </select>
                  <br />
                  <label htmlFor={`origin-${index}`}>
                    Origin Stop:&nbsp;&nbsp;
                  </label>
                  <select
                    list="stationsList"
                    id={`origin-${index}`}
                    name="start"
                    value={input.start}
                    onChange={(event) => handleFormChange(index, event)}
                  >
                    {flatAndSort(routes[input.train])
                      .sort()
                      .map((stationKey) => {
                        return (
                          <option
                            key={`trainList-${stationKey}`}
                            value={`${stationKey} - ${stations[stationKey].name}`}
                          >{`${stationKey} - ${stations[stationKey].name}`}</option>
                        );
                      })}
                  </select>
                  <br />
                  <label htmlFor={`destination-${index}`}>
                    Destination Stop:&nbsp;&nbsp;
                  </label>
                  <select
                    list="stationsList"
                    id={`destination-${index}`}
                    name="stop"
                    value={input.stop}
                    onChange={(event) => handleFormChange(index, event)}
                  >
                    {flatAndSort(routes[input.train])
                      .sort()
                      .map((stationKey) => {
                        return (
                          <option
                            key={`trainList-${stationKey}`}
                            value={`${stationKey} - ${stations[stationKey].name}`}
                          >{`${stationKey} - ${stations[stationKey].name}`}</option>
                        );
                      })}
                  </select>
                  <br />
                  <label htmlFor={`trip-count-${index}`}>
                    Trip Count:&nbsp;&nbsp;
                  </label>
                  <input
                    type="number"
                    id={`trip-count-${index}`}
                    name="count"
                    min={1}
                    defaultValue={1}
                    max={100}
                    onChange={(event) => handleFormChange(index, event)}
                  ></input>
                  <br />
                  <button onClick={() => deleteFields(index)}>Delete</button>
                  &nbsp;
                  <button onClick={() => copyFields(index)}>Copy</button>
                </div>
              );
            })}
          </section>
          <br />
          <button onClick={addFields}>Add More...</button>
          &nbsp;
          <button onClick={processResults}>Calculate</button>
        </section>
      )}
      <a href="https://amtraker.com/privacy.html">Privacy Policy</a>
    </main>
  );
}
