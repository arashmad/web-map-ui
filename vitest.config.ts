import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    includeSource: ["src/**/*.{js,ts,tsx}"],
    environment: "jsdom", // Ensures jsdom is used as the testing environment
    globals: true, // Optional: Enable global variables like 'describe', 'it', etc.
    // setupFiles: "./src/setupTests.ts", // Any initial setup file for the tests
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"],
    },
  },
});
