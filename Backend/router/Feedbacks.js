const express = require("express");
// const Feedback = require("./Feedback");
const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { getMaxListeners } = require("../model/Student");

const feedbackRouter = express.Router();
feedbackRouter.post("/", expressAsyncHandler(async(req, res) => {

    const emails = req.body.email;
    const name = req.body.name;
    const messages = req.body.message;
    console.log(emails);
    const transporter = nodemailer.createTransport(
        sendgridTransport({
            auth: {
                api_key:'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',
            },
        })
    );
    // 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
    transporter.sendMail({
        to: emails,
        from: 'mit1275mit1234@gmail.com',
        subject: "Feedback",
        html: `<h1>Welcome to Notes Arena</h1>
           <p></p>
          <h2> Hello Mr. ${name} we have recieved your feedback</h2>
        
        <h3>${messages}</h3>`,
    });
}))
module.exports = feedbackRouter;