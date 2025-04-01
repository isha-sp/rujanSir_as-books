const express = require("express");
const router = express.Router();

const {createBook, getBooks, updateBook, deleteBook, getBookReviews} = require("../controllers/books.controller");

router.route("/").post(createBook).get(getBooks);
router.route("/:bookid").patch(updateBook).delete(deleteBook).get(getBookReviews);

module.exports = router;