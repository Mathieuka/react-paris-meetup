import { Data } from "effect";

export class StuffError extends Data.TaggedError("StuffError") {
  message = "Stuff error occurred";

  constructor(public readonly error: unknown) {
    super();
    console.error("StuffError:", error);
  }
}

export class UnexpectedError extends Data.TaggedError("UnexpectedError") {
  message = "Unexpected error occurred";

  constructor(public readonly error: unknown) {
    super();
    console.error("UnexpectedError:", error);
  }
}
