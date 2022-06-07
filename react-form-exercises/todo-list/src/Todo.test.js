import { render } from "@testing-library/react";
import Todo from "./Todo";

// default smoke test
test("renders without crashing", () => {
  render(<Todo />);
});

// Snapshot test
test("matches snapshot", function () {
  const { asFragment } = render(<Todo />);
  expect(asFragment()).toMatchSnapshot();
});
