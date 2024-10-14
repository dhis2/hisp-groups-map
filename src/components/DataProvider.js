import React, { createContext, useState, useEffect } from "react";
import { getCountryData, getHispGroupData } from "../utils/data";

export const CountriesContext = createContext();
export const DataContext = createContext();
export const HispGroupContext = createContext();

const DataProvider = ({ children }) => {
  const [countries, setCountries] = useState();
  const [data, setData] = useState();
  const [focus, setFocus] = useState();

  useEffect(() => {
    fetch("./countries.json")
      .then((response) => response.json())
      .then(setCountries)
      .catch((error) => console.log(error));

    getCountryData().then(setData);
  }, []);

  // Load country focus after main data is loaded
  useEffect(() => {
    if (data) {
      getHispGroupData().then(setFocus);
    }
  }, [data]);

  return (
    <>
      <CountriesContext.Provider value={countries}>
        <DataContext.Provider value={data}>
          <HispGroupContext.Provider value={focus}>
            {children}
          </HispGroupContext.Provider>
        </DataContext.Provider>
      </CountriesContext.Provider>
    </>
  );
};

export default DataProvider;
