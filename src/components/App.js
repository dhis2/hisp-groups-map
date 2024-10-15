import React, { useState, useEffect } from "react";
import Fullscreen from "./Fullscreen";
import DataProvider from "./DataProvider";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import MapProvider from "./map/MapProvider";
import Graticule from "./map/Graticule";
import Countries from "./map/Countries";
import List from "./List";
import { regions } from "../utils/data";
import "./App.css";

const getInitialRegion = () => {
  const { hash } = window.location;

  if (hash) {
    const cat = hash.substr(1);

    if (regions.find((c) => c.id === cat)) {
      return cat;
    }
  }

  return "all"; // Default region
};

const App = () => {
  const [region, setRegion] = useState(getInitialRegion());
  const [country, setCountry] = useState();

  useEffect(() => {
    window.location.hash = `#${region}`;
  }, [region]);

  return (
    <Fullscreen>
      <DataProvider>
        <Loader />
        <Sidebar region={region} onSelect={setRegion}>
          <MapProvider>
            <Graticule />
            <Countries
              region={region}
              selected={country}
              setCountry={setCountry}
              setRegion={setRegion}
            />
          </MapProvider>
          <List region={region} onClick={setCountry} />
        </Sidebar>
      </DataProvider>
    </Fullscreen>
  );
};

export default App;
