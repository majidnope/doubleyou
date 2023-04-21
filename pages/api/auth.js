import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { serialize } from "cookie";

export default async function handler(req, res) {
  await mongoose.connect(process.env.DB_URL);

  console.log(req.method, req.query?.option);

  // Parse cookies string into an object
  //   const cookiesObject = cookies.split(";").reduce((acc, cookie) => {
  //     const [name, value] = cookie.trim().split("=");
  //     return { ...acc, [name]: decodeURIComponent(value) };
  //   }, {});

  const cookiesObject = req.headers;

  console.log(req.headers.token, res, "---d-d-d-");

  const AuthSchema = new mongoose.Schema(
    {
      email: String,
      password: String,
    },
    { timestamps: true }
  );

  const Auth = mongoose.models.users || mongoose.model("users", AuthSchema);
  try {
    if (req.method == "POST" && req.query?.option == "reg") {
      const user = await Auth.findOne({ email: req.body.email });
      if (user) res.status(402).send("user already exist");
      else {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        Auth.insertMany([req.body]);
        res.status(200).send("done");
      }
    } else if (req.method == "POST" && req.query?.option == "login") {
      const user = await Auth.findOne({ email: req.body.email });
      if (req.body.password && user) {
        //   const verified = await bcrypt.compare(req.body.password, user.password);
        const verified = req.body.password == user.password;
        if (verified) {
          console.log(user, "---", process.env.JWT_KEY);
          const data = jwt.sign(JSON.stringify(user), process.env.JWT_KEY);
          const cookie = serialize("token", data, {
            httpOnly: true,
            path: "/",
          });
          res.setHeader("Set-Cookie", cookie);
          res.status(200).end();
        } else {
          res.status(401).json({ message: "wrong password " });
        }
      } else {
        res.status(204).json({ message: "no user " });
      }
    } else if (req.method == "GET" && req.query?.option == "profile") {
      console.log(cookiesObject);
      if (cookiesObject.token) {
        const verified = jwt.verify(cookiesObject.token, process.env.JWT_KEY);
        if (verified) {
          res.status(200).json({ username: verified.email });
        } else {
          res.status(402).send("no access");
        }
      } else {
        res.status(402).send("no access");
      }
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(401).end();
  }
}
