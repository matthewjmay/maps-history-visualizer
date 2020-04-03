import { SCALAR_E7 } from "./constants.js";

export const getLatLng = (location) => {
  [l.latitudeE7 * SCALAR_E7, l.longitudeE7 * SCALAR_E7];
};

export const extractLatLngs = (locations) => locations.map(getLatLng);
