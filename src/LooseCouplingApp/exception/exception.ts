import { Data } from "effect";

export class BucketS3Error extends Data.TaggedError("BucketS3Error") {
  message = "S3 bucket error occurred";

  constructor(public readonly error: unknown) {
    super();
    console.error("BucketS3Error:", error);
  }
}

export class UnexpectedError extends Data.TaggedError("UnexpectedError") {
  message = "Unexpected error occurred";

  constructor(public readonly error: unknown) {
    super();
    console.error("UnexpectedError:", error);
  }
}
