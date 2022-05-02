process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const {createDataBase} = require("./_test.common");

// insert data before test
beforeEach(createDataBase);

// end database after testing
afterAll(async() =>{
    await db.end()
});

describe("GET / route",function(){
    test("Should returns an array of companies", async function(){
        const res = await request(app).get("/companies");
        expect(res.body).toEqual({
            "companies": [
              {
                "code": "apple",
                "name": "Apple Computer"
              },
              {
                "code": "ibm",
                "name": "IBM"
              }
            ]
          })
        expect(res.statusCode).toBe(200);
    })
})

describe("GET /apple route",function(){
    test("Should return company information", async function(){
        const res = await request(app).get("/companies/apple");
        expect(res.body).toEqual({
            "company": {
              "code": "apple",
              "name": "Apple Computer",
              "description": "Maker of OSX.",
              "invoices": [1,2,3]
            }
        })
        expect(res.statusCode).toBe(200);
    })

    test("Should return 404 if not found company",async function(){
        const res = await request(app).get("/companies/notexist");
        expect(res.statusCode).toBe(404);
    })
})

describe("POST / route",function(){
    test("Should add a new company",async function(){
        const res = await request(app).post("/companies").send({
            name : "Test1",description : "testing"})
        expect(res.body).toEqual({
            "company": {
            "code": "test1",
            "name": "Test1",
            "description": "testing"
            }
        })
    })

    test("Should return 500 if name already exist",async function(){
        const res = await request(app).post("/companies").send({
            name : "Apple Computer",description : "Maker of OSX."})
        expect(res.statusCode).toBe(500);
    })
})

describe("PUT /:code route",function(){
    test("Should return the edited company info", async function(){
        const res = await request(app).put("/companies/apple").send({
            name : "Edited",description : "Edited description."})
        expect(res.body).toEqual({
            "company": {
                "code": "apple",
                "name": "Edited",
                "description": "Edited description."
            }
        });
    })

    test("Should return 404 if code not exist", async function(){
        const res = await request(app).put("/companies/notexist");
        expect(res.statusCode).toBe(404);
    })

    test("Should return 500 if missing data", async function(){
        const res = await request(app).put("/companies/apple").send({});
        expect(res.statusCode).toBe(500);
    })
})

describe("DELETE /:code route",function(){
    test("Should return the status delete", async function(){
        const res = await request(app).delete("/companies/apple");
        expect(res.body).toEqual({status: "deleted"});
    })

    test("Should return 404 if company not exist", async function(){
        const res = await request(app).delete("/companies/notexist");
        expect(res.statusCode).toBe(404);
    })
})


