import { describe, expect, test, vi } from "vitest";
import { StorageService } from "./services/storage";
import { TaskService } from "./services/task";
import { createServices } from "./services/createServices";
import { StorageRepository, TaskRepository } from "./core/types";
import { Effect } from "effect";

describe("Fetch Task Service", () => {
  test("Find task by id with mock", async () => {
    // Prepare
    const findTaskMock = vi.fn().mockResolvedValue({
      userId: 1,
      id: 1,
      title: "Some title",
      completed: true,
    });

    const storeTaskMock = vi.fn().mockReturnValue(
      Effect.succeed({
        userId: 1,
        id: 1,
        title: "Some title",
        completed: true,
      }),
    );

    const mockTaskClient: TaskRepository = {
      findTask: findTaskMock,
    };
    const mockStorageClient: StorageRepository = {
      storeTask: storeTaskMock,
    };

    const taskService = new TaskService(mockTaskClient);
    const storageService = new StorageService(mockStorageClient);

    const services = createServices({
      taskImplementation: taskService,
      storageImplementation: storageService,
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
