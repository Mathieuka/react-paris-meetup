import React, { createContext, ReactNode } from "react";
import { TaskApiAdapter } from "../api/task";
import { Effect } from "effect";
import { TaskApi, TaskItem, StorageApi } from "../core/types";
import { StorageAdapter } from "../api/storage";

interface APIContextProps {
  findTask: (id: string) => Promise<TaskItem>;
}

export const APIProviderContext = createContext<APIContextProps>({
  findTask: () => Promise.resolve({} as TaskItem),
});

const createTodoApiContext = ({
  apiImplementation,
  storageImplementation,
}: {
  apiImplementation: TaskApi;
  storageImplementation: StorageApi;
}) => {
  const taskApi = new TaskApiAdapter(apiImplementation);
  const storageApi = new StorageAdapter(storageImplementation);

  return {
    findTask: async (id: string) => {
      const task = await taskApi.findTask(id);
      const program = storageApi.storeTask(task);

      return Effect.runPromise(program);
    },
  };
};

const TaskApiProvider = ({
  children,
  apiImplementation,
  storageImplementation,
}: {
  children: ReactNode;
  apiImplementation: TaskApi;
  storageImplementation: StorageApi;
}) => (
  <APIProviderContext.Provider
    value={createTodoApiContext({ apiImplementation, storageImplementation })}
  >
    {children}
  </APIProviderContext.Provider>
);

export default TaskApiProvider;
