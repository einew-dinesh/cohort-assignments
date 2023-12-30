const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User,Course } = require("../../03-mongo/db");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")




router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        username:username
    }).then(()=>{
        res.json({
            message:"Signed in successfully",
            token : jwt.sign(username,"secret")
        })
        
    })
});

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    }).then(()=>{
        res.json({
            message:"User Created Successfully"
        })
    })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({}).then((value)=>{res.json({courses:value})})
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    User.updateOne({
        username:username
    },{
        "$push":{
            purchasedCourses: new mongoose.Types.ObjectId(courseId)
        }
    }).then(()=>{
        res.json({
            message:"Purchased Course Successfully"
        })
    })

});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    User.findOne({
        username:req.headers.username
    }).then((value)=>{
        
        Course.find({
            _id:{
                "$in":value.purchasedCourses
            }
        }).then((courses)=>{
            res.json({
                courses:courses
            })
        })
    })
});

module.exports = router