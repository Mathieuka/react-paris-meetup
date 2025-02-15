import React, { createContext, ReactNode } from "react";
import { Api, TaskItem } from "../api/types";
import { TaskApiAdapter } from "../api/implementation";

interface APIContextProps {
  listTask: (id: string) => Promise<TaskItem>;
}

export const APIProviderContext = createContext<APIContextProps>({
  listTask: () => Promise.resolve({} as TaskItem),
});

const createTodoApiContext = (apiImplementation: Api) => {
  const api = new TaskApiAdapter(apiImplementation);

  return {
    listTask: (id: string) => api.findTask(id),
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
