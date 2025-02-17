import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TightCouplingApp from "./TightCouplingApp";
import * as fetchTaskModule from "./hooks/useFetchTask";

describe("Tight Coupling App", () => {
  test("Fetches a task, stores it, and displays it correctly", async () => {
    // naming smell bad (and) comment test les services à part de l'UI
    const useFetchTaskSpy = vi.spyOn(fetchTaskModule, "useFetchTask");

    useFetchTaskSpy.mockImplementation(() => ({
      userId: 1,
      id: 1,
      title: "Fake implementation",
      completed: false,
    }));

    const { findByText } = render(<TightCouplingApp />);

    expect(useFetchTaskSpy).toHaveBeenCalledWith("1");
    expect(useFetchTaskSpy).toHaveBeenCalledTimes(1);

    expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
  });
});
