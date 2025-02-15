import React, { createContext, ReactNode } from "react";
import { Api, TodoItem } from "../api/types";
import { TodoApiAdapter } from "../api/implementation";

interface APIContextProps {
  listTodo: () => Promise<TodoItem[]>;
}

export const APIProviderContext = createContext<APIContextProps>({
  listTodo: () => Promise.resolve([]),
});

const createTodoApiContext = (apiImplementation: Api) => {
  const api = new TodoApiAdapter(apiImplementation);

  return {
    listTodo: () => api.listTodo(),
  };
};

const TodoApiProvider = ({
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

export default TodoApiProvider;
