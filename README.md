# Navigator App #

Application to plot distance between two locations on Google Map

### Install dependencies ###

* npm install

### Start project ###

* npm run start - for production mode
* npm run start-dev - for development mode
* npm run start-server - for starting express server

### Configuration ###

* Configuration settings are placed in according *.json file in /src/config & /src/navigator/config.
* Application is working on port 3000 as defined in /src/config/default.json.

```json
{
  "APP_PORT": 3000
}
```

* Please update the Google Maps Api key in the .env file in the project root or in the /src/navigator/config/gmap.json (Any one)

```json
REACT_APP_GMAP_KEY = API_KEY_HERE
```

```json
 "API_KEY": ""
```

* Google Maps api can be configured from /src/navigator/config/gmap.json

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
  "LANGUAGE": "en",
  "API_KEY": ""
}
```

* Mock api settings are defined in /src/navigator/config/api.json

```json
{
  "MOCK_API": {
    "URL": "http://localhost:8080",
    "NAVIGATOR_SUB_PATH": "/route",
    "METHOD_POST": "POST",
    "METHOD_GET": "GET",
    "MSG_SUCCESS": "success",
    "MSG_IN_PROGRESS": "in progress"
  }
}
```