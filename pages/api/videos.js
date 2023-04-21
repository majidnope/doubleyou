// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const methods = {
  get: "GET",
  post: "POST",
};

export default async function handler(req, res) {
  await mongoose.connect(process.env.DB_URL);
  const videoSchema = new mongoose.Schema(
    {
      videoId: String,
    },
    { timestamps: true }
  );

  const Video = mongoose.models.videos || mongoose.model("videos", videoSchema);
  // const data = jwt.verify();

  const cookies = req.headers.cookie || "";

  // Parse cookies string into an object
  const cookiesObject = cookies.split(";").reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split("=");
    return { ...acc, [name]: decodeURIComponent(value) };
  }, {});

  if (req.method == methods.get) {
    res
      .status(200)
      .json([
        "eZQ0i4LW9nM",
        "vIamZlt0RYA",
        "vIamZlt0RYA",
        "vIamZlt0RYA",
        "eZQ0i4LW9nM",
      ]);
  } else if (req.method == methods.post) {
    if (cookiesObject.token) {
      const verified = jwt.verify(cookiesObject.token, process.env.JWT_KEY);
      if (verified) {
        Video.insertMany([req.body]);
        res.status(200).send("done");
      } else {
        res.status(402).send("no access");
      }
    }
  }
}
