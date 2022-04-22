const fs = require("fs");
const axios = require("axios");

function cat(path){
    fs.readFile(path,"utf8",(err,data) => {
        if(err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        else{
            console.log(data)
        }
    })
}

async function webCat(url){
    try{
        let res = await axios.get(url)
        console.log(res.data)
    }
    catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let entry = process.argv[2]
if(entry.slice(0,4) === "http"){
    webCat(entry);
}
else{
    cat(entry);
}