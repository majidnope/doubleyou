import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("0000----------------", req.body);

  const template = {
    from: "xxdoubleyou@gmail.no-reply.com",
    to: req.body.email,
    subject: `Adobe After Effects Plugins`,
    html: `<div align="center">
    <h4>Hello, ${req.body.name}</h4>
    <h3 align="center">
    One more step! Click the button below to download </h3>
    <a href="https://www.doubleyou.site/download/verify/${req.body.email}">
    <button  style="border: none;
    outline: none;
    background: #04d6ff;
    width: 145px;
    height: 41px;
    color: white;
    cursor: pointer;
    border-radius: 5px;">
    GET PLUGINS
    </button>
    </a>
    
    <p align="center">
    Contact me on Instagram <a target="_blank" href="https://www.instagram.com/thewahid.me/">@thewahid.me</a>

    </p>
    </div>`,
  };

  const mailer = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    service: "gmail.com",
    auth: {
      user: "xxdoubleyou@gmail.com",
      pass: process.env.APP_PASS,
    },

    secure: true,
  });

  mailer.sendMail(template, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send("Successfully send");
    }
  });
}
