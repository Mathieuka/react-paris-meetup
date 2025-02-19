import { Data } from "effect";

export class StuffError extends Data.TaggedError("StuffError") {
  message = "Stuff error occurred";

  constructor(public readonly error: unknown) {
    super();
    console.error("StuffError:", error);
  }
}

export class StorageError extends Data.TaggedError("StorageError") {
  message = "Unexpected error occurred";

  constructor(public readonly error: unknown) {
    super();
    console.error("StorageError:", error);
  }
}
