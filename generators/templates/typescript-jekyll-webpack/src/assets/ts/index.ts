import { add } from "./lib/stub";

// let count = 0;
document.addEventListener("DOMContentLoaded", function() {
  console.log(`2 + 2 = ${add({ a: 2, b: 3 })}`);
  // setInterval(() => {
  // count = add({ a: count, b: 1 });
  // console.log(count);
  // // }, 1000);

  // console.log(
  //   "Array map",
  //   [1, 2, 3].map(elem => elem + 1)
  // );
  // console.log("Object keys", Object.keys({ foo: 1, bah: 2 }));

  // const p = new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(true);
  //   }, 5000);
  // });

  // p.then(res => {
  //   console.log("Promise resolved", res);
  // });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // if (window.LiveReload !== undefined) {
  //   window.LiveReload.connector.socket.onmessage = message => {
  //     console.log(message);
  //   };
  //   console.log(window.LiveReload.connector);

  // window?.LiveReload.performReload({ command: "reload", path: "/" });
  // }
});
