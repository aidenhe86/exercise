import { render } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

// default smoke test
test("renders without crashing", () => {
  render(<NewTodoForm />);
});

// Snapshot test
test("matches snapshot", function () {
  const { asFragment } = render(<NewTodoForm />);
  expect(asFragment()).toMatchSnapshot();
});
