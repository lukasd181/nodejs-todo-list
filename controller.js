const fs = require("fs");

const loadData = () => {
  let todoList = fs.readFileSync("data.json").toString();
  todoList = JSON.parse(todoList);
  return todoList;
};

const createTodo = (todo, status) => {
  const todoList = loadData();
  let todoId = todoList[0]["todoId"];
  console.log("id", todoId);
  todoList.push({ id: todoId, todo: todo, status: status });
  todoList[0]["todoId"]++;
  const todoJSON = JSON.stringify(todoList);
  fs.writeFileSync("data.json", todoJSON);
  todoId++;
};

const sortByCompleted = () => {
  let todoList = loadData();
  return todoList.filter((todo) => todo.status);
};
const sortByIncompleted = () => {
  let todoList = loadData();
  return todoList.filter((todo) => !todo.status);
};

const deleteTodo = (id) => {
  const todoList = loadData();
  const index = todoList.findIndex((todo) => todo.id == id);
  todoList.splice(index, 1);
  const todoJSON = JSON.stringify(todoList);
  fs.writeFileSync("data.json", todoJSON);
};

const toggle = (id) => {
  const todoList = loadData();
  const index = todoList.findIndex((todo) => todo.id == id);
  console.log("before", todoList[index].status);
  todoList[index].status = !todoList[index].status;
  console.log("after", todoList[index].status);
  const todoJSON = JSON.stringify(todoList);
  fs.writeFileSync("data.json", todoJSON);
};

const deleteAll = () => {
  let todoList = loadData();
  todoList = [];
  todoList.push({ todoId: 1 });
  console.log(todoList);
  const todoJSON = JSON.stringify(todoList);
  fs.writeFileSync("data.json", todoJSON);
};

const deleteCompleted = () => {
  let todoList = loadData();
  const idObject = todoList[0];
  todoList = todoList.filter((todo) => !todo.status);
  console.log(todoList);
  const todoJSON = JSON.stringify(todoList);
  fs.writeFileSync("data.json", todoJSON);
};

module.exports = {
  loadData: loadData,
  createTodo: createTodo,
  sortByCompleted: sortByCompleted,
  sortByIncompleted: sortByIncompleted,
  deleteTodo: deleteTodo,
  toggle: toggle,
  deleteAll: deleteAll,
  deleteCompleted: deleteCompleted
};
