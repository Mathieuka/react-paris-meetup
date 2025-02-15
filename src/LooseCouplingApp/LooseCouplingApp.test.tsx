import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { InMemoryTaskApi } from "./api/implementation";
import { LooseTask } from "./LooseCouplingApp";
import TaskApiProvider from "./provider/TaskProvider";

describe("Loose Coupling App", () => {
  test("renders LossTasks", async () => {
    const { findByText } = render(
      <TaskApiProvider
        apiImplementation={
          new InMemoryTaskApi({
            findTask: {
              userId: 1,
              id: 1,
              title: "Fake implementation",
              completed: false,
            },
          })
        }
      >
        <LooseTask />
      </TaskApiProvider>,
    );

    expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
  });
});
