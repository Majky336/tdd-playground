import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders list component in App", () => {
  render(<App />);

  const listComponent = screen.getByText(/list of my todos/i);
  expect(listComponent).toBeInTheDocument();
});
