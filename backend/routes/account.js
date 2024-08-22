import express from "express";
import { Account, User } from "../db.js";

import { authMiddleware } from "../authMiddleware.js";
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const acc = await Account.findOne({ user: req.userId });
  if (!acc) return res.json({ msg: "user id didnt match" });
  res.json({ balance: acc.balance });
});

router.get("/transfer", authMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { ammount, to } = req.body;
    console.log(`/transfer req.user ${req.user}`);

    const account = await Account.findOne({ user: req.userId }).session(
      session
    );
    if (!account || account.balance < ammount) {
      await session.abortTransaction();
      return res.status(403).json({ msg: "insufficient balance" });
    }
    const toAccount = await Account.findOne({ user: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "invalid account" });
    }
    await Account.updateOne(
      { user: req.userId },
      { $inc: { balance: -ammount } }
    ).session(session);

    await Account.updateOne(
      { user: to },
      { $inc: { balance: +ammount } }
    ).session(session);

    await session.commitTransaction(session);
    return res.status(200).json({ msg: "transaction successfull" });
  } catch (error) {
    session.abortTransaction();
    res.status(400).json({ msg: "something went wrong", error });
  }
});

export default router;
