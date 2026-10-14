const request = require("supertest");
const app = require('./index.js')

describe("/hello", () => {
  it("responds with json", function (done) {
    request(app)
      .get("/hello?name=John")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("sends a 400 without a name query parameter", function (done) {
    request(app)
      .get("/hello")
      .set("Accept", "application/json")
      .expect(400, done);
  });
});
