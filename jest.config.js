/* eslint-disable @typescript-eslint/no-var-requires */
const utils = require("@inpyjamas/scripts/dist/utlities");
const config = require("@inpyjamas/scripts/dist/config/jest/typescript");
module.exports = utils.merge(config, {
  modulePathIgnorePatterns: ["<rootDir>/generators/templates"],
  testPathIgnorePatterns: [
    "node_modules/",
    "<rootDir>/generators/app",
    "<rootDir>/generators/templates/*",
  ],
});
