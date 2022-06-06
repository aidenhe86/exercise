import { render, screen } from "@testing-library/react";
import App from "./App";

// default smoke test
test("renders without crashing", () => {
  render(<App />);
});

// Snapshot test
test("matches snapshot", function () {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
