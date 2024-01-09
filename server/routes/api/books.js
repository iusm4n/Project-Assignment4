const express = require('express');
let router = express.Router();
let Book = require('../../models/books');
const auth = require("../../middleware/auth");
const _ = require('lodash');

router.get('/',auth, async (req, res) => {
  const books = await Book.find().select('-_id');
  res.status(200).json(books);
});

router.get('/:bookid', auth , async (req, res) => {
  let book = await Book.findOne({ bookid: req.params.bookid }).select('-_id');
  if (!book) return res.status(404).send(`Book with bookid ${req.params.bookid} not found`);
  return res.json(book);
});

router.post('/', auth, async (req, res) => {
  let newBook = new Book();
  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.type = req.body.type;
  newBook.available = req.body.available || false;
  newBook.Price = req.body.Price;
  newBook.Image = req.body.Image;
  newBook.description = req.body.description;
  await newBook.save();
  const bookData = _.omit(newBook.toObject(), '_id'); // Use lodash omit to exclude _id attribute
  res.status(201).json({ message: 'New Book Created successfully', book: bookData });
});

router.put('/:bookid', auth, async (req, res) => {
  let book = await Book.findOne({ bookid: req.params.bookid }).select('-_id');
  if (!book) return res.status(404).send(`Book with bookid ${req.params.bookid} not found`);
  book.title = req.body.title;
  book.author = req.body.author;
  book.type = req.body.type;
  book.available = req.body.available || false;
  book.Price = req.body.Price;
  book.Image = req.body.Image;
  book.description = req.body.description;
  await book.save();
  return res.json({ message: 'Book updated successfully', book });
});

router.delete('/:bookid', auth, async (req, res) => {
  let book = await Book.findOneAndDelete({ bookid: req.params.bookid }).select('-_id');
  if (!book) return res.status(404).send(`Book with bookid ${req.params.bookid} not found`);
  res.status(200).json({ message: 'Book deleted successfully', book });
});

module.exports = router;
