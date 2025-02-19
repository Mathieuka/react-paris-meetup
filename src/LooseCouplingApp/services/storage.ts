import { Effect } from "effect";
import { StorageRepository, TaskItem } from "../core/types";
import { StorageError } from "../exception";

export class FakeStorageService implements StorageRepository {
  storeTask(task: TaskItem | undefined): Effect.Effect<TaskItem, StorageError> {
    return Effect.gen(this, function* (_) {
      console.log(`⚙️...S3 processing`);

      if (!task) {
        return yield* _(
          Effect.fail(new StorageError("Unexpected error occurred")),
        );
      }

      const persistedTask = yield* _(Effect.succeed(task));
      console.log(`✅ S3 task processed with id : ${task.id}`);

      return persistedTask;
    });
  }
}

export class LocalStorageService implements StorageRepository {
  storeTask(task: TaskItem | undefined): Effect.Effect<TaskItem, StorageError> {
    return Effect.gen(function* (_) {
      console.log(`⚙️... processing`);

      if (!task) {
        return yield* _(
          Effect.fail(new StorageError("Unexpected error occurred")),
        );
      }

      const persistedTask = yield* _(Effect.succeed(task));
      console.log(`✅ task stored with id : ${task.id}`);

      return persistedTask;
    });
  }
}

export class StorageService implements StorageRepository {
  constructor(private storageClient: StorageRepository) {}

  storeTask(task: TaskItem): Effect.Effect<TaskItem, StorageError> {
    return Effect.gen(this, function* (_) {
      return yield* _(this.storageClient.storeTask(task));
    });
  }
}
