import helpers from "yeoman-test";
import path from "path";
import rimraf from "rimraf";
// import assert from "yeoman-assert";
import fs from "fs";
import { toLowerCase } from "../lib/util";

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
