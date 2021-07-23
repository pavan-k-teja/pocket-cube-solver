const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const MONGODB_URI="mongodb://localhost:27017/depth_states";
const PORT = process.env.PORT || 5001;

const fs = require("fs");
// const {isValid} = require("./findSols");

const data = fs.readFileSync('./depth_states_v2.txt', {encoding:'utf8', flag:'r'});
const lines = data.split('\n');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log("success"))
  .catch((err) => console.log(err))

//schema

const stateSchema = new mongoose.Schema({

    state: {
        type: String,
        required: true,
        index: true
    },
    depth: {
        type: Number,
        required: true
    },
    R: {
        type: Boolean,
        required: true
    },
    r: {
        type: Boolean,
        required: true
    },
    U: {
        type: Boolean,
        required: true
    },
    u: {
        type: Boolean,
        required: true
    },
    F: {
        type: Boolean,
        required: true
    },
    f: {
        type: Boolean,
        required: true
    }
})

//collection creation

const cube_states = new mongoose.model("cube_states", stateSchema)


lines.map((line)=>{

    const line_arr = line.split(/\s+/);
    const state_document= new cube_states({
        state: line_arr[0],
        depth: line_arr[1],
        R: (line_arr[2]===1),
        r: (line_arr[3]===1),
        U: (line_arr[4]===1),
        u: (line_arr[5]===1),
        F: (line_arr[6]===1),
        f: (line_arr[7]===1)
    })
    state_document.save();
})



