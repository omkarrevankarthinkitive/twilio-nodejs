require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sendSms = require("./Twilio.js");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = 3020;

const userDatabase = [];

// Create user endpoint
app.post("/sms", (req, res) => {
  const { email, password, phone, message } = req.body;
  const user = {
    email,
    password,
    phone,
    message,
  };
  console.log(user);
  userDatabase.push(user);

  sendSms(user.phone, message);

  res.status(201).send({
    message: "Your message has been sent",
    data: user,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
