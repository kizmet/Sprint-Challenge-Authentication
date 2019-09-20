const request = require("supertest");

const db = require("../database/dbConfig.js");
const server = require("../app.js");

describe("server", () => {
  beforeEach(async () => {
    // guarantees that the table is cleaned out before any of the tests run
    await db("users").truncate();
  });

  it('tests are running with DB_ENV set as "testing"', () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("returns 200 OK", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should return a JSON object from the index route", () => {
      const expectedBody = { message: "API is up and running!" };
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body).toEqual(expectedBody);
        });
    });
  });

  describe("Jokes Router", () => {
    describe("GET /api/jokes", () => {
      it("returns 200 OK", () => {
        return request(server)
          .get("/api/jokes")
          .set(
            "Authorization",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImJyeWFudCIsImlhdCI6MTU2ODk5ODM1MiwiZXhwIjoxNTY5MDI3MTUyfQ.xbFppROn08U9I_8eFsw84Nj5wEkUAcc4-ntTOio76gY"
          )
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });
    describe("POST /api/auth/register", () => {
      it("returns 201 and adds user", () => {
        return request(server)
          .post("/api/auth/register")
          .send({
            username: "samwell",
            password: "guessme"
          })
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
    });
    describe("POST /api/auth/login", () => {
      it("returns 201 and adds user", () => {
        return request(server)
          .post("/api/auth/login")
          .send({
            username: "bryant",
            password: "password"
          })
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
    });
  });
});
