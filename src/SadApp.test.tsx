import React from "react";
import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import SadApp from "./SadApp";

test("Sad app", async () => {
  vi.mock("./hooks/useFetchTodos", () => ({
    useFetchTodos: () => [
      {
        userId: 1,
        id: 1,
        title: "Fake implementation",
        completed: false,
      },
    ],
  }));

  const { findByText } = render(<SadApp />);

  expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
});
