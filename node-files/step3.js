const fs = require("fs");
const axios = require("axios");
let out;
let entry;

// handle output
function handleOutput(text,out){
    if(out){
        fs.writeFile(out,text,"utf8",(err) =>{
            if(err){
                console.error(`Error writing ${out}: ${err}`);
                process.exit(1);
            }
        })
    }else{
        console.log(text)
    }
}

// read txt file
function cat(path,out){
    fs.readFile(path,"utf8",(err,data) => {
        if(err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }else{
            handleOutput(data,out);
        }
    })
}

// read url
async function webCat(url,out){
    try{
        let res = await axios.get(url);
        handleOutput(res.data,out);
    }catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}



// read argument to output
// let entry = process.argv[2]
if(process.argv[2] === "--out"){
    out = process.argv[3];
    entry = process.argv[4];
}else{
    entry = process.argv[2];
}


if(entry.slice(0,4) === "http"){
    webCat(entry,out);
}
else{
    cat(entry,out);
}