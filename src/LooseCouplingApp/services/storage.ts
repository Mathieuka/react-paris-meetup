import { Effect } from "effect";
import { StorageProvider, TaskItem } from "../core/types";
import { UnexpectedError } from "../exception";

export class FakeStorageService implements StorageProvider {
  public calls: number = 0;
  public isCalledWith: TaskItem | undefined;

  storeTask(
    task: TaskItem | undefined,
  ): Effect.Effect<TaskItem, UnexpectedError> {
    return Effect.gen(this, function* (_) {
      console.log(`⚙️...S3 processing`);

      if (!task) {
        return yield* _(
          Effect.fail(new UnexpectedError("Unexpected error occurred")),
        );
      }

      const persistedTask = yield* _(Effect.succeed(task));
      console.log(`✅ S3 task processed with id : ${task.id}`);

      this.calls += 1;
      this.isCalledWith = task;
      return persistedTask;
    });
  }
}

export class S3StorageService implements StorageProvider {
  storeTask(
    task: TaskItem | undefined,
  ): Effect.Effect<TaskItem, UnexpectedError> {
    return Effect.gen(function* (_) {
      console.log(`⚙️...S3 processing`);

      if (!task) {
        return yield* _(
          Effect.fail(new UnexpectedError("Unexpected error occurred")),
        );
      }

      const persistedTask = yield* _(Effect.succeed(task));
      console.log(`✅ S3 task processed with id : ${task.id}`);

      return persistedTask;
    });
  }
}

export class StorageService implements StorageProvider {
  constructor(private storageClient: StorageProvider) {}

  storeTask(task: TaskItem): Effect.Effect<TaskItem, UnexpectedError> {
    return Effect.gen(this, function* (_) {
      return yield* _(this.storageClient.storeTask(task));
    });
  }
}
