import React from "react";
import { render, screen } from "@testing-library/react";
import { ListTodo } from "./App";
import { expect, test } from "vitest";
import { fakeApi } from "./api/implementation";
import ArticleTreeProvider from "./provider/TodoProvider";

test("renders learn react link", async () => {
  const { findByText } = render(
    <ArticleTreeProvider temp={new fakeApi()}>
      <ListTodo />{" "}
    </ArticleTreeProvider>,
  );

  expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
});
