import React, { useContext, useState } from "react";
import List from "./List";
import { DataContext } from "./DataProvider";
import { regions } from "../utils/data";
import "./ChartList.css";

const ChartListToggle = ({ region, onClick }) => {
  const data = useContext(DataContext);

  return (
    <div className="ChartList">
      <div className="wrapper" style={{ top: 5 }}>
        <List region={region} data={data} onClick={onClick} />
      </div>
    </div>
  );
};

export default ChartListToggle;
