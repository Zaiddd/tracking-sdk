const express = require('express');
const axios = require('axios');
const useragent = require('useragent');
const requestIp = require('request-ip');
const useragent1 = require('express-useragent');

const cors = require('cors');


const app = express();

app.use(cors());

app.use(express.json());

// Save Device endpoint
app.post('/device', (req, res) => {
  const app_id = req.headers['app-id'];
  const id_visitor = req.body.id_visitor;
  const createdAt = req.body.createdAt;

  const userAgentString = req.headers['user-agent'];
  const agent = useragent1.parse(userAgentString);
  
  let device;
  if (agent.isDesktop) {
    device = 'desktop';
  } else if (agent.isTablet) {
    device = 'tablet';
  } else if (agent.isMobile) {
    device = 'mobile';
  } else {
    device = 'unknown';
  }

  const requestBody = {
    app_id: app_id,
    id_visitor: id_visitor,
    createdAt: createdAt,
    device: device,
  };

  console.log(requestBody);

  // Forward the request to kpi platform
  axios
    .post('http://localhost:3000/device', requestBody)
    .then((response) => {
      // Handle the response from the other backend
      res.json(response.data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      res.status(500).json({ error: 'An error occurred' });
    });

});

  


app.listen(3001, () => {
  console.log('Server listening on port 3000');
});
