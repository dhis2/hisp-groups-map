import React from "react";

const CountryPopup = ({ data }) => {
  const { name, group, supportedBy } = data;
  const isSupported = !!(group || supportedBy);

  return (
    <>
      <h2>{name}</h2>
      {isSupported ? (
        <p>Supported by {group || supportedBy}</p>
      ) : (
        <p>
          <a
            href="mailto:post@dhis2.org"
            rel="noopener noreferrer"
            target="_blank"
          >
            Contact us for support
          </a>
        </p>
      )}
    </>
  );
};

export default CountryPopup;
