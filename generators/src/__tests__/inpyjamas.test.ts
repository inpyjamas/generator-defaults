import helpers from "yeoman-test";
import path from "path";
import rimraf from "rimraf";
// import assert from "yeoman-assert";
import fs from "fs";
// TODO: Read https://medium.com/@adamdziendziel/how-to-write-tests-for-yeoman-generator-9376ea94201
// TODO: Make folders of templates and common files relative to all files
// TODO: Do we need npm install yeoman-assert ?
// TODO: Do we need mkdirp?
afterAll(() => {
  rimraf.sync(path.resolve(__dirname, "tmp"));
});
describe("typescript-express template test", () => {
  // eslint-disable-next-line jest/no-test-callback
  test("should create all the files in tmp directory", async done => {
    const testFolderPath = path.join(__dirname, "tmp");
    await helpers
      .run(path.resolve(__dirname, "../index"))
      .inDir(path.join(testFolderPath))
      .withPrompts({ name: "foo", type: "typescript-express", upgrade: 0 });
    expect(fs.existsSync(`${testFolderPath}/src/index.ts`)).toBe(true);
    expect(fs.existsSync(`${testFolderPath}/src/__tests__/stub.test.ts`)).toBe(
      true
    );
    expect(fs.existsSync(`${testFolderPath}/package.json`)).toBe(true);
    expect(fs.existsSync(`${testFolderPath}/tsconfig.json`)).toBe(true);
    expect(fs.existsSync(`${testFolderPath}/.gitignore`)).toBe(true);
    expect(fs.existsSync(`${testFolderPath}/.prettierignore`)).toBe(true);
    const pkg = JSON.parse(
      fs.readFileSync(`${testFolderPath}/package.json`, "utf8")
    );
    expect(pkg.name).toBe("foo");
    done();
  });
});
