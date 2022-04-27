process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

// default item
let item = {name:"lolipop",price:0.99};

// push in default item
beforeEach(function(){
    items.push(item);
});

// clear all pushed item
afterEach(function(){
    items.length = 0
})

describe("Get /items",function(){
    test("Get a list of items",async function(){
        const res = await request(app).get("/items");
        const {items} = res.body;
        expect(res.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    })
});

describe("Get /items/:name",function(){
    test("Get a single item",async function(){
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(item);
    })

    test("return 404 if item is not found",async function(){
        const res = await request(app).get(`/items/notexist`);
        expect(res.statusCode).toBe(404);
    })
})

describe("Post /items",function(){
    test("Create a new item",async function(){
        const res = await request(app).post("/items").send({
            name : "test1",
            price : 1.25
        })
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({added:{
            name : "test1",
            price : 1.25
        }})
    })
})

describe("Patch /items/:name",function(){
    test("Update a single item", async function(){
        const res = await request(app).patch(`/items/${item.name}`).send({
            name : "test1",
            price : 1.25
        })
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            name : "test1",
            price : 1.25
        })
    })

    test("return 404 if patch item is not found",async function(){
        const res = await request(app).patch(`/items/notexist`);
        expect(res.statusCode).toBe(404);
    })
})

describe("Delete /items/:name",function(){
    test("Delete a single item", async function(){
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted"});
    })

    test("return 404 if delete item is not found",async function(){
        const res = await request(app).delete(`/items/notexist`);
        expect(res.statusCode).toBe(404);
    })
})