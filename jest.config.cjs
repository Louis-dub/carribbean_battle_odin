module.exports = {
  testEnvironment: "jsdom",
  reporters: process.env.CI
    ? ["default", ["github-actions", { silent: false }]]
    : ["default"],
};