// adds mongoose
const mongoose = require('mongoose');

// connects to mongodb
const db = mongoose.connection;

const dotenv = require("dotenv");



// const connectionString = `mongodb://{user}:{password}@{host}:{port}/{database}`;

function connect(user, password, host, port,db){
    // const passwordFromENV = process.env.MONGO_PASSWORD
    const connectionString = `mongodb+srv://${user}:${password}@cluster0.crhdmiu.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.connect(connectionString,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

function setUpConnectionHandlers(callback){
    // the code should stop until it connects to the database
    db.once("connecting", ()=>{
        console.log("Connecting to mongodb");
    });

    //once this runs it should continue running
    db.once("connected", ()=>{
        console.log("Connected to mongodb");
    });


    db.once("open", ()=>{
        console.log("Open connection to mongodb");
        callback();
    });

    //the code should probably stop running 
    db.once("error", ()=>{
        console.log("Error connecting to mongodb");
    });
}

module.exports = {
    connect:connect,
    setUpConnectionHandlers,
}



