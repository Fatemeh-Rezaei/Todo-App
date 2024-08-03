import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/[...nextauth]";
import { sortTodos } from "@/utils/sortTodos";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Error in connecting to DB",
    });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({
      status: "failed",
      message: "You are not logged in",
    });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User doesn't exist",
    });
  }

  if (req.method === "POST") {
    const { title, status } = req.body;

    if (!title || !status) {
      return res.status(422).json({
        status: "failed",
        message: "Invalid Data",
      });
    }

    user.todos.push({ title, status });
    user.save();

    res.status(201).json({
      status: "success",
      message: "Todo Created!",
    });
  } else if (req.method === "GET") {
    const sortedData = sortTodos(user.todos);
    res.status(200).json({ status: "success", data: { todos: sortedData } });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(422).json({
        status: "failed",
        message: "Invalid Data",
      });
    }

    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );
    console.log(result);
    res.status(200).json({
      status: "success",
    });
  }
}
