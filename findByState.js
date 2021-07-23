const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;


const stateSchema = new mongoose.Schema({
  "state": {
    type: String,
    required: true,
    index: true,
  },
  "depth": {
    type: Number,
    required: true,
  },
  "R": {
    type: Boolean,
    required: true,
  },
  "R'": {
    type: Boolean,
    required: true,
  },
  "U": {
    type: Boolean,
    required: true,
  },
  "U'": {
    type: Boolean,
    required: true,
  },
  "F": {
    type: Boolean,
    required: true,
  },
  "F'": {
    type: Boolean,
    required: true,
  },
});

// collection/model creation

const cube_states = new mongoose.model("cube_states", stateSchema);


function findByState(ip_state)
{
    return new Promise(function (resolve, reject) {
        cube_states.find({ "state": ip_state})
        .then( (docs) => {
                let result = [];
                let data = docs[0]
    
                result.push(data["R"])
                result.push(data["R'"])
                result.push(data["U"])
                result.push(data["U'"])
                result.push(data["F"])
                result.push(data["F'"])
                // console.log(result)
                resolve(result)
            })
        .catch((err)=>reject(err))

    })
}


module.exports = {findByState}
