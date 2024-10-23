import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { DataContext } from "./DataProvider";
import { MapContext } from "./map/MapProvider";
import "./HubModal.css";

// https://www.w3schools.com/howto/howto_css_modals.asp
const HubModal = ({ hub, setCountry }) => {
  const data = useContext(DataContext);
  const map = useContext(MapContext);
  const { name, website, email, logo, description } = data.hubs.find(
    (c) => c.name === hub
  );

  return createPortal(
    <div id="myModal" className="modal" onClick={() => setCountry()}>
      <div className="modal-content" onClick={(evt) => evt.stopPropagation()}>
        <span className="close" onClick={() => setCountry()}>
          &times;
        </span>
        {logo && <img src={logo} alt={name} />}
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
        {description && <p>{description}</p>}
        {email && (
          <p>
            <a
              href={`mailto:${email}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Contact us
            </a>
          </p>
        )}
      </div>
    </div>,
    map.getContainer()
  );
};

export default HubModal;
