const app = require('./server')

// //sets up json body parsing
// app.use(express.json());

const mongodb = require("./persist/mongo");


//config
const config = require("./config");
// const port = config.port;

//pull in the db
// const persist = require("./persist");

// const Todo = require("./persist/todo");

//env variables
// const dotenv = require("dotenv");


mongodb.setUpConnectionHandlers(()=>{
    // start server
    app.listen(config.port, ()=>{
        console.log(`Server is running on port ${config.port}`);
    });
    
    
});
mongodb.connect(config.user,config.password);


