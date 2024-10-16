import React from "react";
import Region from "./Region";
import { regionGroups, regions } from "../utils/data";

const RegionGroup = ({ group, region, onClick }) => (
  <div>
    <h2>{regionGroups[group]}</h2>
    {regions
      .filter((r) => r.group === group)
      .map((item) => (
        <Region
          key={item.id}
          onClick={onClick}
          selected={region === item.id}
          {...item}
        />
      ))}
  </div>
);

export default RegionGroup;
