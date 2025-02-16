import React, { createContext, ReactNode } from "react";
import { TaskApiAdapter } from "../api/task";
import { Effect } from "effect";
import { Api, TaskItem, Storage } from "../core/types";
import { StorageAdapter } from "../api/storage";

interface APIContextProps {
  listTask: (id: string) => Promise<TaskItem>;
}

export const APIProviderContext = createContext<APIContextProps>({
  listTask: () => Promise.resolve({} as TaskItem),
});

const createTodoApiContext = (
  apiImplementation: Api,
  storageImplementation: Storage,
) => {
  const taskApi = new TaskApiAdapter(apiImplementation);
  const storageApi = new StorageAdapter(storageImplementation);
  return {
    listTask: async (id: string) => {
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
  apiImplementation: Api;
  storageImplementation: Storage;
}) => (
  <APIProviderContext.Provider
    value={createTodoApiContext(apiImplementation, storageImplementation)}
  >
    {children}
  </APIProviderContext.Provider>
);

export default TaskApiProvider;
