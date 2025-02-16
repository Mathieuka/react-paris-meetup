import React from "react";
import { render, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { InMemoryTaskApi } from "./api/task";
import { Task } from "./LooseCouplingApp";
import TaskApiProvider from "./provider/TaskProvider";
import { InMemoryStorage } from "./api/storage";

describe("Loose Coupling App", () => {
  test("renders LossTasks", async () => {
    const inMemoryStorage = new InMemoryStorage();

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
        storageImplementation={inMemoryStorage}
      >
        <Task />
      </TaskApiProvider>,
    );

    await waitFor(() => {
      expect(inMemoryStorage.calls).toBe(1);
      expect(inMemoryStorage.callWith).toStrictEqual({
        completed: false,
        id: 1,
        title: "Fake implementation",
        userId: 1,
      });
    });

    expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
  });
});
