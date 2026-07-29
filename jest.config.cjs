module.exports = {
  reporters: process.env.CI
    ? ["default", ["github-actions", { silent: false }]]
    : ["default"],
};