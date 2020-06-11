//requiring the mongoose to access the databse
const mongoose = require('mongoose');
//Schema for the database
const todoSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    }
})
//Exporting the todo.js.
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;