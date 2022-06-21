//init express server
const express = require('express')
const app = express()

//sets up json body parsing
app.use(express.json());

const flags = require("flags");
flags.defineNumber("port",3000, "Port for the http server");
flags.parse();

//pull in the db
const persist = require("./persist");


//env variables
const dotenv = require("dotenv");


//sets the port 
const port = flags.get("port") || process.env.PORT || 4000;

//set up server paths
app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.getTodo(id);
    res.json(todo);
    // console.log(todo)

});

app.get("/todos", (req, res) => {
    res.json(persist.getTodos());
});

app.post("/todo", (req, res) => {

    // console.log(req.body);
    const todo =  persist.addTodo(req.body);
    res.json(todo);
    
});

app.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.putTodo(id, req.body)
    res.json(todo);
});

app.patch("/todo/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const todo = persist.patchTodo(id,body);
    res.json(todo);


});

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.delteteTodo(id)
    res.json(todo);
});




// start server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});