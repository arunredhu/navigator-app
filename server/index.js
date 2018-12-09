const app = require('./server');
const CONFIG = require('../src/config/default.json');
const port = CONFIG.APP_PORT;

app.listen(port, () =>
		console.log(`Application started at ${port}`)
);