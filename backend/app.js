const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes/personRoutes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/v1", router);

module.exports = app;
