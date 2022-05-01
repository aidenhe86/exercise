const express =require("express");
const router = new express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

// return list of companies
router.get("/", async function(req,res,next){
    try{
        const companiesQuery = await db.query("SELECT code, name FROM companies")
        return res.json({companies : companiesQuery.rows})
    }catch(err){
        return next(err)
    }
})

// return obj of company
router.get("/:code", async function(req,res,next){
    try{
        // query the company
        const {code} = req.params;
        const companyQuery = await db.query("SELECT code, name, description FROM companies where code = $1",[code]);

        if(companyQuery.rows.length === 0){
            throw new ExpressError(`No company with code:${code} found.`,404)
        }

        // query all invoice for that company
        const invoiceQuery = await db.query("SELECT id FROM invoices WHERE comp_code = $1",[code])

        // create a new obj and insert the invoces
        const company = companyQuery.rows[0];
        const invoices = invoiceQuery.rows;
        company.invoices = invoices.map(invoice => invoice.id);
        
        return res.json({company : company})
    }catch(err){
        return next(err)
    }
})

// add a company
router.post("/", async function(req,res,next){
    try{
        const {code, name, description} = req.body;
        const newCompany = await db.query(`
        INSERT INTO companies (code, name, description)
        VALUES ($1, $2, $3) RETURNING code, name, description`,
        [code, name, description]);
        return res.status(201).json({company : newCompany.rows[0]})
    }catch(err){
        return next(err)
    }
})

// edit existing company
router.put("/:code", async function(req,res,next){
    try{
        const { code } = req.params;
        const {name, description} = req.body;
        const results = await db.query(`
        UPDATE companies SET name = $1, description = $2 WHERE code = $3
        RETURNING code, name, description`,[name, description, code]);
        if(results.rows.length === 0 ){
            throw new ExpressError(`No company with code:${req.params.code} found.`,404)
        }
        return res.json({company: results.rows[0]})
    }catch(err){
        return next(err)
    }
})

// Delete company
router.delete("/:code", async function(req,res,next){
    try{
        const { code } = req.params;
        const results = await db.query(`DELETE FROM companies WHERE code = $1 RETURNING code`,[code]);
        if(results.rows.length === 0){
            throw new ExpressError(`No company with code:${req.params.code} found.`,404)
        }else{
            return res.send({status: "deleted"})
        }
    }catch(err){
        return next(err)
    }
})

module.exports = router;