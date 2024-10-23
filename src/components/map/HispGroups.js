import { useContext, useEffect } from "react";
import { geoJSON, marker, icon } from "leaflet";
import { MapContext } from "./MapProvider";
import { DataContext } from "../DataProvider";
import { isSameRegion } from "../../utils/data";

const HispGroups = ({ region, onClick }) => {
  const map = useContext(MapContext);
  const data = useContext(DataContext);

  useEffect(() => {
    if (map && data) {
      const features = data.groups
        .filter(
          (country) =>
            isSameRegion(country.region, region) &&
            country.latitude &&
            country.longitude
        )
        .map((group) => ({
          type: "Feature",
          properties: group,
          geometry: {
            type: "Point",
            coordinates: [group.longitude, group.latitude],
          },
        }));

      if (features.length) {
        const markerOptions = {
          icon: icon({
            iconUrl: "map-pin.png",
            iconSize: [34, 34],
            iconAnchor: [17, 34],
          }),
        };

        const infoLayer = geoJSON(features, {
          pointToLayer: (feature, latlng) => marker(latlng, markerOptions),
        }).on("click", onClick);

        map.addLayer(infoLayer);

        return () => {
          infoLayer.off("click", onClick);
          map.removeLayer(infoLayer);
        };
      }
    }
  }, [map, data, region, onClick]);

  return null;
};

export default HispGroups;
