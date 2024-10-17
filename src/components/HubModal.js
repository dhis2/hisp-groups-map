import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { DataContext } from "./DataProvider";
import { MapContext } from "./map/MapProvider";
import "./HubModal.css";

// https://www.w3schools.com/howto/howto_css_modals.asp
const HubModal = ({ hub, setCountry }) => {
  const data = useContext(DataContext);
  const map = useContext(MapContext);
  const { name, region, website } = data.hubs.find((c) => c.name === hub);
  console.log("HubModal", hub, name, region, website);

  return createPortal(
    <div id="myModal" className="modal" onClick={() => setCountry()}>
      <div className="modal-content" onClick={(evt) => evt.stopPropagation()}>
        <span className="close" onClick={() => setCountry()}>
          &times;
        </span>
        <h2>{name}</h2>
        {website && (
          <a
            href={`https://${website}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {website}
          </a>
        )}
      </div>
    </div>,
    map.getContainer()
  );
};

export default HubModal;
