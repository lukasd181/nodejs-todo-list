const yargs = require("yargs");
const chalk = require("chalk");
const todoController = require("./controller");

yargs.command({
  command: "list",
  describe: "show the todo list",
  handler: function () {
    let data = todoController.loadData();
    data.map((todo) => {
      if (todo.todoId) {
        console.log(chalk.blue("Next id inline: ", todo.todoId));
      } else if (todo.status) {
        console.log(
          chalk.green(todo.id, ".", todo.todo, "----- status:", todo.status)
        );
      } else {
        console.log(
          chalk.red(todo.id, ".", todo.todo, "----- status:", todo.status)
        );
      }
    });
  },
});

yargs.command({
  command: "create",
  describe: "create the new todo",
  builder: {
    todo: {
      type: "String",
      demandOption: true,
      describe: "the thing todo",
    },
    status: {
      type: "boolean",
      demandOption: true,
      describe: "complete or not",
      default: false,
    },
  },
  handler: function (arg) {
    todoController.createTodo(arg.todo, arg.status);
  },
});

yargs.command({
  command: "list-complete",
  describe: "sort by completed todos",
  handler: function () {
    const completedTodo = todoController.sortByCompleted();
    console.log("Completed Todo", completedTodo);
  },
});

yargs.command({
  command: "list-incomplete",
  describe: "sort by incompleted todos",
  handler: function () {
    const incompletedTodo = todoController.sortByIncompleted();
    console.log("Incompleted Todo", incompletedTodo);
  },
});

yargs.command({
  command: "delete",
  describe: "delete specific todo",
  builder: {
    id: {
      type: "integer",
      demandOption: true,
    },
  },
  handler: function (args) {
    todoController.deleteTodo(args.id);
  },
});

yargs.command({
  command: "toggle",
  describe: "toggle todo",
  builder: {
    id: {
      type: "integer",
      demandOption: true,
    },
  },
  handler: function (args) {
    todoController.toggle(args.id);
  },
});

yargs.command({
  command: "delete-all",
  describe: "delete all todo",
  handler: function () {
    todoController.deleteAll();
  },
});

yargs.command({
  command: "delete-completed",
  describe: "delete all completed todo",
  handler: function () {
    todoController.deleteCompleted();
    console.log(chalk.red.bold("DELETED!!!"));
  },
});

yargs.parse();

// if (process.argv[2] === "list") {
//   console.log("you call list command");
//   const list = loadData();
//   console.log(list);
// } else if (process.argv[2] === "create") {
//   console.log("you call create command");
//   createTodo();
// } else {
//   console.log("command not defined");
// }
