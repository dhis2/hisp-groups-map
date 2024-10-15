import React, { useContext, useMemo } from "react";
import { DataContext } from "./DataProvider";
import "./Legend.css";

const Legend = ({ items }) => {
  const dataContext = useContext(DataContext);
  const data = dataContext?.current;

  const count = useMemo(() => (data ? data.year[data.lastYear] : {}), [data]);

  // {count[code] ? ` (${count[code]})` : ""}
  return (
    <div className="Legend">
      {items.map(({ name, legendName, color, symbol }) => (
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
        </div>
      ))}
    </div>
  );
};

export default Legend;
