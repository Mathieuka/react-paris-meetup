import { describe, expect, test, vi } from "vitest";
import { FakeStorageService } from "./services/storage";
import { FakeTaskService } from "./services/task";
import { createServices } from "./services/createServices";
import TaskApiProvider from "./provider/TaskProvider";
import React from "react";
import { Task } from "./LooseCouplingApp";
import { render } from "@testing-library/react";
import { StorageRepository, TaskRepository } from "./core/types";
import { Effect } from "effect";

describe("Fetch Task UI", () => {
  test("Displays a task with Fake", async () => {
    // Execute
    const { findByText } = render(
      <TaskApiProvider
        taskImplementation={new FakeTaskService()}
        storageImplementation={new FakeStorageService()}
      >
        <Task />
      </TaskApiProvider>,
    );

    // Assert
    expect(await findByText("Some title")).toBeInTheDocument();
  });

  test("Displays a task with Mock", async () => {
    // Prepare
    const findTaskMock: TaskRepository = {
      findTask: vi.fn().mockResolvedValue({
        userId: 1,
        id: 1,
        title: "Some title",
        completed: true,
      }),
    };
    const findStorageMock: StorageRepository = {
      storeTask: vi.fn().mockReturnValue(
        Effect.succeed({
          id: 1,
          title: "Some title",
          completed: true,
          userId: 1,
        }),
      ),
    };

    // Execute
    const { findByText } = render(
      <TaskApiProvider
        taskImplementation={findTaskMock}
        storageImplementation={findStorageMock}
      >
        <Task />
      </TaskApiProvider>,
    );

    // Assert
    expect(await findByText("Some title")).toBeInTheDocument();
  });
});

describe("Fetch Task Service", () => {
  test("Find task by id with Fake", async () => {
    // Prepare
    const services = createServices({
      taskImplementation: new FakeTaskService(),
      storageImplementation: new FakeStorageService(),
    });

    // Execute
    const result = await services.findTask("1");

    // Assert
    expect(result).toStrictEqual({
      completed: true,
      id: 1,
      title: "Some title",
      userId: 1,
    });
  });

  test("Find task by id with Mock", async () => {
    // Prepare
    const services = createServices({
      taskImplementation: {
        findTask: vi.fn().mockResolvedValue({
          userId: 1,
          id: 1,
          title: "Some title",
          completed: true,
        }),
      },
      storageImplementation: {
        storeTask: vi.fn().mockReturnValue(
          Effect.succeed({
            userId: 1,
            id: 1,
            title: "Some title",
            completed: true,
          }),
        ),
      },
    });

    // Execute
    const result = await services.findTask("1");

    // Assert
    expect(result).toStrictEqual({
      completed: true,
      id: 1,
      title: "Some title",
      userId: 1,
    });
  });
});
