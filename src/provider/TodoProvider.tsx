import React, { createContext, ReactNode } from "react";
import { ApiImplementation, ConcreteApi } from "../api/implementation";
import { Api, TodoItem } from "../api/types";

interface APIContextProps {
  listTodo: () => Promise<TodoItem[]>;
}

export const APIProviderContext = createContext<APIContextProps>(
  {} as APIContextProps,
);

const useArticleTreeContext = (temp: Api) => {
  const api = new ApiImplementation(temp);

  return {
    listTodo: () => api.listTodo(),
  };
};

const ArticleTreeProvider = ({
  children,
  temp,
}: {
  children: ReactNode;
  temp: Api;
}) => {
  const context = useArticleTreeContext(temp);
  return (
    <APIProviderContext.Provider value={context}>
      {children}
    </APIProviderContext.Provider>
  );
};

export default ArticleTreeProvider;
