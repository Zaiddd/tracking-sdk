const express = require('express');
const axios = require('axios');
const useragent = require('useragent');
const requestIp = require('request-ip');
const useragent1 = require('express-useragent');

const cors = require('cors');


const app = express();

app.use(cors());

app.use(express.json());


  


app.listen(3001, () => {
  console.log('Server listening on port 3000');
});
