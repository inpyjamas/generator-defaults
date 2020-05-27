import helpers from "yeoman-test";
import path from "path";
import { InPyjamasGenerator } from "../lib/in-pyjamas-generator";
const endSpy = jest
  .spyOn(InPyjamasGenerator.prototype, "spawnCommand")
  .mockImplementation(jest.fn());
afterAll(() => {
  jest.restoreAllMocks();
});
beforeEach(() => {
  return (
    helpers
      .run(path.resolve(__dirname, "../index"))
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .inTmpDir(_dir => {})
      .withPrompts({
        name: "foo",
        type: "typescript-express",
        upgrade: true
      })
  );
});

describe("typescript-express template test", () => {
  test("should use the provided name in templates", () => {
    expect(endSpy).toHaveBeenCalledWith("npx", ["npm-check-updates", "-u"]);
    expect(endSpy).toHaveBeenCalledWith("npm", ["i"]);
  });
});
