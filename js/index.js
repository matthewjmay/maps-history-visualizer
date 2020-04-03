import Dropzone from "dropzone";

import TOKEN from "token.js";

const locationHistories = [];

const initializeMap = (startLocation, token) => {
  const map = L.map("mapid").setView(startPos, 13);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: token,
    }
  ).addTo(map);
  return map;
};

const addLatLngs = (map, latLngs, color) => {
  const polyline = L.polyline(latLngs, { color: color }).addTo(map);
  map.fitBounds(polyline.getBounds());
};

const onFileUpload = (file) => {
  console.log(`Parsing ${file.name}`);
};

const initDropZone = () => {
  const dropzone = new Dropzone("div#dropzone", { url: "/" });
};

// addLatLngs(map, latLngs, "blue");
