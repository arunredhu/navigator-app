import GoogleMapsLoader from 'google-maps';
import GMAP_SETTINGS from '../../config/gmap.js';

let gMap;
let settings = Object.create(GMAP_SETTINGS);

export const setApiKeyVariable = (customkey) => {
  const key = customkey || process.env.REACT_APP_GMAP_KEY;

  if (key) {
    GoogleMapsLoader.KEY = key;
  } else {
    alert('Google Maps API key is not defined, please refer the project README file for more information')
  }
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