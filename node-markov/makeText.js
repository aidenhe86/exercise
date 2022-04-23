const fs = require("fs");
const axios = require("axios");
const markov = require("./markov");

// generate text by markov machine
function generateText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

// read file
function file(path){
    fs.readFile(path,"utf8",(err,data) => {
        if(err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        else{
            generateText(data);
        }
    })
}

// read web
async function web(url){
    try{
        let res = await axios.get(url)
        generateText(res.data);
    }
    catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

// check if input file or url
let [method,path] = process.argv.slice(2);


if(method === "file"){
    file(path);
}
else if(method === "url"){
    web(path);
}
else{
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}