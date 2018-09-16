var express = require('express');
var router = express.Router();
var http = require('http');
var path = require('path');
var url = require('url');
var formDataToObject = require("form-data-to-object");

var users = require('../models/user_schema');
var hospitals = require('../models/hospital_schema')
var mongoose = require('mongoose');


router.get('/',function (req, res, next) {
  res.sendFile(path.join(__dirname,"../public/index.html"));
});


//LOGIN
router.get('/login', function(req, res, next) {
  res.send('hello');
});
/* GET home page. */
router.post('/login', function(req, res, next) {
  res.send(req.body.email);
  if((req.body.email == "adarsh.brata@gmail.com" && req.body.password=="adarsh") || (req.body.email == "dikshant.brahma@gmail.com" && req.body.password=="dikshant")){
    res.send("hello")
    //res.render('profile', {password :req.password});
  } else {
    res.send('not welcome')
  }
});


//SIGNUP------------------------------------------------------------------------------------------------------------------
router.get('/signup', function (req, res) {
  
});

router.post('/signup', function (req, res) {

    console.log(req.body.email);
    var newUser = new users({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      userage : req.body.age,
      userNumber : req.body.number,
      address : req.body.address,
      pincode : req.body.pincode,
    });

    newUser.save()
      .then(() => {
        console.log("SAVED USER");
        res.sendFile(path.join(__dirname,'../public/login.html'));
      })
      .catch(err => {
        res.send(err)
      });
});

//SEARCH HOSPITAL---------------------------------------------------------------------------------------------------------
router.get('/hospital/search', function (req, res, next) {
  
  res.render('demosearch', {name : "Adarsh"})

  
  // hospitals.findBy({

  // });


});

router.post('/hospital/search', function (req, res, next) {
  console.log(req.body);
  const query = req.body.checkbox.reduce((a, x) => ({ ...a,
    [x]: {
      '$gte': 0
    }
  }), {});

  console.log(query);

  hospitals.find(query)
    .then((data) => {
      console.log(data);
    })
    .catch(err =>{
      res.send(err)
    })

  res.render('layout', {});
})



//Register Hospitals -----------------------------------------------------
router.get('/hospital/register', function (req, res, next) {
  res.sendFile(path.join(__dirname,'../public/hosp_form.html'));
});

router.post('/hospital/register', function (req, res, next) {
  console.log(req.body)
  var newHosp = new hospitals({
    h_name: req.body.h_name,
    number: req.body.number,
    email: req.body.email,
    password : req.body.password,
    address: req.body.address,
    pincode: req.body.pincode,
    ENT : req.body.ENT, 
    Surgery: req.body.Surgery,
    Medicine: req.body.Medicine,
    SkinVD: req.body.SkinVD,
    gynaecology: req.body.gynaecology,
    Orthopedics: req.body.Orthopedics,
    Paediatric: req.body.Paediatric,
    Gastroenterology: req.body.Gastroenterology,
    Neurology: req.body.Neurology,
    Neurosurgery: req.body.Neurosurgery,
    PlasticSurgery: req.body.PlasticSurgery,
    Nephrology: req.body.Nephrology,
    Urology: req.body.Urology,
    CasualtyService: req.body.CasualtyService,
    ChildDelivery: req.body.ChildDelivery,
    NICU: req.body.NICU,
    ICU: req.body.ICU,
    Ambulance24: req.body.Ambulance24,
    HaemoglobinA: req.body.HaemoglobinA,
    Urine : req.body.urine,
    Sugar : req.body.sugar,
    Lipid : req.body.lipid,
    ICTMalaria : req.body.malaria,
    Lymphocyte : req.body.lymph
  });

  newHosp.save()
    .then((RES) => {
      console.log(RES);
      res.sendFile(path.join(__dirname,'../public/weWillVerify.html'))
    })
    .catch(err =>{
      res.send(err)
    })
});

//SEARCH DOCTOR------------------------------------------------------------------------------------------------------------
router.get('/doctor/search')

module.exports = router;
