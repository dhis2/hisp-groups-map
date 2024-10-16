import React, { useContext, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { popup } from "leaflet";
import CountryPopup from "./CountryPopup";
import HispPopup from "./HispPopup";
import { MapContext } from "./MapProvider";

const container = document.createElement("div");

const Popup = ({ latlng, feature }) => {
  const map = useContext(MapContext);

  const isHispGroup = !feature.code;

  useEffect(() => {
    const { clientWidth, clientHeight } = map.getContainer();
    const maxWidth = clientWidth < 400 ? clientWidth - 100 : 300;
    const maxHeight = clientHeight - 100;
    const offset = [0, feature.code ? 8 : -10];

    if (latlng[0] || latlng.lat) {
      popup({
        maxWidth,
        maxHeight,
        offset,
      })
        .setLatLng(latlng)
        .setContent(container)
        .openOn(map);
    }

    return () => map.closePopup();
  }, [map, latlng, feature]);

  return createPortal(
    isHispGroup ? (
      <HispPopup data={feature} />
    ) : (
      <CountryPopup data={feature} />
    ),
    container
  );
};

export default Popup;
