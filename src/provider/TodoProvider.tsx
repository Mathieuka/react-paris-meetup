import React, { createContext, ReactNode } from "react";

interface APIContextProps {
  listTodo: () => Promise<string[]>;
}

export const APIProviderContext = createContext<APIContextProps>(
  {} as APIContextProps,
);

const useArticleTreeContext = () => {
  return {
    listTodo: () =>
      Promise.resolve(["Todo 1", "Todo 2", "Todo 3", "Todo 4", "Todo 5"]),
  };
};

const ArticleTreeProvider = ({ children }: { children: ReactNode }) => {
  const context = useArticleTreeContext();
  return (
    <APIProviderContext.Provider value={context}>
      {children}
    </APIProviderContext.Provider>
  );
};

export default ArticleTreeProvider;
