import { Effect } from "effect";
import { Storage, TaskItem } from "../core/types";
import { UnexpectedError } from "../exception";

export class FakeStorageService implements Storage {
  public calls: number = 0;
  public callWith: TaskItem | undefined;

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

      this.calls = 1;
      this.callWith = task;
      return persistedTask;
    });
  }
}

export class S3StorageService implements Storage {
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

export class StorageService implements Storage {
  constructor(private storageClient: Storage) {}

  storeTask(task: TaskItem): Effect.Effect<TaskItem, UnexpectedError> {
    return Effect.gen(this, function* (_) {
      return yield* _(this.storageClient.storeTask(task));
    });
  }
}
