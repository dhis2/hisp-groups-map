import React, {
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { geoJSON } from "leaflet";
import Popup from "./Popup";
import { MapContext } from "./MapProvider";
import HispGroups from "./HispGroups";
import { CountriesContext, DataContext } from "../DataProvider";
import { categories } from "../../utils/data";
import { getIconPosition } from "../../utils/map";

const noDataColor = "#fff";

const Countries = ({ category, selected, setCountry, setCategory }) => {
  const countries = useContext(CountriesContext);
  const data = useContext(DataContext);
  const map = useContext(MapContext);
  const [layer, setLayer] = useState();
  const [feature, setFeature] = useState();
  const [latlng, setLatlng] = useState();

  const legend = useMemo(
    () => categories.find((c) => c.id === category).legend,
    [category]
  );

  const onClick = useCallback(
    ({ latlng, layer }) => {
      setFeature();
      setLatlng(latlng);
      setFeature(layer.feature.properties);
      setCountry(); // Clear previously clicked country in list
    },
    [setCountry]
  );

  useEffect(() => {
    if (countries) {
      setLayer(
        geoJSON(countries, {
          color: "#555",
          weight: 1,
          fillColor: noDataColor,
          fillOpacity: 0.75,
        }).addTo(map)
      );
    }
  }, [map, countries]);

  useEffect(() => {
    if (layer && legend && data) {
      layer.eachLayer((item) =>
        item.setStyle({
          fillColor: noDataColor,
        })
      );

      layer.eachLayer((item) => {
        const code = item.feature.properties.CODE;

        if (code && data[code]) {
          const country = data[code];
          // const letters = country[lastYear];

          // Use name from Google Spreadsheet
          item.feature.properties.NAME = country.name;

          item.setStyle({
            fillColor: "red",
          });

          // console.log("country", country);

          /*
          legend.forEach(({ code, color }) => {
            if (letters.indexOf(code) !== -1 || code === "_") {
              item.setStyle({
                fillColor: color,
              });
            }
          });
          */
        }
      });
    }
  }, [layer, legend, data]);

  useEffect(() => {
    if (layer) {
      layer.on("click", onClick);
    }
    return () => {
      if (layer) {
        layer.off("click", onClick);
      }
    };
  }, [layer, onClick]);

  useEffect(() => {
    if (selected) {
      const selectedLayer = layer
        .getLayers()
        .find((l) => l.feature.properties.NAME === selected);

      if (selectedLayer) {
        setLatlng(getIconPosition(selectedLayer.feature.geometry).reverse());
        setFeature(selectedLayer.feature.properties);
      }
    }
  }, [layer, selected]);

  return (
    <>
      <HispGroups layer={layer} legend={legend} onClick={onClick} />
      {feature ? (
        <Popup
          category={category}
          country={feature}
          latlng={latlng}
          legend={legend}
          setCountry={setCountry}
          setCategory={setCategory}
          onClose={() => setFeature()}
        />
      ) : null}
    </>
  );
};

export default Countries;
