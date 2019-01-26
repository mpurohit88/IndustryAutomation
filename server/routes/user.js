const express = require('express')
const User = require('../controllers/user.js');

const userRouter = express.Router();

userRouter.post("/register", User.register);

module.exports = userRouter;