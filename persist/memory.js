const todo_db = {};

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


const addTodo = function (todo) {
    // let id = makeid(8);
    // todo.id = id;
    // todo.test = "test";
    todo_db[todo.id] = todo;
    // console.log(todo_db);
    return todo;
};

const getTodo = function(id){
    return todo_db[id];
}

const getTodos = function(id){
    return todo_db;
}

// put
const putTodo = function(id, todo){
    todo.id = id;
    todo_db[id] = todo;
    return todo;
    // console.log(todo_db)

}

// patch
const patchTodo = function(id,todoData) {

    for (const key in todoData) {
        todo_db[id][key] = todoData[key]
    }
    // console.log(todo_db)
    return todo_db[id]

}

const deleteTodo = function(id){
    const todo = todo_db[id];
    // console.log(todo_db[id]);
    delete todo_db[id];
    return todo;
}

//do some data validations same as jace's
setupTodo = function(todoData){
    let deadline = new Date()

}


module.exports = {
    addTodo: addTodo,
    getTodo: getTodo,
    getTodos: getTodos,
    deleteTodo: deleteTodo,
    putTodo: putTodo,
    patchTodo: patchTodo,
};