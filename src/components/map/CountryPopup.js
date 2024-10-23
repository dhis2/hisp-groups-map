import React from "react";

const CountryPopup = ({ data }) => {
  const { name, group, supportedBy, email } = data;

  return (
    <>
      <h2>{name}</h2>
      {group && <p>Local group: {group}</p>}
      {supportedBy && <p>Supported by {supportedBy}</p>}
      {email && (
        <p>
          <a href={`mailto:${email}`} rel="noopener noreferrer" target="_blank">
            Contact us
          </a>
        </p>
      )}
      {!(group || supportedBy) && (
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
