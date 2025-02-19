import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TightCouplingApp from "./TightCouplingApp";
import * as fetchTaskModule from "./fetchTask/fetchTask";
import * as storeMetadataModule from "./storeMetada/storeMetadata";

describe("Tight Coupling App", () => {
  test("Fetch a task and displays it correctly", async () => {
    // Prepare
    const useFetchTaskMock = vi.spyOn(fetchTaskModule, "fetchTask");
    const storeMetadataMock = vi.spyOn(storeMetadataModule, "storeMetaData");

    useFetchTaskMock.mockResolvedValue({
      userId: 1,
      id: 1,
      title: "Fake implementation",
      completed: false,
    });
    storeMetadataMock.mockImplementation(() => Promise.resolve(true));

    // Execute
    const { findByText } = render(<TightCouplingApp />);

    // Assert
    expect(await findByText(/Fake implementation/i)).toBeInTheDocument();
  });
});
