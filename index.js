'use latest';

import express from 'express';
import { fromExpress } from 'webtask-tools';
import bodyParser from 'body-parser';

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render("index", {});
});

module.exports = fromExpress(app);
