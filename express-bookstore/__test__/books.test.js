process.env.NODE_ENV = "test";
const request = require("supertest");
const db = require("../db");
const app = require("../app");

beforeEach(async () => {
    let result = await db.query(`
      INSERT INTO
        books (isbn, amazon_url,author,language,pages,publisher,title,year)
        VALUES(
          '0691161518',
          'http://a.co/eobPtX2',
          'Matthew Lane',
          'english',
          264,
          'Princeton University Press',
          'Power-Up: Unlocking the Hidden Mathematics in Video Games', 
          2017)
        RETURNING isbn`);
  
    book_isbn = result.rows[0].isbn
  });

afterEach(async ()=>{
    await db.query("DELETE FROM BOOKS")
});

afterAll(async() =>{
    await db.end()
});

describe("GET / route",function(){
    test("Should return a list of books", async function(){
        const res = await request(app).get("/books");
        expect(res.body).toEqual({
            "books": [
                {
                    "isbn": "0691161518",
                    "amazon_url": "http://a.co/eobPtX2",
                    "author": "Matthew Lane",
                    "language": "english",
                    "pages": 264,
                    "publisher": "Princeton University Press",
                    "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                    "year": 2017
                }
            ]
        })
        expect(res.statusCode).toBe(200);
    })
})

describe("GET /:isbn route", function(){
    test("Should return a single book with provided isbn", async function(){
        const res = await request(app).get(`/books/${book_isbn}`);
        expect(res.body).toEqual({
            "book": {
                "isbn": "0691161518",
                "amazon_url": "http://a.co/eobPtX2",
                "author": "Matthew Lane",
                "language": "english",
                "pages": 264,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2017
            }
        });
        expect(res.statusCode).toBe(200);
    })
})

describe("POST / route",function(){
    test("Create a new book", async function(){
        const res = await request(app).post("/books").send({
            isbn: '32794782',
            amazon_url: "https://taco.com",
            author: "mctest",
            language: "english",
            pages: 1000,
            publisher: "yeah right",
            title: "amazing times",
            year: 2000
        });
        expect(res.body).toEqual({
            "book": {
                "isbn": "32794782",
                "amazon_url": "https://taco.com",
                "author": "mctest",
                "language": "english",
                "pages": 1000,
                "publisher": "yeah right",
                "title": "amazing times",
                "year": 2000
            }
        });
        expect(res.statusCode).toBe(201);
    })
    test("Return 400 error if require info not provided", async function(){
        const res = await request(app).post("/books").send({title:"something"})
        expect(res.statusCode).toBe(400);
    })
})

describe("PUT /:isbn route", function(){
    test("Update an existing book",async function(){
        const res = await request(app).put(`/books/${book_isbn}`).send({
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematicin Video Games",
            "year": 2017
        });
        expect(res.body).toEqual({
            "book": {
                "isbn": "0691161518",
                "amazon_url": "http://a.co/eobPtX2",
                "author": "Matthew Lane",
                "language": "english",
                "pages": 264,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematicin Video Games",
                "year": 2017
            }
        });
        expect(res.statusCode).toBe(200);
    })

    test("Return 400 if input wrong info", async function(){
        const res = await request(app).put(`/books/${book_isbn}`).send({
            "wrong_input" : "Should not add",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematicin Video Games",
            "year": 2017
        })
        expect(res.statusCode).toBe(400);
    })
})

describe("DELETE /:isbn route",function(){
    test("Should return the status delete", async function(){
        const res = await request(app).delete(`/books/${book_isbn}`);
        expect(res.body).toEqual({message: "Book deleted"});
    })
})