import fetchJsonp from "fetch-jsonp";

// Colors: https://sashamaps.net/docs/resources/20-colors/

export const categories = [
  {
    id: "all",
    group: "explore",
    title: "Where does HISP work?",
    legend: [
      { code: "_", name: "All countries", color: "#0080d4" },
      { code: "n", name: "All HISP groups", color: "#ffe119" },
    ],
    hasChart: false,
  },
  {
    id: "africa",
    group: "region",
    title: "Africa",
    legend: [
      { code: "s", name: "National", color: "#238443" },
      { code: "p", name: "Subnational", color: "#d9f0a3" },
    ],
    hasChart: true,
  },
  {
    id: "america",
    group: "region",
    title: "America",
    legend: [
      { code: "w", name: "Systems using climate data", color: "#008080" },
    ],
    hasChart: false,
  },
  {
    id: "asia",
    group: "region",
    title: "Asia",
    legend: [{ code: "l", name: "DHIS2 for Logistics", color: "#808000" }],
    hasChart: false,
  },
  {
    id: "europe",
    group: "region",
    title: "Europe",
    legend: [{ code: "t", name: "Tracker", color: "#e34a33" }],
    hasChart: true,
  },
];

export const categoryGroups = {
  explore: "Explore the map",
  region: "View by region",
};

export const sidebarCategories = categories.map((c) => c.id);

const parseData = ({ values }) => {
  const cols = values[0];
  const idx = cols.indexOf("Code");
  const namex = cols.indexOf("Name");
  const regionx = cols.indexOf("Region");
  const groupx = cols.indexOf("Has HISP Group");
  const hubx = cols.indexOf("Has HISP Hub");
  const supportedx = cols.indexOf("Supported by");
  const rows = values.slice(1);
  const countries = {};
  let skip = false;

  rows.forEach((row) => {
    const id = row[idx];
    const name = row[namex];
    const region = row[regionx];
    const group = row[groupx] || null;
    const hub = row[hubx] || null;
    const supportedBy = row[supportedx] || null;

    // Loop until first empty id
    if (!id) {
      skip = true;
    }

    if (id && !skip) {
      countries[id] = {
        name,
        region,
        group,
        hub,
        supportedBy,
      };
    }
  });

  return countries;
};

const parseHispGroupData = ({ values }) => {
  const cols = values[0];
  const rows = values.slice(1);
  const groupx = cols.indexOf("HISP Group");
  const lngx = cols.indexOf("Longitude");
  const latx = cols.indexOf("Latitude");
  const letterx = cols.indexOf("Letter");
  const titlex = cols.indexOf("Title");
  const bodyx = cols.indexOf("Body");
  const imageurlx = cols.indexOf("Image url");
  const imagelinkx = cols.indexOf("Image link");
  const youtubeidx = cols.indexOf("YouTube ID");
  const readmorelinkx = cols.indexOf("Read more link");
  const byCountry = {};

  const groups = rows.map((row) => {
    const name = row[groupx];
    const title = row[titlex];
    const body = row[bodyx];
    const imageurl = row[imageurlx];
    const imagelink = row[imagelinkx];
    const youtubeid = row[youtubeidx];
    const readmorelink = row[readmorelinkx];
    const longitude = row[lngx] ? Number(row[lngx]) : null;
    const latitude = row[latx] ? Number(row[latx]) : null;

    return {
      name,
      longitude,
      latitude,
    };
  });

  return groups;
};

const fetchData = (sheet) =>
  fetchJsonp(
    `https://sheets.googleapis.com/v4/spreadsheets/1VzyIyWnIz3aRaak5SMBlBt0xxNyqIiiNnmrx8d8d1kQ/values/${sheet}?key=AIzaSyDWyCSemDgAxocSL7j9Dy4mi93xTTcPEek`,
    { jsonpCallback: "callback" }
  ).then((response) => response.json());

export const getCountryData = () => fetchData("Country list").then(parseData);

export const getHispGroupData = () =>
  fetchData("HISP group list").then(parseHispGroupData);
