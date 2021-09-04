const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');


const router = express.Router();
const Registration = mongoose.model('Registration');

router.get('/',(req,res)=>{
    res.render('home');
})
router.get('/Register',(req,res)=>{
    res.render('Register');
})
router.post('/',[
    check('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    check('email')
      .isLength({ min: 1 })
      .withMessage('Please enter an email'),
    check('resource')
      .isLength({ min: 1 })
      .withMessage('Please enter a resource'),
    check('location')
      .isLength({ min: 1 })
      .withMessage('Please enter a location'),
  ], (req, res) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
      const registration = new Registration(req.body);
      registration.save()
      .then(()=>{res.send('Thank you for your registration!');})
      .catch((err)=>{
        console.log(err);
        res.send('Sorry! Something went wrong');
      });
    }else{
      res.render('Register',{
        errors: errors.array(),
        data: req.body,
      });
    }
  });
  router.get('/resources',(req, res)=>{
    Registration.find()
      .then((registrations)=>{
        res.render('resources',{registrations});
      })
      .catch(()=>{res.send('Sorry! Something is wrong.');});
  })
  router.get('/contact',(req,res)=>{
    res.render('contact')
  })

module.exports = router;