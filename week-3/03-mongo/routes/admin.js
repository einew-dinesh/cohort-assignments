const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require("./../db/index");

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    Admin.create({
        username:username,
        password:password
    }).then(()=>{
        res.json({
            message: 'Admin created successfully' 
        })
    })
    
        
});    

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    Course.create({
        title,
        description,
        price,
        imageLink
    }).then((value)=>{
        res.json({ 
            message: 'Course created successfully', 
            courseId: value._id
        })
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({}).then((value)=>{
        res.json({
            courses:value
        });
    })
});

module.exports = router;