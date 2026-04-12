require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require('./routes/authRoutes');

app.use("/api/books", bookRoutes);
app.use('/api/users', authRoutes);


// Start the server
const PORT =process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});