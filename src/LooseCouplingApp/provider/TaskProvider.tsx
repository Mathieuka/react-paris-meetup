import React, { createContext, ReactNode } from "react";
import { Effect } from "effect";
import { Task, TaskItem, Storage } from "../core/types";
import { StuffError } from "../exception";
import { createServices } from "../services/createServices";

export class AmazingStuff {
  execute(task: TaskItem): Effect.Effect<TaskItem, StuffError> {
    if (!task) {
      return Effect.fail(new StuffError("Unexpected error occurred"));
    }

    return Effect.succeed(task);
  }
}

interface APIContextProps {
  findTask: (id: string) => Promise<TaskItem>;
}

export const TaskProviderContext = createContext<APIContextProps>({
  findTask: () => Promise.resolve({} as TaskItem),
});

const TaskApiProvider = ({
  children,
  apiImplementation,
  storageImplementation,
}: {
  children: ReactNode;
  apiImplementation: Task;
  storageImplementation: Storage;
}) => (
  <TaskProviderContext.Provider
    value={createServices({ apiImplementation, storageImplementation })}
  >
    {children}
  </TaskProviderContext.Provider>
);

export default TaskApiProvider;
