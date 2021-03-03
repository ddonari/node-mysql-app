
const express = require('express')

// express 
const router = express.Router()

router.get('/', (req,res) => {
    res.send('Hello links')
})

module.exports = router;

