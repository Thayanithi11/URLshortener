const express=require('express')
const {handleEmptyRequest}=require('../controllers/url')
const router=express.Router()

router.route('/')
.get(handleEmptyRequest)

module.exports=router;