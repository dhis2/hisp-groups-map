import React, { useContext } from "react";
import { DataContext } from "./DataProvider";
import { isSameRegion } from "../utils/data";
import "./Legend.css";

const Legend = ({ region, items }) => {
  const data = useContext(DataContext);

  return (
    <div className="Legend">
      {items.map(({ type, name, legendName, color, symbol }) => {
        const count = data?.[type].filter((country) =>
          isSameRegion(country.region, region)
        ).length;

        return (
          <div key={name}>
            {color ? (
              <span className="color" style={{ backgroundColor: color }}></span>
            ) : symbol ? (
              <span
                className="symbol"
                style={{ backgroundImage: `url("${symbol}.png")` }}
              ></span>
            ) : (
              <span></span>
            )}{" "}
            {legendName || name}
            {count > 1 && <> ({count})</>}
          </div>
        );
      })}
    </div>
  );
};

export default Legend;
