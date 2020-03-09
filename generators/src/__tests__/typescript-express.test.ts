import helpers from "yeoman-test";
import path from "path";
import rimraf from "rimraf";
// import assert from "yeoman-assert";
import fs from "fs";
// TODO: Read https://medium.com/@adamdziendziel/how-to-write-tests-for-yeoman-generator-9376ea94201
let testFolderPath = ""; // = path.resolve(__dirname, "./tmp");
// afterAll(() => {
//   rimraf.sync(path.resolve(__dirname, "tmp"));
// });

beforeEach(() => {
  return helpers
    .run(path.resolve(__dirname, "../index"))
    .inTmpDir(dir => {
      testFolderPath = dir;
    })
    .withPrompts({
      name: "foo",
      type: "typescript-express",
      upgrade: false
    });
});
describe("typescript-express template test", () => {
  // eslint-disable-next-line jest/no-test-callback
  test("should create all the files in tmp directory", () => {
    expect(fs.existsSync(`${testFolderPath}/src/index.ts`)).toBe(true);
    expect(fs.existsSync(`${testFolderPath}/src/__tests__/stub.test.ts`)).toBe(
      true
    );
    expect(fs.existsSync(`${testFolderPath}/package.json`)).toBe(true);
    expect(fs.existsSync(`${testFolderPath}/tsconfig.json`)).toBe(true);
    expect(fs.existsSync(`${testFolderPath}/.gitignore`)).toBe(true);
    expect(fs.existsSync(`${testFolderPath}/.prettierignore`)).toBe(true);
  });
});
