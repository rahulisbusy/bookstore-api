const { readData, writeData } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const booksPath = path.join(__dirname, '../data/books.json');

exports.getAllBooks = async (req, res) => {
  const books = await readData(booksPath);
  if (req.query.genre) {
    return res.json(books.filter(book => book.genre === req.query.genre));
  }
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const books = await readData(booksPath);
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

exports.addBook = async (req, res) => {
  const books = await readData(booksPath);
  const newBook = { ...req.body, id: uuidv4(), userId: req.user.id };
  books.push(newBook);
  await writeData(booksPath, books);
  res.status(201).json(newBook);
};

exports.updateBook = async (req, res) => {
  const books = await readData(booksPath);
  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });
  if (books[bookIndex].userId !== req.user.id)
    return res.status(403).json({ message: 'Unauthorized' });

  books[bookIndex] = { ...books[bookIndex], ...req.body };
  await writeData(booksPath, books);
  res.json(books[bookIndex]);
};

exports.deleteBook = async (req, res) => {
  const books = await readData(booksPath);
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (book.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

  const updatedBooks = books.filter(b => b.id !== req.params.id);
  await writeData(booksPath, updatedBooks);
  res.json({ message: 'Book deleted' });
};
