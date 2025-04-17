 const express=require('express')
 const {handlegenerateNewShortURL}=require('../controllers/url')
 const router=express.Router()

 router.route('/')
 .post(handlegenerateNewShortURL)

 module.exports=router;