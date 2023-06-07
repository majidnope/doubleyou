import mongoose from "mongoose";

const methods = {
  get: "GET",
  post: "POST",
  delete: "DELETE",
};

export default async function handler(req, res) {
  await mongoose.connect(process.env.DB_URL);
  const subSchema = new mongoose.Schema(
    {
      name: String,
      email: String,
    },
    { timestamps: true }
  );
  const Subscribers = mongoose.model("subscribe", subSchema);
  if (req.method == methods.post) {
    await Subscribers.insertMany([req.body]);
    res.status(200).send("subscribed");
    mongoose.disconnect();
  } else {
    res.end();
  }
}
