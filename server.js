const express = require('express');

const app = express();
const Port = 5000;
const routes = require('./routes');

// MIDDLEWARE to pass JSON requests
app.use(express.json());

// Load routes from the routes/index.js file
app.use('/', routes);

app.listen(Port, () => {
  console.log(`Express app listening on Port ${Port}...`);
});
