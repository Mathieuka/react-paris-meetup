import { Effect } from "effect";
import { TaskItem } from "../core/types";
import { BucketS3Error } from "../exception";

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
