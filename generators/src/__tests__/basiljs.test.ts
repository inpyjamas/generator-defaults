import helpers from "yeoman-test";
import path from "path";
// import assert from "yeoman-assert";
import fs from "fs";
import { InPyjamasGenerator } from "../lib/in-pyjamas-generator";
import { dependencies } from "../lib/dependencies";
import { devDependencies } from "../lib/dev-dependencies";
// TODO: Read https://medium.com/@adamdziendziel/how-to-write-tests-for-yeoman-generator-9376ea94201
let testFolderPath = ""; // = path.resolve(__dirname, "./tmp");
// afterAll(() => {
//   rimraf.sync(path.resolve(__dirname, "tmp"));
// });
const installSpy = jest
  .spyOn(InPyjamasGenerator.prototype, "npmInstall")
  .mockImplementation(jest.fn());

beforeEach(() => {
  return helpers
    .run(path.resolve(__dirname, "../index.ts"))
    .inTmpDir(dir => {
      testFolderPath = dir;
    })
    .withPrompts({
      name: "foo",
      type: "basiljs",
      upgrade: false
    });
});
afterAll(() => {
  jest.restoreAllMocks();
});
describe("basil template test", () => {
  // eslint-disable-next-line jest/no-test-callback
  test("should create all the files in tmp directory", () => {
    expect(fs.existsSync(`${testFolderPath}/index.js`)).toBe(true);
    expect(fs.existsSync(`${testFolderPath}/package.json`)).toBe(true);
    expect(fs.existsSync(`${testFolderPath}/.gitignore`)).toBe(true);
    expect(fs.existsSync(`${testFolderPath}/.prettierignore`)).toBe(true);
    expect(installSpy).toHaveBeenCalledWith(dependencies["basiljs"], {
      "save-exact": true
    });
    expect(installSpy).not.toHaveBeenCalledWith(devDependencies["basiljs"]);
  });
});
