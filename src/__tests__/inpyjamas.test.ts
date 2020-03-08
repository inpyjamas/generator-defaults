import helpers from "yeoman-test";
import path from "path";
import rimraf from "rimraf";
import assert from "yeoman-assert";
import fs from "fs";
// TODO: Read https://medium.com/@adamdziendziel/how-to-write-tests-for-yeoman-generator-9376ea94201
// TODO: Make folders of templates and common files relative to all files
// TODO: Do we need npm install yeoman-assert ?
// TODO: Do we need mkdirp ?
afterEach(() => {
  rimraf.sync(path.join(__dirname, "tmp"));
});
describe("in pyjamas", () => {
  // eslint-disable-next-line jest/no-test-callback
  test("should pass", async done => {
    const testFolderPath = path.join(__dirname, "tmp");
    const res = await helpers
      .run(path.join(__dirname, "../../index"))
      .inDir(path.join(testFolderPath))
      .withPrompts({ name: "foo", type: "typescript-express" });
    console.log(res);
    expect(fs.existsSync(`${testFolderPath}/src/index.ts`)).toBe(true);
    expect(assert.file(`${testFolderPath}/src/index.ts`)).not.toThrow();

    done();
  });
});
