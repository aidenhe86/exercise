const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const ExpressError = require("../expressError");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");


/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login", async(req,res,next) =>{
    try{
        const {username, password} = req.body;
        if(!username || !password){
            throw new ExpressError("Usename and password required!",400)
        };
        if(await User.authenticate(username,password)){
            const token = jwt.sign({username},SECRET_KEY);
            User.updateLoginTimestamp(username);
            return res.json({token})
        }else{
            throw new ExpressError("Invalid username/password!",400)
        }
    }catch(e){
        return next(e);
    }
})


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post("/resiger",async (req,res,next)=>{
    try{
        // register
        const {username} = await User.register(req.body);

        // send token
        const token = jwt.sign({username},SECRET_KEY);
        return res.json({token});

        // update login timestamp
        User.updateLoginTimestamp(username);
    }catch(e){
        return next(e);
    }
})
