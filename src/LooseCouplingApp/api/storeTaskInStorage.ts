import { TaskItem } from "./types";
import { Data, Effect } from "effect";
import { BucketS3Error, persistTaskToS3 } from "../thirdApi/s3";

// Consider applying the Dependency Inversion Principle here to increase flexibility and maintainability.
// This would involve decoupling the high-level processTodo function from low-level storage details,
// allowing for easier changes to storage mechanisms in the future.
export const processTodo = (
  task: TaskItem | undefined,
): Effect.Effect<TaskItem, UnexpectedError | BucketS3Error, never> => {
  return Effect.gen(function* (_) {
    console.log(`⚙️...Process, persist task in storage`);

    if (!task) {
      return yield* _(
        Effect.fail(new UnexpectedError("Unexpected error occurred")),
      );
    }

    const persistedTask = yield* _(persistTaskToS3(task));

    console.log(`✅ task persisted with id : ${task.id}`);

    return persistedTask;
  });
};

export class UnexpectedError extends Data.TaggedError("UnexpectedError") {
  message = "Unexpected error occurred";

  constructor(public readonly error: unknown) {
    super();
    console.error("UnexpectedError:", error);
  }
}
