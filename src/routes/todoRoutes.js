const express = require("express");
const {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
} = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;