import { useContext, useEffect } from "react";
import { geoJSON, marker, icon } from "leaflet";
import { MapContext } from "./MapProvider";
import { HispGroupContext } from "../DataProvider";
import { getIconPosition } from "../../utils/map";

const HispGroups = ({ layer, legend, onClick }) => {
  const map = useContext(MapContext);
  const groups = useContext(HispGroupContext);

  useEffect(() => {
    if (map && groups) {
      const features = groups
        .filter((group) => group.latitude && group.longitude)
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
            iconSize: [24, 24],
            iconAnchor: [12, 24],
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
  }, [map, groups, onClick]);

  return null;
};

export default HispGroups;
