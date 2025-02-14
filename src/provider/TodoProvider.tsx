import React, { createContext, ReactNode } from "react";
import { TodoApiAdapter, HttpTodoApi } from "../api/implementation";
import { Api, TodoItem } from "../api/types";

interface APIContextProps {
  listTodo: () => Promise<TodoItem[]>;
}

export const APIProviderContext = createContext<APIContextProps>(
  {} as APIContextProps,
);

const useArticleTreeContext = (apiImplementation: Api) => {
  const api = new TodoApiAdapter(apiImplementation);

  return {
    listTodo: () => api.listTodo(),
  };
};

const ArticleTreeProvider = ({
  children,
  apiImplementation,
}: {
  children: ReactNode;
  apiImplementation: Api;
}) => {
  const context = useArticleTreeContext(apiImplementation);
  return (
    <APIProviderContext.Provider value={context}>
      {children}
    </APIProviderContext.Provider>
  );
};

export default ArticleTreeProvider;
