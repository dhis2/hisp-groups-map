import React from "react";

const HispPopup = ({ data }) => {
  const { name, established, logo, office, website, email } = data;

  return (
    <>
      {logo && <img src={logo} alt={name} />}
      <h2>{name}</h2>
      {office && <p>{office}</p>}
      {established && <p>Established in {established}</p>}
      {website && (
        <p>
          <a
            href={`https://${website}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {website}
          </a>
        </p>
      )}
      {email && (
        <p>
          <a href={`mailto:${email}`} rel="noopener noreferrer" target="_blank">
            Contact us
          </a>
        </p>
      )}
    </>
  );
};

export default HispPopup;
