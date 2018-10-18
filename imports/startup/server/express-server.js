// Express modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Main function to export
export function setupApi() {
  // require express;
  const app = express();
  // create application/x-www-form-urlencoded parser
  const urlencodedParser = bodyParser.urlencoded({ extended: false });
  // create application/json parser
  // const jsonParser = bodyParser.json();
  // use cors
  app.use(cors());

  // Test Router
  app.post('/v1/test', urlencodedParser, async (req, res) => {
    const { id } = req.body;
    console.log(id);

    res.status(200).send(id);
  });

  // connect the express server with meteor;
  WebApp.connectHandlers.use(app);
}
