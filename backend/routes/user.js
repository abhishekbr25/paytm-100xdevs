import express from "express";
import { User } from "../db.js";
import z from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../authMiddleware.js";
const router = express.Router();

const signupshcema = z.object({
  username: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

router.post("/signup", async (req, res) => {
  const object = signupshcema.safeParse(req.body);

  if (!object.success) return res.json({ msg: "zod error" });

  const user = await User.findOne({ username: req.body.username });
  console.log("existinguser: " + user);

  if (user) return res.json({ msg: "user already exits" });

  const newuser = await User.create(req.body);
  const token = jwt.sign({ userId: newuser._id }, JWT_SECRET);
  //   req.headers(authorization= "Bearer ");
  console.log(res.headersSent);
  return res.json({
    message: "User created successfully",
    token: token,
  });
});

const updateSchema = z.object({
  password: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success, data } = updateSchema.safeParse(req.body);
  // console.log(data + success); 
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  } 
  const user = await User.findOneAndUpdate({ _id: req.userId }, req.body, {
    new: true,
  }); 
  if (!user) return res.status(403).json({}); 
  res.json({ msg: "success uptdate", user });
});

//search user by some letters of their name $regex
router.get("/user", async function (req, res) {
  const filter = req.query?.filter || "";
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  if (!users) return res.json({ msg: "user not found" });

  const { password, ...userDetails } = users;
  console.log("check if this works");

  console.log(`/user: userdetails: ${userDetails}`);

  res.status(200).json({ ...userDetails });
});
export default router;
