import { add } from "../lib/stub";
describe("default test test", () => {
  test("should pass", () => {
    expect(2).toBe(2);
  });

  test("add function", () => {
    expect(add({ a: 1, b: 1 })).toBe(2);
  });
});
