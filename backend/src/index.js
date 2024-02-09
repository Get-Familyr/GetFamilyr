const app = require('./server');
const fs = require('node:fs');
const path = require('path');
require('dotenv').config();
const https = require('https');

const PORT = process.env.PORT || 3030;

https
  .createServer(
    {
      key: fs.readFileSync(process.env.SSLKEY),
      cert: fs.readFileSync(process.env.SSLCERT),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
