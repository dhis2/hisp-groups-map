import React, { useCallback } from "react";
import { regions } from "../../utils/data";

const PopupExplore = ({ country, letters = "", setRegion, setCountry }) => {
  const onClick = useCallback(
    (region) => {
      setRegion(region);
      setCountry(country.NAME);
    },
    [country, setRegion, setCountry]
  );

  return regions
    .filter((c) => !c.legacy && c.legend.find((l) => letters.includes(l.code)))
    .map(({ id, title, legend }) => {
      const { code, name } = legend.find((l) => letters.includes(l.code));
      return (
        <div className="explore" key={code} onClick={() => onClick(id)}>
          {legend.length > 1 ? (
            <>
              {title}: {name}
            </>
          ) : (
            name
          )}
        </div>
      );
    });
};

export default PopupExplore;
