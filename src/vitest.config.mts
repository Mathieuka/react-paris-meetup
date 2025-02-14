import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import * as path from "node:path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    env: {
      IS_REACT_ACT_ENVIRONMENT: "true",
    },
    environment: "jsdom",
    globals: true,
    include: [path.resolve(__dirname, "./**/*.test.[jt]s?(x)")],
    setupFiles: [path.resolve(__dirname, "setupTests.ts")],
  },
});
