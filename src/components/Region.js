import React from "react";
import Legend from "./Legend";
import "./Region.css";

const Region = ({ id, title, legend, selected, onClick }) => (
  <div
    onClick={() => onClick(id)}
    className={`Region${selected ? " Region-selected" : ""}`}
  >
    <h3>{title}</h3>
    {selected && <Legend region={id} items={legend} />}
  </div>
);

export default Region;
