import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

// function to act as input new box
function addBox(boxList, height = "5", width = "5", backgroundColor = "black") {
  const heightInput = boxList.getByLabelText("Height");
  const widthInput = boxList.getByLabelText("Width");
  const backgroundColorInput = boxList.getByLabelText("Background Color");

  fireEvent.change(heightInput, { target: { value: height } });
  fireEvent.change(widthInput, { target: { value: width } });
  fireEvent.change(backgroundColorInput, {
    target: { value: backgroundColor },
  });

  const btn = boxList.getByText("Add a new box!");
  fireEvent.click(btn);
}

// Smoke test
it("renders without crashing", function () {
  render(<BoxList />);
});

// Snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it("can add new box", function () {
  const boxList = render(<BoxList />);

  //   have default 3 boxes
  expect(boxList.queryAllByText("X")).toHaveLength(3);

  //   add new box
  addBox(boxList);

  //   have 4 boxes
  expect(boxList.queryAllByText("X")).toHaveLength(4);
  expect(boxList.queryAllByText("X")[3]).toHaveStyle(`
    width: 5em,
    height: 5em,
    backgroundColor: black,
  `);

  //   form should be empty after submit
  expect(boxList.getAllByDisplayValue("")).toHaveLength(3);
});

it("can remove box", function () {
  const boxList = render(<BoxList />);

  //   have default 3 boxes
  expect(boxList.queryAllByText("X")).toHaveLength(3);
  expect(boxList.queryAllByText("X")[0]).toHaveStyle(`
    width: 10em,
    height: 10em,
    backgroundColor: red,
  `);

  fireEvent.click(boxList.getAllByText("X")[0]);

  //   should have 2 boxes
  expect(boxList.queryAllByText("X")).toHaveLength(2);
  expect(boxList.queryAllByText("X")[0]).toHaveStyle(`
    width: 7em,
    height: 8em,
    backgroundColor: blue,
  `);
});
