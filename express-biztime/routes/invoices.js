const express =require("express");
const router = new express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

// return info on invoices
router.get("/", async function(req,res,next){
    try{
        const invoicesQuery = await db.query("SELECT id, comp_code FROM invoices")
        return res.json({invoices : invoicesQuery.rows})
    }catch(err){
        return next(err)
    }
})

// return obj on given invoice
router.get("/:id", async function(req,res,next){
    try{
        const invoiceQuery = await db.query(`
        SELECT i.id, i.comp_code, i.amt, i.paid, i.add_date, i.paid_date, c.name, c.description 
        FROM invoices AS i INNER JOIN companies AS c ON (i.comp_code = c.code) 
        WHERE id = $1`,[req.params.id]);

        if(invoiceQuery.rows.length === 0){
            throw new ExpressError(`No invoice with id:${req.params.id} found.`,404)
        }
        const data = invoiceQuery.rows[0];
        const invoice = {
            id : data.id,
            amt : data.amt,
            paid: data.paid,
            add_data: data.add_data,
            paid_date: data.paid_date,
            company : {
                code : data.comp_code,
                name : data.name,
                description : data.description
            }
        };
        return res.json({invoice : invoice})
    }catch(err){
        return next(err)
    }
})

// add a new invoice
router.post("/", async function(req,res,next){
    try{
        const { comp_code, amt} = req.body;
        const newInvoice = await db.query(`
        INSERT INTO invoices (comp_code, amt)
        VALUES ($1,$2) RETURNING id, comp_code, amt, paid, add_date, paid_date`,
        [comp_code, amt]);
        return res.status(201).json({invoice : newInvoice.rows[0]})
    }catch(err){
        return next(err)
    }
})

// edit existing invoice
router.put("/:id", async function(req,res,next){
    try{
        const { id } = req.params;
        const { amt, paid} = req.body;    

        // search invoice
        const currResult = await db.query(`SELECT paid,paid_date FROM invoices WHERE id = $1`,[id]);

        // return error if not found
        if(currResult.rows.length === 0 ){
            throw new ExpressError(`No invoice with id:${id} found.`,404)
        }

        const currPaid = currResult.rows[0].paid;
        let currPaidDate = currResult.rows[0].paid_date;
        let paidDate = null;

        // change paid date

        // paying unpaid invoice
        if(paid && !currPaid){
            // paying unpaid invoice
            paidDate = new Date();
        }else if(!paid){
            // un paying
            paidDate = null;
        }else{
            paidDate = currPaidDate;
        }

        // update invoice
        const results = await db.query(`
        UPDATE invoices SET amt = $1, paid = $2, paid_date = $3 WHERE id = $4
        RETURNING id, comp_code, amt, paid, add_date, paid_date`,[amt, paid, paidDate, id]);

        return res.json({ invoice: results.rows[0]})
    }catch(err){
        return next(err)
    }
})


// Delete invoice
router.delete("/:id", async function(req,res,next){
    try{
        const { id } = req.params;
        const results = await db.query(`DELETE FROM invoices WHERE id = $1 RETURNING id`,[id]);
        if(results.rows.length === 0 ){
            throw new ExpressError(`No invoice with id:${id} found.`,404)
        }
        return res.send({status: "deleted"})
    }catch(err){
        return next(err)
    }
})

module.exports = router;