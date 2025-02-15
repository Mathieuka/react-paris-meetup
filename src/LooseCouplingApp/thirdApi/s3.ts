import { TaskItem } from "../api/types";

import { Data, Effect } from "effect";

export const persistTaskToS3 = (
  task: TaskItem,
): Effect.Effect<TaskItem, BucketS3Error, never> => {
  return Effect.gen(function* (_) {
    console.log(`⚙️...S3 processing`);

    if (!task) {
      return yield* _(
        Effect.fail(new BucketS3Error("Unexpected error occurred")),
      );
    }

    console.log(`✅ S3 task processed`);

    return yield* _(Effect.succeed(task));
  });
};

export class BucketS3Error extends Data.TaggedError("BucketS3Error") {
  message = "S3 bucket error occurred";

  constructor(public readonly error: unknown) {
    super();
    console.error("BucketS3Error:", error);
  }
}
