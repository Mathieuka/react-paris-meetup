import { StorageRepository, TaskRepository } from "../core/types";
import { Effect } from "effect";
import { TaskService } from "./task";
import { StorageService } from "./storage";

export const createServices = ({
  taskImplementation,
  storageImplementation,
}: {
  taskImplementation: TaskRepository;
  storageImplementation: StorageRepository;
}) => {
  const taskApi = new TaskService(taskImplementation);
  const storageApi = new StorageService(storageImplementation);

  return {
    findTask: async (id: string) => {
      const task = await taskApi.findTask(id);

      const program = storageApi.storeTask(task);

      return Effect.runPromise(program);
    },
  };
};
