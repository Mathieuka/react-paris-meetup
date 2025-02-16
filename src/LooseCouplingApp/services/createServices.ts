import { Storage, Task } from "../core/types";

import { Effect } from "effect";
import { TaskService } from "./task";
import { StorageService } from "./storage";

export const createServices = ({
  apiImplementation,
  storageImplementation,
}: {
  apiImplementation: Task;
  storageImplementation: Storage;
}) => {
  const taskApi = new TaskService(apiImplementation);
  const storageApi = new StorageService(storageImplementation);

  return {
    findTask: async (id: string) => {
      const task = await taskApi.findTask(id);

      const program = storageApi.storeTask(task);

      return Effect.runPromise(program);
    },
  };
};
