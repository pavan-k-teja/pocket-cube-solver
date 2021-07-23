const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require("express");

const {isValid, findSols} = require("./findSols");
const {findOne} = require("./findOne");

const app = express();
dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5001;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log("success"))
  .catch((err) => console.log(err))

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('views/homepage.html', {root: __dirname })
});

app.get("/:ip/all", async (req, res) => {
  const { ip } = req.params;
  const state = ip.toUpperCase();

  if (state.length != 24 || !isValid(state))
    res.json({"state": state, "depth": -1, "sols": [] });
  else {

    let sols = await findSols(state);
    res.send(sols);
    
  }
});

app.get("/:ip/random", async (req, res) => {
  const { ip } = req.params;
  const state = ip.toUpperCase();

  if (state.length != 24 || !isValid(state))
    res.json({"state": state, "depth": -1, "sol": null });
  else {

    let sols = await findOne(state);
    res.send(sols);
    
  }
});

app.get('/:ip*', (req, res) => {
  const { ip } = req.params;
  res.redirect(`/${ip}/all`);
});



app.listen(PORT);