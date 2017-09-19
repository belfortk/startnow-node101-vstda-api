const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var toDoItems = 
[
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

const app = express();
app.use(bodyParser.json());

// add your code here

app.get('/',(request, response)=>{
    /** response.send('Body:');
    var dummyBody = {};
    dummyBody.status = 'string';
    response.send(dummyBody);

    response.send("Example:");
    var dummyStatus = {};
    dummyStatus.status = "'ok'";
    response.send(dummyStatus);
    
    response.send(response.statusCode);
    **/
    response.json(200, {status:'success'});

});

app.get('/api/TodoItems',(request, response)=>{
    response.send(toDoItems);
    });


app.get('/api/TodoItems/:number', (request, response)=>{
    var indexOfTodoItem = request.params.number;
    response.send(toDoItems[indexOfTodoItem-1]);

});

app.post('/api/TodoItems', function (request, response) {
    console.log(request.body);
    //console.log(request.query);

    let replace = false;
    for( var i = 0; i < toDoItems.length; i++){
        if(request.body.todoItemId === toDoItems[i].todoItemId){
            //replace the item

            toDoItems[i].todoItemId = request.body.todoItemId;
            toDoItems[i].name = request.body.name;
            toDoItems[i].priority = request.body.priority;
            toDoItems[i].completed = request.body.completed;

            replace = true;
            //response.statusCode = 201;
            response.status(201).json(toDoItems[i]);
          
        }
    }
    if (replace != true){
        // add the item to the list 
        toDoItems.push(request.body);
        response.statusCode = 201;
        response.send(toDoItems[toDoItems.length-1]);
    }

  
    });


  app.delete('/api/TodoItems/:number', function (request, response){
    var indexOfTodoItem = request.params.number;
    response.json(toDoItems[indexOfTodoItem]);
    toDoItems.splice(indexOfTodoItem,1);
    console.log("item removed")
  }
  );

module.exports = app;
