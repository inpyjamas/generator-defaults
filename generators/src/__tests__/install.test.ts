import { devDependencies } from "./../lib/dev-dependencies";
import { dependencies } from "./../lib/dependencies";
import helpers from "yeoman-test";
import path from "path";
import { InPyjamasGenerator } from "../lib/in-pyjamas-generator";
const installSpy = jest
  .spyOn(InPyjamasGenerator.prototype, "npmInstall")
  .mockImplementation(jest.fn());

beforeEach(() => {
  return (
    helpers
      .run(path.resolve(__dirname, "../index"))
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .inTmpDir(_dir => {})
      .withPrompts({
        name: "foo",
        type: "typescript-express",
        upgrade: false
      })
  );
});

describe("typescript-express template test", () => {
  test("should use the provided name in templates", () => {
    // console.log(installSpy.mock);
    expect(installSpy).toHaveBeenCalledWith(
      dependencies["typescript-express"],
      { "save-exact": true }
    );
    expect(installSpy).toHaveBeenCalledWith(
      devDependencies["typescript-express"],
      { "save-exact": true, "save-dev": true }
    );
  });
});
