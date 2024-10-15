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
import { regions } from "../../utils/data";
import { getIconPosition } from "../../utils/map";

const noDataColor = "#fff";

const Countries = ({ region, selected, setCountry, setRegion }) => {
  const countries = useContext(CountriesContext);
  const data = useContext(DataContext);
  const map = useContext(MapContext);
  const [layer, setLayer] = useState();
  const [feature, setFeature] = useState();
  const [latlng, setLatlng] = useState();

  const legend = useMemo(
    () => regions.find((c) => c.id === region).legend[0],
    [region]
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
    if (layer && region && legend && data) {
      const { countries } = data;

      layer.eachLayer((item) => {
        const code = item.feature.properties.code;
        const country = countries.find((c) => c.code === code);

        if (country) {
          item.feature.properties = country;

          item.setStyle({
            fillColor:
              region === "all" ||
              country.region.toLowerCase() === region.replace("-", " ")
                ? legend.color
                : noDataColor,
          });
        }
      });
    }
  }, [layer, region, legend, data]);

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
        .find((l) => l.feature.properties.name === selected);

      if (selectedLayer) {
        setLatlng(getIconPosition(selectedLayer.feature.geometry).reverse());
        setFeature(selectedLayer.feature.properties);
      } else {
        const group = data.groups.find((g) => g.name === selected);

        if (group) {
          setLatlng([group.latitude, group.longitude]);
          setFeature(group);
        }
      }
    }
  }, [layer, data, selected]);

  return (
    <>
      <HispGroups
        region={region}
        layer={layer}
        legend={legend}
        onClick={onClick}
      />
      {feature ? (
        <Popup
          region={region}
          feature={feature}
          latlng={latlng}
          legend={legend}
          setCountry={setCountry}
          setRegion={setRegion}
          onClose={() => setFeature()}
        />
      ) : null}
    </>
  );
};

export default Countries;
