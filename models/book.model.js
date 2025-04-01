// console.log("book.model.js is running...");

const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String
    },
    reviews:{
        type: Object
    }
},{timestamps:true});

// console.log(bookSchema.options);

const BookModel = mongoose.model("book", bookSchema)

module.exports = BookModel