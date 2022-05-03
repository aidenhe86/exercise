process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const {createDataBase} = require("./_test.common");

// insert data before test
beforeEach(createDataBase);

// should clear data after each

// end database after testing
afterAll(async() =>{
    await db.end()
});

describe("GET / route",function(){
    test("Should returns an array of invoices", async function(){
        const res = await request(app).get("/invoices");
        expect(res.body).toEqual({
            "invoices": [
                {
                    "id": 1,
                    "comp_code": "apple"
                },
                {
                    "id": 2,
                    "comp_code": "apple"
                },
                {
                    "id": 3,
                    "comp_code": "apple"
                },
                {
                    "id": 4,
                    "comp_code": "ibm"
                }
            ]
        })
        expect(res.statusCode).toBe(200);
    })
})

describe("GET /:id route",function(){
    test("Should return the invoice info", async function(){
        const res = await request(app).get("/invoices/1");
        expect(res.body).toEqual({
            "invoice": {
                "id": 1,
                "amt": 100,
                "paid": false,
                "paid_date": null,
                "company": {
                    "code": "apple",
                    "name": "Apple Computer",
                    "description": "Maker of OSX."
                }
            }
        })
        expect(res.statusCode).toBe(200);
    })

    test("Should return 404 if not found invoice",async function(){
        const res = await request(app).get("/invoices/99");
        expect(res.statusCode).toBe(404);
    })
})

describe("POST / route",function(){
    test("Should add a new invoice",async function(){
        const res = await request(app).post("/invoices").send({
            comp_code : "apple", amt : 1234})
        expect(res.body).toEqual({
            "invoice": {
                "id": expect.any(Number),
                "comp_code": "apple",
                "amt": 1234,
                "paid": false,
                "add_date": expect.any(String),
                "paid_date": null
            }
        })
    })
})

describe("PUT /:code route",function(){
    test("Should return the edited invoice info", async function(){
        const res = await request(app).put("/invoices/1").send({
            amt : 1000, paid : false})
        expect(res.body).toEqual({
            "invoice": {
                "id": 1,
                "comp_code": "apple",
                "amt": 1000,
                "paid": false,
                "add_date": expect.any(String),
                "paid_date": null
            }
        });
    })

    test("Should return 404 if code not exist", async function(){
        const res = await request(app).put("/invoices/1111");
        expect(res.statusCode).toBe(404);
    })

    test("Should return 500 if missing data", async function(){
        const res = await request(app).put("/invoices/1").send({});
        expect(res.statusCode).toBe(500);
    })
})

describe("DELETE /:code route",function(){
    test("Should return the status delete", async function(){
        const res = await request(app).delete("/invoices/1");
        expect(res.body).toEqual({status: "deleted"});
    })

    test("Should return 404 if company not exist", async function(){
        const res = await request(app).delete("/invoices/1111");
        expect(res.statusCode).toBe(404);
    })
})