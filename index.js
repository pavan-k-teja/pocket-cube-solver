const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require("express");

const app = express();
dotenv.config();

const fs = require("fs");
const {isValid, findSols} = require("./findSols");


const MONGODB_URI=process.env.MONGODB_URI;
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

app.get("/:ip", async (req, res) => {
  const { ip } = req.params;
  const state = ip.toUpperCase();

  if (state.length != 24 || !isValid(state))
    res.json({"state": state, "depth": -1, "sols": [] });
  else {

    let sols = await findSols(state);
    res.send(sols);
    
  }
});

app.listen(PORT);