import Oboe from "oboe";

import { SCALAR_E7 } from "./constants.js";

const getLatLng = (location) => [
  location.latitudeE7 * SCALAR_E7,
  location.longitudeE7 * SCALAR_E7,
];

const isValidLocation = (location) =>
  !((location.latitudeE7 == 0) & (location.longitudeE7 == 0));

const fileChunkPromise = (file, offset, length) => {
  const fileReader = new FileReader();
  const blob = file.slice(offset, offset + length);
  return new Promise((resolve, reject) => {
    fileReader.onloadend = (evt) => {
      if (evt.target.error !== null) {
        reject(evt.target.error);
      } else {
        resolve({
          result: evt.target.result,
          size: blob.size,
        });
      }
    };
    fileReader.readAsText(blob);
  });
};

const chunkFileBlocking = async (
  file,
  chunkSize,
  chunkCb,
  errorCb = () => {}
) => {
  const fileSize = file.size;
  let offset = 0;
  while (offset < fileSize) {
    try {
      const { result, size } = await fileChunkPromise(file, offset, chunkSize);

      chunkCb(result, size);
      offset += size;
    } catch (err) {
      errorCb(err);
      return;
    }
  }
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

export const fetchLatLngs = async (file, onProgressCb) => {
  let bytesProcessed = 0;
  const chunkSizeBytes = 1024 * 1024;
  const { parser, latLngs } = getLatLngParser();

  await chunkFileBlocking(file, chunkSizeBytes, (chunk, size) => {
    bytesProcessed += size;
    console.log("chunked");
    parser.emit("data", chunk);
    onProgressCb(bytesProcessed / file.size);
  });
  return latLngs;
};

export function* colorGenerator() {
  const colorList = [
    "#0000ff",
    "#ffB6c1",
    "#1f77b4",
    "#aec7e8",
    "#ff7f0e",
    "#ffbb78",
    "#2ca02c",
    "#98df8a",
    "#d62728",
    "#ff9896",
    "#9467bd",
    "#c5b0d5",
    "#8c564b",
    "#c49c94",
    "#e377c2",
    "#f7b6d2",
    "#7f7f7f",
    "#c7c7c7",
    "#bcbd22",
    "#dbdb8d",
    "#17becf",
    "#9edae5",
    "#393b79",
    "#5254a3",
    "#6b6ecf",
    "#9c9ede",
    "#637939",
    "#8ca252",
    "#b5cf6b",
    "#cedb9c",
    "#8c6d31",
    "#bd9e39",
    "#e7ba52",
    "#e7cb94",
    "#843c39",
    "#ad494a",
    "#d6616b",
    "#e7969c",
    "#7b4173",
    "#a55194",
    "#ce6dbd",
    "#de9ed6",
  ];
  let ind = 0;
  while (true) {
    yield colorList[ind];
    ind = (ind + 1) % colorList.length;
  }
}
