const express = require('express');
const router = express.Router();
const {
  getAllBooks, getBookById, addBook, updateBook, deleteBook,
} = require('../controllers/bookController');
const authenticate = require('../middlewares/authMiddleware');

router.use(authenticate);

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook); 

module.exports = router;
