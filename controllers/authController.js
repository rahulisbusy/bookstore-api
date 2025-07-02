const { readData, writeData } = require('../utils/fileUtils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const users = await readData(usersPath);
  if (users.find(u => u.email === email)) return res.status(400).json({ message: 'User exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ id: Date.now().toString(), email, password: hashedPassword });
  await writeData(usersPath, users);
  res.status(201).json({ message: 'Registered successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const users = await readData(usersPath);
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  res.json({ token });
};
