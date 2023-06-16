import nodemailer from "nodemailer";
import fs from "node:fs/promises";
export default async function handler(req, res) {
  console.log("0000----------------", req.body);

  const template = {
    from: "xxdoubleyou@gmail.no-reply.com",
    to: req.body.email,
    subject: `Adobe After Effects Plugins`,
    // text: "Tata bye bye",
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <!-- <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"> -->
        
    
    </body>
    
    </html>`,
  };

  const mailer = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    service: "gmail.com",
    auth: {
      user: "xxdoubleyou@gmail.com",
      pass: process.env.APP_PASS,
    },

    //   secure: true,
  });

  try {
    mailer.sendMail(template, (err) => {
      console.log(err);
    });
    res.status(200).send("Successfully send");
  } catch (err) {
    res.status(200).send("Successfully send");
  }
}
