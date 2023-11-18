const Todo = require('../models/Todo');

// @url     GET /todos/
// @desc    List all todos
// @access  private
exports.list = async (req, res) => {
  let filters = {};
  // Only show todos for logged in user, except for admin can see all todos
  if (!req?.user?.isAdmin) filters.userId = req.user._id;

  const data = await res.getModelList(Todo, filters, ['completed', 'category']);
  res.status(200).send({
    error: false,
    details: await res.getModelListDetails(Todo, filters),
    data,
  });
};

// @url     POST /todos/
// @desc    Create a new todo
// @access  private
exports.create = async (req, res) => {
  req.body.userId = req?.user?._id;

  const data = await Todo.create(req.body);
  res.status(201).json({
    error: false,
    data,
  });
};

// @url     GET /todos/:id
// @desc    read a todo
// @access  private
exports.read = async (req, res) => {
  // user read his own todos, admin can read all todos
  let filters = {};
  if (!req.user?.isAdmin) filters.userId = req.user._id;
  const data = await Todo.findOne({ _id: req.params.id, ...filters });
  res.status(200).json({
    error: false,
    data,
  });
};
// @url     PUT /todo/:id
// @desc    update a todo
// @access  private
exports.update = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });

  // Check if the logged-in user is the owner of the todo or is an admin
  if (!req.user.isAdmin && todo.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      error: true,
      message: 'You do not have permission to update this todo',
    });
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(202).json({
    error: false,
    data: updatedTodo,
  });
};
// @url     DELETE /todo/:id
// @desc    delete a todo
// @access  Private
exports.delete = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });

  // Check if the logged-in user is the owner of the todo or is an admin
  if (!req.user.isAdmin && todo.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      error: true,
      message: 'You do not have permission to delete this todo',
    });
  }

  const data = await Todo.deleteOne({ _id: req.params.id });

  res.status(data.deletedCount ? 204 : 404).json({
    error: !data.deletedCount,
    data,
  });
};
