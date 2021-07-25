const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require("express");
var favicon = require('serve-favicon');

const {isValid, findSols} = require("./findSols");
const {findOne} = require("./findOne");

const app = express();
dotenv.config();


app.use(express.json());
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/assets/pocket-cube.png'));

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


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/homepage.html');
});

app.get("/:ip/all", async (req, res) => {
  const { ip } = req.params;
  const state = ip.toUpperCase();

  if (state.length != 24 || !isValid(state))
    res.status(404).json({"position": state, "depth": -1, "sols": [] });
  else {

    let sols = await findSols(state);
    res.send(sols);
    
  }
});

app.get("/:ip/random", async (req, res) => {
  const { ip } = req.params;
  const state = ip.toUpperCase();

  if (state.length != 24 || !isValid(state))
    res.json({"position": state, "depth": -1, "sol": null });
  else {

    let sols = await findOne(state);
    res.send(sols);
    
  }
});

app.get('/:ip*', (req, res) => {
  const { ip } = req.params;
  res.redirect(`/${ip}/random`);
});



app.listen(PORT);