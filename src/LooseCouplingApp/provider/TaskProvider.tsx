import React, { createContext, ReactNode } from "react";
import { Api, TaskItem } from "../api/types";
import { TaskApiAdapter } from "../api/implementation";
import { processTask } from "../api/storeTaskInStorage";
import { Effect } from "effect";

interface APIContextProps {
  listTask: (id: string) => Promise<TaskItem>;
}

export const APIProviderContext = createContext<APIContextProps>({
  listTask: () => Promise.resolve({} as TaskItem),
});

const createTodoApiContext = (apiImplementation: Api) => {
  const taskApi = new TaskApiAdapter(apiImplementation);

  return {
    listTask: async (id: string) => {
      const task = await taskApi.findTask(id);
      const program = processTask(task);

      return Effect.runPromise(program);
    },
  };
};

const TaskApiProvider = ({
  children,
  apiImplementation,
}: {
  children: ReactNode;
  apiImplementation: Api;
}) => (
  <APIProviderContext.Provider value={createTodoApiContext(apiImplementation)}>
    {children}
  </APIProviderContext.Provider>
);

export default TaskApiProvider;
