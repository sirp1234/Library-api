const express = require("express");
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const { createBook, getBooks, getBookById, deleteBook, updateBook } = require("../controllers/bookController");

router.post("/", protect, createBook);
router.get("/", protect, getBooks);
router.get("/:id", protect, getBookById);
router.delete("/:id", protect, deleteBook);
router.put("/:id", protect, updateBook);

module.exports = router;