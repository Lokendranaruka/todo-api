require("dotenv").config();
const express = require("express");
const connectDB = require("./src/database/db.js");
const todoRoutes = require("./src/routes/todoRoutes.js");
const { errorHandler } = require("./src/middlewares/errorMiddleware.js");

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use("/api/todos", todoRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));