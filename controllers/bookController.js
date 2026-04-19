const Book = require("../models/bookModel")

// Create a new book
const createBook = async (req, res) => {
    try {
        const { title, author, price } = req.body;

        if (!title || !author || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const book = new Book({ title, author, price });
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: "Error creating book", error });
    }
};

// Get all books
   const getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      data: books
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching books"
    });
  }
};

// Get a book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error });
    }
};

//Delete a book
const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
    }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      data: book
    });

  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
    createBook,
    getBooks,
    getBookById,
    deleteBook,
    updateBook
 };

 console.log("PUTHIT")
 console.log("DELETE THIS")