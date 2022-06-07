import { fireEvent, render } from "@testing-library/react";
import TodoList from "./TodoList";

// function to act as input new todo
function addTodo(todos, task = "testing") {
  const taskInput = todos.getByLabelText("Task:");

  fireEvent.change(taskInput, { target: { value: task } });

  const btn = todos.getByText("Add a new Todo!");
  fireEvent.click(btn);
}

// default smoke test
test("renders without crashing", () => {
  render(<TodoList />);
});

// Snapshot test
test("matches snapshot", function () {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

test("can add a new todo task", function () {
  const todos = render(<TodoList />);

  //   have no tasks
  expect(todos.queryByText("X")).not.toBeInTheDocument();

  //   add todos
  addTodo(todos);

  // have 1 task
  expect(todos.queryByText("X")).toBeInTheDocument();
  expect(todos.getByText("Task:")).toBeEmptyDOMElement;
});

test("can delete a todo task", function () {
  const todos = render(<TodoList />);
  addTodo(todos);

  fireEvent.click(todos.getByText("X"));
  expect(todos.queryByText("X")).not.toBeInTheDocument();
});
