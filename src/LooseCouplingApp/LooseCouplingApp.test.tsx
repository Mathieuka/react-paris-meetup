import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { InMemoryTaskApi } from "./api/implementation";
import { Task } from "./LooseCouplingApp";
import TaskApiProvider from "./provider/TaskProvider";
import * as storeTaskInStorageModule from "./thirdApi/storeTaskInStorage";

describe("Loose Coupling App", () => {
  test("renders LossTasks", async () => {
    vi.spyOn(storeTaskInStorageModule, "processTodo");

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

    expect(storeTaskInStorageModule.processTodo).toHaveBeenCalledTimes(1);
    expect(storeTaskInStorageModule.processTodo).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        title: "Fake implementation",
        completed: false,
      }),
    );
  });
});
