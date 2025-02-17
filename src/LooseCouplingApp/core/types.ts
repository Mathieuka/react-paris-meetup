import { UnexpectedError } from "../exception";
import { Effect } from "effect";

export interface TaskItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskProvider {
  findTask: (id: string) => Promise<TaskItem>;
}

export interface StorageProvider {
  storeTask: (
    task: TaskItem,
  ) => Effect.Effect<TaskItem, UnexpectedError, never>;
}
