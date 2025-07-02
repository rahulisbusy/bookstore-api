# 📚 Bookstore RESTful API

A simple Bookstore API built using **Node.js** and **Express**. This app supports:

- ✅ JWT-based user authentication  
- ✅ Full CRUD operations for books  
- ✅ File-based data storage (`users.json`, `books.json`)  
- ✅ Middleware for logging, authentication, and error handling

---

## 🚀 Features

### 🔐 User Authentication

- `POST /auth/register` – Register a new user  
- `POST /auth/login` – Log in and receive a JWT token  

### 📚 Book Management (Authenticated Users Only)

- `GET /books` – Get all books (optional `?genre=` filter)  
- `GET /books/:id` – Get book by ID  
- `POST /books` – Add a new book  
- `PUT /books/:id` – Update a book (only if added by user)  
- `DELETE /books/:id` – Delete a book (only if added by user)  

---

## 🧱 Project Structure

```
bookstore-api/
├── controllers/
│   ├── authController.js
│   └── bookController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── logger.js
├── routes/
│   ├── authRoutes.js
│   └── bookRoutes.js
├── utils/
│   └── fileUtils.js
├── data/
│   ├── users.json
│   └── books.json
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

- Node.js  
- Express  
- JWT (`jsonwebtoken`)  
- bcryptjs  
- uuid  
- dotenv  
- fs.promises (for file I/O)  

---

## 📦 Installation

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/bookstore-api.git
cd bookstore-api
```

2. **Install dependencies:**

```bash
npm install express jsonwebtoken bcryptjs uuid dotenv

```

3. **Create `.env` file:**

```env
JWT_SECRET=your_jwt_secret_key
```

4. **Create empty data files:**

```json
// data/users.json
[]

// data/books.json
[]
```

5. **Start the server:**

```bash
node app.js
```

---

## 🔐 Authentication Usage

After `POST /auth/login`, you'll receive a JWT token:

Use this in all `/books` routes:

```
Authorization: Bearer <your_token>
```

---

## 🧪 Example Book Object

```json
{
  "id": "auto-generated UUID",
  "title": "String",
  "author": "String",
  "genre": "String",
  "publishedYear": Number,
  "userId": "ID of the user who added the book"
}
```

---

## 🔎 Bonus: Filter by Genre

```http
GET /books?genre=Fiction
```

---

## 🧾 Sample API Usage (Postman or Thunder Client)

### 1. Register a user  
`POST /auth/register`

```json
{
  "email": "user@example.com",
  "password": "secure123"
}
```

---

### 2. Login  
`POST /auth/login`

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

> Returns `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3NTE0NTA4NDI3MjYiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3NTE0NTQ2NTN9.Jgs_ObaXtjZCoadxb1XV5Wy8FpeychPhceXZlWUx2Bw" }`

---

### 3. Add a book (with token)  
`POST /books`

**Headers:**

```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Body:**

```json
{
 "title": "The Lean Startup",
    "author": "Eric Ries",
    "genre": "Business",
    "publishedYear": 2011,
}
```

---

## 📜 Logging Middleware

Logs every incoming request like:

```
[POST] /auth/register
[GET] /books
```

---

## 📂 Data Persistence

All users and books are stored in:

- `data/users.json`
- `data/books.json`

Read/write is done using `fs.promises`.

---

## 📬 License

MIT

---

## 🙋‍♂️ Author

**Pritam Chakraborty**
