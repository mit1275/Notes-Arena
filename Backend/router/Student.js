const express = require("express");
const expressAsynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Student = require("../model/Student");
const jwt = require("jsonwebtoken");
const generate = require("../utils/generatetokens");
const studentRoute = express.Router();



studentRoute.post(
  "/signin",
  expressAsynchandler(async (req, res) => {
    let token;
    console.log(req.body.email);
    if (!req.body.email) {
      return res.send({ message: "Please Enter email id" });
    } else if (!req.body.password) {
      return res.send({ message: "Please enter password" });
    }
    // console.log("Request");
    const student = await Student.findOne({ email: req.body.email });

    console.log(req.body.email + " wants to sign in ");

    if (student) {
      console.log(req.body.email + " signin found in database");

      if (bcrypt.compareSync(req.body.password, student.password)) {
        

    
        return res.send({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          token:generate(student._id),
          message: "Success",
        });
      } else {
        console.log("Invalid Password");
        res.send({
          message: "Invalid email or password",
        });
        // window.location.reload();
      }
    } else {
      console.log("Invalid Email");
      res.send({
        message: "Invalid email or password",
      });
      // window.location.reload();
    }
  })
);


studentRoute.post(
  "/signup",
  expressAsynchandler(async (req, res) => {
    console.log(req.body.email + " requested to register");

    const student = await Student.findOne({ email: req.body.email });

    if (student) {
      console.log(req.body.email + " already registered ");
      res.send({
        message: "Email Already Registered",
      });
    } else {
     

      const user = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        contactNo: req.body.contactNo,
        // token:generate(user._id),
      });

      console.log(user.firstName);
      console.log(user.email);
      console.log(user.lastName);
      console.log(user.password);
      console.log(user.contactNo);

      const creatstudent = await user.save();

      console.log(req.body.email + " student created");

      res.status(200).send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNo: user.contactNo,
        token:generate(user._id),
        message: "Success",
      });
    }
  })
);

studentRoute.get(
  "/:id",
  expressAsynchandler(async (req, res) => {
    const sellerId = req.params.id;
    try {
      const seller = await Student.findOne({ _id: sellerId });
      if (seller) {
        return res.status(200).send({
          message: "Success",
          seller: seller,
        });
      }
      return res
        .status(400)
        .send({ message: "Could not find the requested resource" });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Could not find the requested resource" });
    }
  })
);

module.exports = studentRoute;
