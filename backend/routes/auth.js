
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

console.log("found me")
//REGISTER
router.post("/register", async (req, res) => {
  console.log("Authorising");
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user detail and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
      
      console.log(err);
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("Authorising Login");

    //find user in database
     const user = await User.findOne({ email: req.body.email });
     console.log(user);
     !user && res.status(404).json("user not found");

     
     const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("wrong password")
      console.log(validPassword);
      res.status(200).json(user);
      console.log(user+" "+validPassword)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;