const app = require('./server');
const SERVER_CONFIG = require('./config/server.js');
const port = SERVER_CONFIG.APP_PORT;

app.listen(port, () =>
		console.log(`Application started at ${port}`)
);