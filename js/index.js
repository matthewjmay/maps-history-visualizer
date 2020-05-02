import Dropzone from "dropzone";
import Oboe from "oboe";

import TOKEN from "./token.js";
import {
  chunkFileBlocking,
  getLatLng,
  isValidLocation,
  colorGenerator,
} from "./utils.js";

const locationHistories = [];
const colorGen = colorGenerator();

const createMap = (token) => {
  const map = L.map("mapid").setView([0, 0], 2);

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

const map = createMap(TOKEN);

const addLatLngs = (latLngs, color) => {
  const polyline = L.polyline(latLngs, { color: "blue" }).addTo(map);
  map.fitBounds(polyline.getBounds());
};

const onFileProgress = (fractionParsed) => {
  console.log(`progress: ${(100 * fractionParsed).toFixed(2)}%`);
};

const getLatLngParser = () => {
  const latLngs = [];
  const oboeInstance = new Oboe();
  oboeInstance.node("locations.*", (location) => {
    if (isValidLocation(location)) {
      latLngs.push(getLatLng(location));
    }
    return Oboe.drop;
  });
  return {
    parser: oboeInstance,
    latLngs,
  };
};

const onFileUpload = async (file) => {
  console.log(`Parsing ${file.name}`);
  const fileSize = file.size;
  let bytesProcessed = 0;
  const chunkSizeBytes = 1024 * 1024;
  const { parser, latLngs } = getLatLngParser();

  await chunkFileBlocking(file, chunkSizeBytes, (chunk, size) => {
    bytesProcessed += size;
    parser.emit("data", chunk);
    onFileProgress(bytesProcessed / file.size);
  });
  addLatLngs(latLngs, colorGen.next());
};

const initializeDropzone = () => {
  const dropzone = new Dropzone("div#dropzone", {
    url: "/",
    accept: (file, _) => {
      onFileUpload(file);
    },
  });
};

initializeDropzone();
// addLatLngs(map, latLngs, "blue");
