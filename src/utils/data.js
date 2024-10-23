import fetchJsonp from "fetch-jsonp";

export const regions = [
  {
    id: "all",
    group: "explore",
    title: "Where does HISP work?",
    legend: [
      {
        name: "All countries",
        type: "countries",
        color: "#e0a5a8",
        dark: "#b38387",
      },
      { name: "All HISP groups", type: "groups", symbol: "map-pin" },
    ],
  },
  {
    id: "africa",
    group: "region",
    title: "Africa",
    legend: [
      {
        name: "Countries supported",
        type: "countries",
        color: "#8cac5b",
        dark: "#78924b",
      },
      { name: "HISP groups", type: "groups", symbol: "map-pin" },
      {
        name: "HISP hub",
        legendName: "HISP Africa hub",
        type: "hubs",
      },
    ],
  },
  {
    id: "asia",
    group: "region",
    title: "Asia & Middle East",
    legend: [
      {
        name: "Countries supported",
        type: "countries",
        color: "#edd179",
        dark: "#bba760",
      },
      { name: "HISP groups", type: "groups", symbol: "map-pin" },
      {
        name: "HISP hub",
        legendName: "HISP Asia hub",
        type: "hubs",
      },
    ],
  },
  {
    id: "europe",
    group: "region",
    title: "Europe",
    legend: [
      {
        name: "Countries supported",
        type: "countries",
        color: "#3d5fb0",
        dark: "#334b8a",
      },
      { name: "HISP groups", type: "groups", symbol: "map-pin" },
    ],
  },
  {
    id: "americas",
    group: "region",
    title: "Americas",
    legend: [
      {
        name: "Countries supported",
        type: "countries",
        color: "#c892c8",
        dark: "#9f769b",
      },
      { name: "HISP groups", type: "groups", symbol: "map-pin" },
    ],
  },
  /*
  {
    id: "middle-east",
    group: "region",
    title: "Middle East",
    legend: [
      {
        name: "Countries supported",
        type: "countries",
        color: "#f3b08d",
        dark: "#c08c70",
      },
      { name: "HISP groups", type: "groups", symbol: "map-pin" },
    ],
  },
  */
];

export const regionGroups = {
  explore: "Explore the map",
  region: "View by region",
};

export const sidebarregions = regions.map((c) => c.id);

const parseData = ({ values }) => {
  const cols = values[0];
  const codex = cols.indexOf("Code");
  const namex = cols.indexOf("Name");
  const regionx = cols.indexOf("Region");
  const groupx = cols.indexOf("HISP Group");
  const supportedx = cols.indexOf("Supported by");
  const rows = values.slice(1);

  const countries = rows.map((row) => {
    const code = row[codex];
    const name = row[namex];
    const region = row[regionx];
    const group = row[groupx] || null;
    const supportedBy = row[supportedx] || null;

    return {
      code,
      name,
      region,
      group,
      supportedBy,
    };
  });

  return countries;
};

const parseHispGroupData = ({ values }) => {
  const cols = values[0];
  const rows = values.slice(1);
  const groupx = cols.indexOf("HISP Group");
  const regionx = cols.indexOf("Region");
  const officex = cols.indexOf("Office");
  const lngx = cols.indexOf("Longitude");
  const latx = cols.indexOf("Latitude");
  const yearx = cols.indexOf("Established");
  const websitex = cols.indexOf("Website");
  const emailx = cols.indexOf("Email");
  const logox = cols.indexOf("Logo");

  const groups = rows.map((row) => {
    const name = row[groupx];
    const region = row[regionx];
    const office = row[officex] || null;
    const established = row[yearx] || null;
    const website = row[websitex] || null;
    const email = row[emailx] || null;
    const logo = row[logox] || null;
    const longitude = row[lngx] ? Number(row[lngx]) : null;
    const latitude = row[latx] ? Number(row[latx]) : null;

    return {
      name,
      region,
      office,
      established,
      website,
      email,
      logo,
      longitude,
      latitude,
    };
  });

  return groups;
};

const parseHispHubData = ({ values }) => {
  const cols = values[0];
  const rows = values.slice(1);
  const hubx = cols.indexOf("HISP hub");
  const regionx = cols.indexOf("Region");
  const websitex = cols.indexOf("Website");
  const emailx = cols.indexOf("Email");
  const logox = cols.indexOf("Logo");
  const descx = cols.indexOf("Description");

  return rows.map((row) => {
    const name = row[hubx];
    const region = row[regionx];
    const website = row[websitex] || null;
    const email = row[emailx] || null;
    const logo = row[logox] || null;
    const description = row[descx] || null;

    return {
      name,
      region,
      website,
      email,
      logo,
      description,
    };
  });
};

const fetchData = (sheet) =>
  fetchJsonp(
    `https://sheets.googleapis.com/v4/spreadsheets/1VzyIyWnIz3aRaak5SMBlBt0xxNyqIiiNnmrx8d8d1kQ/values/${sheet}?key=AIzaSyDWyCSemDgAxocSL7j9Dy4mi93xTTcPEek`,
    { jsonpCallback: "callback" }
  ).then((response) => response.json());

export const getData = () =>
  Promise.all([
    fetchData("Countries").then(parseData),
    fetchData("HISP groups").then(parseHispGroupData),
    fetchData("HISP hubs").then(parseHispHubData),
  ]).then(([countries, groups, hubs]) => ({ countries, groups, hubs }));

export const isSameRegion = (sheetRegion, region) =>
  region === "all" || sheetRegion.toLowerCase().includes(region);
