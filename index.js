const express = require('express'); //Requiring the express.
const path = require('path'); //Setting up a path.
const port = 8000; //Setting a port to access.

const db = require('./config/mongoose'); //Requiring the mongoose from the mongoose in config folder
const Todo = require('./models/todo');  //Requiring todo.js which is model of our databse.

const app = express();

app.set('view engine', 'ejs'); //Accessing home.ejs
app.set('views', path.join(__dirname, 'views')); //Connecting the path of the directory to the views where home.ejs is located.
app.use(express.urlencoded());  
app.use(express.static('assets'));


var todo = [
    {
        description: "Max",
        category: "vegetable",
        date:"02 May 2020"
    },
    {
        description: "Max",
        category: "vegetable",
        date:"02 May 2020"
    },
    {
        description: "Max",
        category: "vegetable",
        date:"02 May 2020"
    }
]
//Setting up a router which get instruction from the user and send to the controller.
app.get('/', function(req, res){
    Todo.find({}, function(err, todo){
        if(err){
            console.log("error in fetching todo from db");
            return;
        }
        return res.render('home',{
            title: "Just todo",
            todo_list: todo
        });

    })
  
})
// creating the router to create items and posting it.
app.post('/create-item', function(req, res){
    Todo.create({
        description: req.body.description,  //displays the description.
        category: req.body.category,        //displays the category.
        date:req.body.date                  //displays the date.
    },
    //Just a error function
     function(err, newItem){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newItem);
            return res.redirect('back');
    })
});
//Just a function to check that our sever is runing or not.
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})

//To delete an item from the list which uses the id to find the item from the database.
app.get('/delete-item/', function(req, res){
    console.log(req.query);
    let id = req.query.id

    Todo.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })
});
