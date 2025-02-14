import React from "react";
import { render } from "@testing-library/react";
import { ListTodo } from "./App";
import { expect, test } from "vitest";
import { InMemoryTodoApi } from "./api/implementation";
import ArticleTreeProvider from "./provider/TodoProvider";

test("renders learn react link", async () => {
  const { findByText } = render(
    <ArticleTreeProvider apiImplementation={new InMemoryTodoApi()}>
      <ListTodo />{" "}
    </ArticleTreeProvider>,
  );

  expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
});
