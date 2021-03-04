
const express = require('express')

// express 
const router = express.Router()

const { pool } = require('../database')

router.get('/', (req,res) => {
    res.send('Hello links')
})



module.exports = router;



