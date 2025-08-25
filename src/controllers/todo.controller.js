const constants = require("../config/constant.config");
const Todo = require("../models/Todo");

//  all todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

//  Add new todo
exports.addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!description)
      return res.status(400).json({ message: "Description is required" });

    const todo = await Todo.create({ title, description });
    res.status(constants.HTTP_CODES.CREATED).json({
      status: constants.STATUS.SUCCESS,
      data: todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//  Update todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed ?? todo.completed;
    const updatedTodo = await todo.save();
    // console.log("Updated Todo:", updatedTodo);

    res.json(updatedTodo);
  } catch (error) {
    console.error("Error occurred in [updateTodo] ", error);
    res.status(constants.HTTP_CODES.INTERNAL_SERVER_ERROR).json({
      status: constants.STATUS.FAILURE,
      message: "Internal Server Error",
    });
  }
};

//  Delete todo
exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  await todo.deleteOne();
  res.json({ message: "Todo deleted successfully" });
};
