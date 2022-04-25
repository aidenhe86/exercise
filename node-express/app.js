const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const {stringToNums, findMean, findMedian, findMode} = require("./formula");

app.get("/mean",(req,res,next) =>{
    // error if not pass query key nums
    if(!req.query.nums){
        throw new ExpressError("Please pass a query key of nums which is a comma-separated list of numbers.",400)
    }

    // split sting nums by comma
    let strings = req.query.nums.split(',');

    // convert to nums
    nums= stringToNums(strings);

    // if cannot convert throw error
    if(nums instanceof Error){
        throw new ExpressError(nums.message)
    }

    // get result
    result = {
        operation: "mean",
        value : findMean(nums)
    }

    return res.send(result);
})

app.get("/median",(req,res,next) =>{
    // error if not pass query key nums
    if(!req.query.nums){
        throw new ExpressError("Please pass a query key of nums which is a comma-separated list of numbers.",400)
    }

    // split sting nums by comma
    let strings = req.query.nums.split(',');

    // convert to nums
    nums= stringToNums(strings);

    // if cannot convert throw error
    if(nums instanceof Error){
        throw new ExpressError(nums.message)
    }

    // get result
    result = {
        operation: "median",
        value : findMedian(nums)
    }

    return res.send(result);
})


app.get("/mode",(req,res,next) =>{
        // error if not pass query key nums
        if(!req.query.nums){
            throw new ExpressError("Please pass a query key of nums which is a comma-separated list of numbers.",400)
        }
    
        // split sting nums by comma
        let strings = req.query.nums.split(',');
    
        // convert to nums
        nums= stringToNums(strings);
    
        // if cannot convert throw error
        if(nums instanceof Error){
            throw new ExpressError(nums.message)
        }
    
        // get result
        result = {
            operation: "mode",
            value : findMode(nums)
        }
    
        return res.send(result);
})

// general error handler
app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);
  
    // pass the error to next
    return next(err);
  });

app.use(function(err,req,res,next){
    res.status(err.status || 500);

    return res.json({
        error : err,
        message : err.msg
    })
})

app.listen(4000, () => {
    console.log("Server running on port 4000")
  });
  