import {expect} from "chai";
import {JSDOM} from "jsdom";

describe("Our first test", () => {
  it("Should pass", () => {
    expect(true).to.equal(true);
  });
});

// Commented out to prevent failure while building other portions of boilerplate
// describe("Our second test", () => {
//     it("Should fail", () => {
//         expect(true).to.equal(false);
//     });
// });

describe("index.html", () => {
  it("should have h1 that says \"Typescript Web Development Starter Kit\"", (done) => {
    const options = { };
    JSDOM.fromFile("./src/index.html", options).then((dom) => {
      const h1 = dom.window.document.getElementsByTagName("h1")[0];
      // noinspection JSDeprecatedSymbols
      expect(h1.innerHTML).to.equal("Typescript Web Development Starter Kit");
      done();
    }).catch(done);
  });
});
