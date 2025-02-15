import React, { createContext, ReactNode } from "react";
import { TaskApiAdapter } from "../api/implementation";
import { Effect } from "effect";
import { Api, TaskItem } from "../core/types";
import { processTask } from "../api/processTask";

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
      const task = await taskApi.findTask(id); // Fetch task
      const program = processTask(task); // S3 store task

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
