import { TaskItem } from "./types";
import { Data, Effect } from "effect";
import { BucketS3Error, s3StoreFunction } from "../thirdApi/s3";

// Consider applying the Dependency Inversion Principle here to increase flexibility and maintainability.
// This would involve decoupling the high-level processTodo function from low-level storage details,
// allowing for easier changes to storage mechanisms in the future.
export const processTodo = (
  task: TaskItem | undefined,
): Effect.Effect<TaskItem, UnexpectedError | BucketS3Error, never> => {
  return Effect.gen(function* (_) {
    console.log(`⚙️...Process, store task in storage`);

    if (!task) {
      return yield* _(
        Effect.fail(new UnexpectedError("Unexpected error occurred")),
      );
    }
    const program = yield* _(s3StoreFunction(task));

    console.log(`✅...Process, task stored with id : ${task.id}`);

    return program;
  });
};

export class UnexpectedError extends Data.TaggedError("UnexpectedError") {
  message = "Unexpected error occurred";

  constructor(public readonly error: unknown) {
    super();
    console.error("UnexpectedError:", error);
  }
}
