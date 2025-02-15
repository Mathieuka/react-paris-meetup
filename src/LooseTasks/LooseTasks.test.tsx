import React from "react";
import { render } from "@testing-library/react";
import LooseTasks from "./LooseTasks";
import { expect, test } from "vitest";
import TodoApiProvider from "./provider/TodoProvider";
import { InMemoryTodoApi } from "./api/implementation";

test("renders learn react link", async () => {
  const { findByText } = render(
    <TodoApiProvider
      apiImplementation={
        new InMemoryTodoApi({
          initialTodos: new Promise((resolve) => {
            resolve({
              userId: 1,
              id: 1,
              title: "Fake implementation",
              completed: false,
            });
          }),
        })
      }
    >
      <LooseTasks />
    </TodoApiProvider>,
  );

  expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
});
