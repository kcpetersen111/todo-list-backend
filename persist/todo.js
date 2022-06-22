const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    name: {type: String, default:""}, // min: 1},
    description: { type: String, default:""},
    done: { type: Boolean, default:false},
    deadline: { type: Date, default: Date.now()}, //min:'2022-01-01'},
    tags: { type: [String], default: []},
});

const Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;