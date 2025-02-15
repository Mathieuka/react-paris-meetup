import React from "react";
import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import TightTasks from "./TightTasks";
import * as useFetchTodoModule from "./hooks/useFetchTodo";

test("TightTasks", async () => {
  const useFetchTodoSpy = vi.spyOn(useFetchTodoModule, "useFetchTodo");

  useFetchTodoSpy.mockReturnValue({
    userId: 1,
    id: 1,
    title: "Fake implementation",
    completed: false,
  });

  const { findByText } = render(<TightTasks />);

  expect(useFetchTodoSpy).toHaveBeenCalledWith("1");
  expect(useFetchTodoSpy).toHaveBeenCalledTimes(1);

  expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
});
