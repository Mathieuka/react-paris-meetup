import React from "react";
import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import SadApp from "./TightTasks";

test("Sad app", async () => {
  vi.mock("./hooks/useFetchTodo", () => ({
    useFetchTodo: () => ({
      userId: 1,
      id: 1,
      title: "Fake implementation",
      completed: false,
    }),
  }));

  const { findByText } = render(<SadApp />);

  expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
});
