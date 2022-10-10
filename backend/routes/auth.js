const express = require('express');
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Pasword is password';


//Creating user using: POST "/api/auth/createuser. It Doesnt require AUTH " No login Required
router.post('/creatuser', [
    body('empname', 'Enter Valid Name').isLength({ min: 3 }),
    body('empemail', 'Enter Valid Email').isEmail(),
    body('empcontact', 'Must be of 5 characters').isLength({ min: 5 }),
    body('empdept', 'Must be of 5 characters').isLength({ min: 3 }),
    body('emppassword', 'Must be of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // If error return bad request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Checking if the email exists or not
    try {


        let user = await User.findOne({ empemail: req.body.empemail });
        if (user) {
            return res.status(400).json({ errors: "Email Already Exists!" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.emppassword, salt);
        //Creating New User
        user = await User.create({
            empname: req.body.empname,
            empemail: req.body.empemail,
            empcontact: req.body.empcontact,
            empdept: req.body.empdept,
            empjoin: req.body.empjoin,
            emppassword: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        //   console.log(jwtData);

        res.json({ authtoken })
        //Catching error if occured
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})

//Auhenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
    body('empemail', 'Enter a valid email').isEmail(),
    body('emppassword', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { empemail, emppassword } = req.body;
    try {
        let user = await User.findOne({ empemail });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(emppassword, user.emppassword);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-emppassword")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router