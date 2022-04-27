const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");


// get route return all items
router.get("/",function(req,res){
    return res.json({items})
})

// post route add new item
router.post("/",(req,res) =>{
    const newItem = {name: req.body.name,
                    price : req.body.price}
    items.push(newItem)
    return res.json({added : newItem})
})

// get route return 1 item
router.get("/:name",(req,res)=>{
    const foundItem = items.find(item => item.name === req.params.name)
    if(foundItem === undefined){
        throw new ExpressError("Item not found",404)
    }
    return res.json(foundItem)
})

//patch route update item
router.patch("/:name",(req,res)=>{
    const foundItem = items.find(item => item.name === req.params.name)
    if(foundItem === undefined){
        throw new ExpressError("Item not found",404)
    }
    foundItem.name = req.body.name;
    foundItem.price = req.body.price;
    return res.json(foundItem)
})

//delete route delete item
router.delete("/:name",(req,res)=>{
    // find the index instead of item
    const foundItem = items.findIndex(item => item.name === req.params.name);
    if(foundItem === -1){
        throw new ExpressError("Item not found",404)
    }
    items.splice(foundItem,1)
    return res.json({message:"Deleted"})
})

module.exports = router;