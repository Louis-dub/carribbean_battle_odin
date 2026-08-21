module.exports = {
  testEnvironment: "jsdom",
  reporters: process.env.CI
    ? ["default", ["github-actions", { silent: false }]]
    : ["default"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.test.{js,jsx,ts,tsx}",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
  ],
};