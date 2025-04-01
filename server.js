const express = require('express');
const connectDB = require("./connectDB")
const dotenv = require("dotenv");
dotenv.config();
// require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());

const booksRoutes = require("./routes/books.route");

app.use("/books", booksRoutes);

app.get("/", (req, res) =>{
    res.status(200).json({message: "Hii"})
})

app.listen(3000, ()=> console.log("server is running"));

