import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { InMemoryTaskApi } from "./api/implementation";
import { Task } from "./LooseCouplingApp";
import TaskApiProvider from "./provider/TaskProvider";
import * as storeTaskInStorageModule from "./api/storeTaskInStorage";
import * as S3 from "./thirdApi/s3";
import { Effect } from "effect";

describe("Loose Coupling App", () => {
  test("renders LossTasks", async () => {
    vi.spyOn(storeTaskInStorageModule, "processTodo");

    vi.spyOn(S3, "persistTaskToS3");
    const s3StoreFunctionSpy = vi.spyOn(S3, "persistTaskToS3");
    s3StoreFunctionSpy.mockReturnValue(
      Effect.succeed({
        userId: 1,
        id: 1,
        title: "Fake implementation",
        completed: false,
      }),
    );

    const { findByText } = render(
      <TaskApiProvider
        apiImplementation={
          new InMemoryTaskApi({
            findTask: {
              userId: 1,
              id: 1,
              title: "Fake implementation",
              completed: false,
            },
          })
        }
      >
        <Task />
      </TaskApiProvider>,
    );

    expect(await findByText(/Fake implementation/i)).toBeInTheDocument();

    expect(S3.persistTaskToS3).toHaveBeenCalledTimes(1);
    expect(S3.persistTaskToS3).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        title: "Fake implementation",
        completed: false,
      }),
    );
  });
});
