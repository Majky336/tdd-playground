import { render, screen } from "@testing-library/react";
import { List } from "../components/List";

import { TListItem } from "../types/TListItem";
import items from "../data/listItems.json";

const todos = items as TListItem[];

describe("List component", () => {
  test("renders empty list component", () => {
    render(<List items={[]} />);

    const emptyMessage = screen.getByText(/the list is empty/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  test("renders empty list component", () => {
    render(<List items={[]} />);

    const title = screen.getByText(/default list title/i);
    expect(title).toBeInTheDocument();
  });

  test("renders empty list component with custom title", () => {
    render(<List items={[]} title="Basic empty list" />);

    const title = screen.getByText(/basic empty list/i);
    expect(title).toBeInTheDocument();
  });

  test("renders empty list component", () => {
    render(<List items={[]} />);

    const title = screen.getByText(/default list title/i);
    expect(title).toBeInTheDocument();
    const emptyMessage = screen.getByText(/the list is empty/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  test("renders list component", () => {
    render(<List items={todos} />);

    const title = screen.getByText(/default list title/i);
    expect(title).toBeInTheDocument();
  });

  test("renders list component with custom title", () => {
    render(<List items={todos} title="List of my TODOs" />);

    const title = screen.getByText(/list of my todos/i);
    expect(title).toBeInTheDocument();
  });
});
