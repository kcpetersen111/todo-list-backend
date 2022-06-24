const express = require('express')
const app = express()

const cors = require("cors");
app.use(cors());

//sets up json body parsing
app.use(express.json());

// 
const Todo = require("./persist/todo");
const memory = require("./persist/memory")


//set up server paths
app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    // const todo = persist.getTodo(id);
    // res.json(todo);
    let casheHit = memory.getTodo(id);
    if(casheHit != null){
        res.json(casheHit);
        console.log("cashe hit");
        return;
    }
    // if(casheHit.expired){

    // }

    Todo.findById(id).then((todo)=>{
        if(todo == null){
            res.status(404).json({message:"not found" });
        } else{
            res.json(todo);
            memory.addTodo(todo);
            setTimeout(()=>{
                console.log("Deleting id");
                memory.deleteTodo(id);
            },1000);
        }
    }).catch((err)=>{
        res.status(500).json(err);
    });

    // console.log(todo)

});

app.get("/todos", (req, res) => {

    Todo.find().then(todos => {
        res.json(todos);
    }).catch(err =>{
        res.status(500).json(err);
    });

    // res.json(persist.getTodos());
});


//this is for connecting the front end because it needs tags
app.get("/tags", (req,res)=>{

    res.json(["school","chores"]);
})

app.post("/todo", (req, res) => {
   
    Todo.create(req.body).then((todo)=>{
        res.json(todo);
    }).catch((err)=>{
        res.status(500).json(err);
    });
      
});

app.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    // const todo = persist.putTodo(id, req.body)
    // res.json(todo);

    // console.log(req.body);
    Todo.findByIdAndUpdate(id, req.body, {returnDocument:'after'})
    .then(todo =>{
        if(todo == null){
            res.status(404).json({message:"not found" });
        } else{
            
            if(memory.getTodo(id) !=null){
                memory.deleteTodo(id);
            }
            res.json(todo);
        }
    }).catch(err =>{
        res.status(500).json(err);    
    });

});

app.patch("/todo/:id", (req, res) => {
    const id = req.params.id;
    // const body = req.body;
    // const todo = persist.patchTodo(id,body);
    // res.json(todo);

    Todo.findByIdAndUpdate(id, req.body, {returnDocument:'after'})
    .then(todo =>{
        if(todo == null){
            res.status(404).json({message:"not found" });
        } else{
            // console.log(memory.getTodo(id));
            if(memory.getTodo(id) != null){
                memory.deleteTodo(id);
            }
            res.json(todo);
        }
    }).catch(err =>{
        res.status(500).json(err);    
    });

});

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndDelete(id).then(todo=>{
        if(todo == null){
            res.status(404).json({message:"not found" });
        } else{
            // memory.getTodo()
            let temp = memory.getTodo(id);
            if(temp != null){
                memory.deleteTodo(id);
            }
            
            res.json(todo);
        }
    }).catch(err =>{
        res.status(500).json(err);
    });
});

module.exports = app;