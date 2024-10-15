import React, { useContext, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { popup } from "leaflet";
import { MapContext } from "./MapProvider";
import { DataContext } from "../DataProvider";

const container = document.createElement("div");

const Popup = ({
  latlng,
  region,
  feature,
  legend,
  setCountry,
  setRegion,
  onClose,
}) => {
  const map = useContext(MapContext);
  const data = useContext(DataContext);

  // console.log("Popup", feature);

  const { code, name } = feature;

  const countryData = data?.[code];
  // const focusItem = legend.find((l) => focus?.[CODE]?.[l.code]);
  // const countryFocus = focus[CODE]?.[focusItem?.code];

  const isExploreMode = (legend) => legend[0].code === "_";

  /*
  const legendItems =
    countryData &&
    legend
      .map((i) => ({
        ...i,
        year: data.years.find(
          (y) => countryData[y] && countryData[y].includes(i.code)
        ),
      }))
      .filter((i) => i.year);
  */

  const onPopupOpen = useCallback(
    () => document.body.classList.add("popupopen"),
    []
  );

  const onPopupClose = useCallback(() => {
    document.body.classList.remove("popupopen");
    setCountry();
    onClose();
  }, [setCountry, onClose]);

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
  }, [map, latlng, feature]);

  useEffect(() => {
    if (map) {
      map.on("popupopen", onPopupOpen);
      map.on("popupclose", onPopupClose);
    }

    return () => {
      if (map) {
        map.off("popupopen", onPopupOpen);
        map.off("popupclose", onPopupClose);
      }
    };
  }, [map, onPopupOpen, onPopupClose]);

  /*
  return createPortal(
    <>
      <h2>{name}</h2>
      {legendItems?.map(({ code, name, year }) => (
        <div key={code}>
          {name === "National" ? (
            "National scale since "
          ) : name === "Subnational" ? (
            "Using DHIS2 since "
          ) : (
            <>{name}: Since </>
          )}
          {year}
        </div>
      ))}
      {isExploreMode(legend) && countryData ? (
        <PopupExplore
          country={country}
          letters={countryData[data.lastYear]}
          data={data}
          setCountry={setCountry}
          setRegion={setRegion}
        />
      ) : null}
      {countryFocus ? <PopupFocus data={countryFocus} /> : null}
    </>,
    container
  );
  */

  return createPortal(
    <>
      <h2>{name}</h2>
    </>,
    container
  );
};

export default Popup;
