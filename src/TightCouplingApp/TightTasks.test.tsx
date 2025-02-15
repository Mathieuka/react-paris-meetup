import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TightCouplingApp from "./TightCouplingApp";
import * as useFetchTaskModule from "./hooks/useFetchTask";

describe("Tight Coupling App", () => {
  test("TightTasks", async () => {
    const useFetchTodoSpy = vi.spyOn(useFetchTaskModule, "useFetchTask");

    useFetchTodoSpy.mockReturnValue({
      userId: 1,
      id: 1,
      title: "Fake implementation",
      completed: false,
    });

    const { findByText } = render(<TightCouplingApp />);

    expect(useFetchTodoSpy).toHaveBeenCalledWith("1");
    expect(useFetchTodoSpy).toHaveBeenCalledTimes(1);

    expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
  });
});
