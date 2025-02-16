import React from "react";
import { render, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { Task } from "./LooseCouplingApp";
import TaskApiProvider, { AmazingStuff } from "./provider/TaskProvider";

import { Effect } from "effect";
import { FakeStorageService } from "./services/storage";
import { FakeTaskService } from "./services/task";

describe("LooseCouplingApp", () => {
  test("Fetches a task, stores it, and displays it correctly", async () => {
    const inMemoryStorage = new FakeStorageService();

    const { findByText } = render(
      <TaskApiProvider
        apiImplementation={
          new FakeTaskService({
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
      expect(inMemoryStorage.isCalledWith).toStrictEqual({
        completed: false,
        id: 1,
        title: "Fake implementation",
        userId: 1,
      });
    });

    expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
  });

  test("Do amazing stuff", () => {
    const amazingStuff = new AmazingStuff();
    const task = {
      completed: false,
      id: 1,
      title: "Fake implementation",
      userId: 1,
    };

    const program = amazingStuff.execute(task);

    expect(Effect.runSync(program)).toEqual(task);
  });
});
