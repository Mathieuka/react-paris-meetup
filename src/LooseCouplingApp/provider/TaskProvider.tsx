import React, { createContext, ReactNode, useCallback } from "react";
import { TaskRepository, TaskItem, StorageRepository } from "../core/types";
import { createServices } from "../services/createServices";

interface APIContextProps {
  findTask: (id: string) => Promise<TaskItem>;
}

export const TaskProviderContext = createContext<APIContextProps>({
  findTask: () => Promise.resolve({} as TaskItem),
});

const TaskApiProvider = ({
  children,
  taskImplementation,
  storageImplementation,
}: {
  children: ReactNode;
  taskImplementation: TaskRepository;
  storageImplementation: StorageRepository;
}) => {
  const useCreateServices = useCallback(
    () =>
      createServices({
        taskImplementation,
        storageImplementation,
      }),
    [storageImplementation, taskImplementation],
  );

  return (
    <TaskProviderContext.Provider value={useCreateServices()}>
      {children}
    </TaskProviderContext.Provider>
  );
};

export default TaskApiProvider;
