import helpers from "yeoman-test";
import path from "path";
// TODO: Read https://medium.com/@adamdziendziel/how-to-write-tests-for-yeoman-generator-9376ea94201
afterEach(() => {
  rimraf.sync(path.join(__dirname, ‘tmp’));
 });
describe("in pyjamas", () => {
  test("should pass", async done => {
    const res = await helpers
      .run(path.join(__dirname, "../index"))
      .inDir(path.join(__dirname, "tmp"))
      .withPrompts({ name: "foo", type: "typescript-express" });
    console.log(res);
    expect(2).toBe(2);
    done();
  });
});
