const {MarkovMachine} = require("./markov");

describe("markov machine",function(){
    test("make chains",function(){
        let mm = new MarkovMachine("I would not eat green eggs and ham.");
        expect(mm.chains).toEqual(new Map([
            ["I",["would"]],
            ["would",["not"]],
            ["not",["eat"]],
            ["eat",["green"]],
            ["green",["eggs"]],
            ["eggs",["and"]],
            ["and",["ham."]],
            ["ham.",[null]]
        ]));
    });

    test("choice pick word from array",function(){
        expect(MarkovMachine.choice([1,1,1,1])).toEqual(1);
        expect([1,2,3]).toContain(MarkovMachine.choice([1,2,3]));
    });

    test("output valid text",function(){
        let texts = ["aa bb","bb cc","cc dd","dd AA","AA"]
        let mm = new MarkovMachine("aa bb cc dd AA");
        let output = mm.makeText();

        // check last word
        expect(output.endsWith("AA")).toBe(true);

        // separate words into array by space/line
        let outputWords = mm.makeText().split(/[ \r\n]+/);

        // check words w/o last word
        for (let i = 0; i < outputWords.length - 1; i++) {
            expect(texts).toContain(outputWords[i] + " " + outputWords[i + 1]);
        }
    });
})