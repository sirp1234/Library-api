const Book = require('./models/bookModel');

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
        //page and limit
       let page = parseInt(req.query.page) || 1;
       let limit = parseInt(req.query.limit) || 10;
       let skip = (page - 1) * limit;

        const books = await Book.find().skip(skip).limit(limit);
        const totalBooks = await Book.countDocuments();
        res.status(200).json({
            success: true,
            page,
            totalpages: Math.ceil(totalBooks / limit),
            totalBooks: totalBooks,
            data: books
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
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
        const { title, author, price } = req.body;

        if (!title || !author || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        console.log('ID RECEIVED:', req.params.id);
        console.log('BODY RECEIVED:', req.body);
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
        {
            returnDocument: "after",
        }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
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