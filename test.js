//Before running the tests kindly check these modules:
// ../routes/product.js
// ../controller/product.js -> createProduct

const request = require("supertest");
const app = require("./app");

jest.mock("./models/product", () => {

  return {

    find: jest.fn().mockResolvedValue([{ id: 1, name: "zeeshan" }]),

    create: jest.fn().mockImplementation((value) => {

      return value;

    }),

    findOne: jest.fn().mockImplementation((id) => {
      return {
        acknowleged: true,
      };
    }),

    findByIdAndUpdate: jest.fn().mockImplementation((id, id2, id3) => {
      return {
        acknowleged: true,
      };
    }),
  };
});

test("get products", async function () {

  const response = await request(app).get("/api/product/");

  expect(response.statusCode).toBe(200);

  expect(response.body.status).toMatch("success");

  expect(response.body).toHaveProperty("data");
});

test("create product", async function () {

  const response = await request(app).post("/api/product/");

  expect(response.statusCode).toBe(200);

  expect(response.body.status).toMatch("success");

  expect(response.body).toHaveProperty("data");
});

test("get one product", async function () {

  const productID = 1;

  const response = await request(app)
    .get(`/api/product/${productID}`)
    .expect(200);

  expect(response.statusCode).toBe(200);

  expect(response.body.status).toMatch("success");
});
