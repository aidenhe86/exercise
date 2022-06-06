import React from "react";
import { render } from "@testing-library/react";
import Box from "./Box";

// Smoke test
it("renders without crashing", function () {
  render(<Box />);
});

// Snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(<Box />);
  expect(asFragment()).toMatchSnapshot();
});
