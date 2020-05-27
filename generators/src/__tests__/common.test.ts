import helpers from "yeoman-test";
import path from "path";

import fs from "fs";
import { toLowerCase } from "../lib/util";
let testFolderPath = "";
beforeEach(() => {
  return helpers
    .run(path.resolve(__dirname, "../index.ts"))
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
  test("should use the provided name in templates", () => {
    const pkg = JSON.parse(
      fs.readFileSync(`${testFolderPath}/package.json`, "utf8")
    );
    expect(pkg.name).toBe("foo");
  });

  test("should make the provided name lowercase", () => {
    const pkg = JSON.parse(
      fs.readFileSync(`${testFolderPath}/package.json`, "utf8")
    );
    expect(pkg.name).toBe("foo");
  });

  test("to lower case", () => {
    expect(toLowerCase("FOO")).toBe("foo");
  });
});
