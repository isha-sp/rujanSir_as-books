const express = require("express");
const router = express.Router();

const {createBook, getBooks, updateBook, deleteBook} = require("../controllers/books.controller");

router.route("/").post(createBook).get(getBooks);
router.route("/:bookid").put(updateBook).delete(deleteBook);

module.exports = router;