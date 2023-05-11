// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const methods = {
  get: "GET",
  post: "POST",
  delete: "DELETE",
};

export default async function handler(req, res) {
  await mongoose.connect(process.env.DB_URL);
  const videoSchema = new mongoose.Schema(
    {
      media: String,
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
    if (req.query.media == "yt") {
      const allVideos = (await Video.find({ media: "yt" })).map(
        (el) => el.videoId
      );
      res.status(200).json(allVideos);
    } else if (req.query.media == "ig") {
      const allVideos = (await Video.find({ media: "ig" })).map(
        (el) => el.videoId
      );
      res.status(200).json(allVideos);
    } else {
      res.status(400).send("need media query");
    }
  } else if (req.method == methods.post) {
    debugger;
    if (cookiesObject.token) {
      const verified = jwt.verify(cookiesObject.token, process.env.JWT_KEY);
      if (verified) {
        const haveOne = await Video.find({ videoId: req.body.videoId });
      
        if (haveOne.length > 0) {
          res.status(403).send("Video already exists ");
        } else {
          if (req.query.media) {
            switch (req.query.media) {
              case "yt":
                req.body.videoId = req.body.videoIdYT;
                break;
              case "ig":
                req.body.videoId = req.body.videoIdIG;
                break;
              default:
                break;
            }

            await Video.insertMany([req.body]);
            res.status(200).send("successfully added");
          } else {
            res.status(400).send("need media");
          }
        }
      } else {
        res.status(402).send("no access");
      }
    }
  } else if (req.method == methods.delete) {
    const id = req.query.videoId;

    try {
      if (id) {
        const data = await Video.findOne(req.query);
        await Video.deleteOne({ videoId: id });
;
        res.status(200).json({ media: data.media });
      } else {
        res.status(504).json({ message: "something went wrong" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    }
  }
}
