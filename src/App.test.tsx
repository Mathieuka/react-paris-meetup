import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { expect, test } from "vitest";
import { InMemoryTodoApi } from "./api/implementation";
import TodoApiProvider from "./provider/TodoProvider";

test("renders learn react link", async () => {
  const { findByText } = render(
    <TodoApiProvider
      apiImplementation={
        new InMemoryTodoApi({
          initialTodos: new Promise((resolve) => {
            resolve([
              {
                userId: 1,
                id: 1,
                title: "Fake implementation",
                completed: false,
              },
            ]);
          }),
        })
      }
    >
      <App />
    </TodoApiProvider>,
  );

  expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
});
