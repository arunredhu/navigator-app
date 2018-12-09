import GoogleMapsLoader from 'google-maps';
import MapSettings from '../../config/gmap.json';

let gMap;
let settings = Object.create(MapSettings);
let apiKey = process.env.REACT_APP_GMAP_KEY || settings.API_KEY;

export const setApiKeyVariable = (key = apiKey) => {
  GoogleMapsLoader.KEY = key;
}

export const setVariables = (config) => {
  GoogleMapsLoader.LANGUAGE = config.LANGUAGE;
  GoogleMapsLoader.LIBRARIES = config.LIBRARIES;
  setApiKeyVariable();
}

const loadMap = () => {
  return new Promise((resolve, reject) => {
    setVariables(settings);
    GoogleMapsLoader.load((google) => {
      resolve(google.maps);
    });
  });
}

export const gmap = async () => {
  if (typeof gMap !== "undefined") {
    return gMap;
  } else { 
    gMap = await loadMap();
    return gMap;
  }
}