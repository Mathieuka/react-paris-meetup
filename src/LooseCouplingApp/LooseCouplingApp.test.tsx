import React from "react";
import { render, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Task } from "./LooseCouplingApp";
import TaskApiProvider from "./provider/TaskProvider";
import { FakeStorageService } from "./services/storage";
import { FakeTaskService } from "./services/task";
import { createServices } from "./services/createServices";

describe("Loose Coupling App", () => {
  test("Fetch a task and displays it correctly", async () => {
    const inMemoryStorage = new FakeStorageService();
    const inMemoryTask = new FakeTaskService({
      stub: {
        findTask: {
          userId: 1,
          id: 1,
          title: "Fake implementation",
          completed: false,
        },
      },
    });

    const { findByText } = render(
      <TaskApiProvider
        taskImplementation={inMemoryTask}
        storageImplementation={inMemoryStorage}
      >
        <Task />
      </TaskApiProvider>,
    );

    expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
  });

  test("Find task service", async () => {
    const inMemoryStorage = new FakeStorageService();
    const inMemoryTask = new FakeTaskService({
      stub: {
        findTask: {
          userId: 1,
          id: 1,
          title: "Fake implementation",
          completed: false,
        },
      },
    });

    const services = createServices({
      taskImplementation: inMemoryTask,
      storageImplementation: inMemoryStorage,
    });

    await services.findTask("1");

    await waitFor(() => {
      expect(inMemoryTask.calls).toBe(1);
      expect(inMemoryTask.isCalledWith).toStrictEqual({
        completed: false,
        id: 1,
        title: "Fake implementation",
        userId: 1,
      });

      expect(inMemoryStorage.calls).toBe(1);
      expect(inMemoryStorage.isCalledWith).toStrictEqual({
        completed: false,
        id: 1,
        title: "Fake implementation",
        userId: 1,
      });
    });
  });
});
