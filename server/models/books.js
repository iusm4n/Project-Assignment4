const mongoose = require('mongoose');
const { Schema } = require('mongoose');

function generateBookId() {
  const isbnPrefix = "978"; // This is a common prefix for ISBN-13
  const timestamp = Date.now().toString().slice(-8); // Taking the last 8 digits of the timestamp
  const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Using a random numeric part
  return `${isbnPrefix}-${timestamp}-${randomPart}`;
}
//example: "978-1643270886-1234"

const bookSchema = new Schema({
  bookid: { type: String, default: generateBookId, unique: true },
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  available: { type: Boolean, default: false },
  Price: { type: Number, required: true, trim: true },
  Image: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  PublishedDate: {
    type: Date,
    default: Date().now,
  },
}, { collection: 'books', versionKey: false });

const Book = mongoose.model('books', bookSchema);

module.exports = Book;
