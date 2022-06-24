const flags = require("flags");
flags.defineNumber("port",3000, "Port for the http server");
flags.parse();

const dotenv = require("dotenv");


//will need to set env variables every time 
const port = flags.get("port") || process.env.PORT || 4000;
// const password = process.env.MONGO_PASSWORD
// const user = process.env.MONGO_USERNAME

const password = "password";
const user = "user";

module.exports = {
    port,
    password,
    user,
}