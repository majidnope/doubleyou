import mongoose from "mongoose";

const methods = {
  get: "GET",
  post: "POST",
  delete: "DELETE",
};

// Check if a connection instance already exists
const isConnected = () => {
  const { readyState } = mongoose.connection;
  return readyState === 1 || readyState === 2;
};

export default async function handler(req, res) {
  try {
    if (!isConnected()) {
      await mongoose.connect(process.env.DB_URL);
    }

    const subSchema = new mongoose.Schema(
      {
        name: String,
        email: String,
      },
      { timestamps: true }
    );

    const Subscribers = mongoose.models.subscribe || mongoose.model("subscribe", subSchema);

    if (req.method === methods.post) {
      await Subscribers.insertMany(req.body);
      res.status(200).send("Subscribed");
    } else {
      res.end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  } finally {
    res.end()
  }
}
