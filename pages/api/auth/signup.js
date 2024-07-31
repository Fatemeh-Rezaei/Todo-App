import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import { hashPassword } from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Error in connecting to DB",
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      status: "failed",
      message: "Invalid Data",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(422).json({
      status: "failed",
      message: "User exist already",
    });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({ email, password: hashedPassword });
  console.log(newUser);

  res.status(201).json({
    status: "success",
    message: "User created",
  });
}
