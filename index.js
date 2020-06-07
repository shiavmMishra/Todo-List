const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Todo = require('./models/todo');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
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

// app.get('/practice', function(req, res){
//     return res.render('practice', {
//         contacttitle: "Let us play with ejs"
//     });
// });


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
app.post('/create-item', function(req, res){
    Todo.create({
        description: req.body.description,
        category: req.body.category,
        date:req.body.date
    },
     function(err, newItem){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newItem);
            return res.redirect('back');
    })
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


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
