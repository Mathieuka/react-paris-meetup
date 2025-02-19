import { StorageError } from "../exception";
import { Effect } from "effect";

export interface TaskItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskRepository {
  findTask: (id: string) => Promise<TaskItem>;
}

export interface StorageRepository {
  storeTask: (task: TaskItem) => Effect.Effect<TaskItem, StorageError>;
}
