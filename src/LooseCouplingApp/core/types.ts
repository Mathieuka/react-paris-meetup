import { UnexpectedError } from "../exception";
import { Effect } from "effect";

export interface TaskItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskApi {
  findTask: (id: string) => Promise<TaskItem>;
}

export interface StorageApi {
  storeTask: (
    task: TaskItem,
  ) => Effect.Effect<TaskItem, UnexpectedError, never>;
}
