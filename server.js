const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const logger = require('./middlewares/logger');
require('dotenv').config();

app.use(express.json());
app.use(logger);

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.use((req, res) => res.status(404).json({ message: 'Not Found' }));
app.use((err, req, res, next) => res.status(500).json({ message: err.message }));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
