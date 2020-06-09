/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * You might need to configure your jest a little more
 * Depending on what you are testing.
 * frontend? use the jsdom environment
 * Backend? node is the default for @inpyjamas scripts
 */
const utils = require("@inpyjamas/scripts/dist/utlities");
const config = require("@inpyjamas/scripts/dist/config/jest/typescript");
module.exports = utils.merge(config, {
  // testEnvironment: "node",
  // testEnvironment: "jsdom",
});
