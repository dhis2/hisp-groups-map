import React, { createContext, useState, useEffect } from "react";
import { getData } from "../utils/data";

export const CountriesContext = createContext();
export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [countries, setCountries] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    fetch("./countries.json")
      .then((response) => response.json())
      .then(setCountries)
      .catch((error) => console.log(error));

    getData().then(setData);
  }, []);

  return (
    <>
      <CountriesContext.Provider value={countries}>
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
      </CountriesContext.Provider>
    </>
  );
};

export default DataProvider;
