# Navigator App #

Application to plot distance between two locations on Google Map

### Install dependencies ###

* npm install

### Start project ###

* npm run start - for production mode
* npm run start-dev - for development mode
* npm run start-server - for starting express server

### Configuration ###

* Configuration settings are placed in /src/navigator/config.

* Please create an .env file in the root folder of the project and update the Google Maps key as defined below.

```json
REACT_APP_GMAP_KEY = API_KEY_HERE
```

* Google Maps api can be configured from /src/navigator/config/gmap.js

```json
{
  "MAP_SETTINGS" : {
    "center": {
      "lat": -34.397, 
      "lng": 150.644
    },
    "zoom": 8
  },
  "TRAVEL_MODE": "DRIVING",
  "LIBRARIES": ["geometry", "places"],
  "LANGUAGE": "en"
}
```

* Mock api settings are defined in /src/navigator/config/api.json

```json
{
  "MOCK_API": {
    "URL": "http://localhost:8080",
    "NAVIGATOR_SUB_PATH": "/route",
    "MSG_SUCCESS": "success",
    "MSG_IN_PROGRESS": "in progress"
  }
}
```