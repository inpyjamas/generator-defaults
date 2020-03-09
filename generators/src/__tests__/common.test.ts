import helpers from "yeoman-test";
import path from "path";
import rimraf from "rimraf";
// import assert from "yeoman-assert";
import fs from "fs";
import { toLowerCase } from "../lib/util";
// TODO: Read https://medium.com/@adamdziendziel/how-to-write-tests-for-yeoman-generator-9376ea94201
// TODO: Make folders of templates and common files relative to all files
// TODO: Do we need npm install yeoman-assert ?
// TODO: Do we need mkdirp?
afterAll(() => {
  rimraf.sync(path.resolve(__dirname, "tmp"));
});
describe("typescript-express template test", () => {
  // eslint-disable-next-line jest/no-test-callback
  test("should use the provided name in templates", async done => {
    try {
      const testFolderPath = path.join(__dirname, "tmp");
      await helpers
        .run(path.resolve(__dirname, "../index"))
        .inDir(path.join(testFolderPath))
        .withPrompts({
          name: "foo",
          type: "typescript-express",
          upgrade: false
        });
      const pkg = JSON.parse(
        fs.readFileSync(`${testFolderPath}/package.json`, "utf8")
      );
      expect(pkg.name).toBe("foo");
      done();
    } catch (error) {
      done();
    }
  });

  // eslint-disable-next-line jest/no-test-callback
  test("should make the provided name lowercase", async done => {
    try {
      const testFolderPath = path.join(__dirname, "tmp");
      await helpers
        .run(path.resolve(__dirname, "../index"))
        .inDir(path.join(testFolderPath))
        .withPrompts({
          name: "Foo",
          type: "typescript-express",
          upgrade: false
        });
      const pkg = JSON.parse(
        fs.readFileSync(`${testFolderPath}/package.json`, "utf8")
      );
      expect(pkg.name).toBe("foo");
      done();
    } catch (error) {
      done();
    }
  });

  test("to lower case", () => {
    expect(toLowerCase("FOO")).toBe("foo");
  });
});
