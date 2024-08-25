import express from "express";
import { Account, User } from "../db.js";

import { authMiddleware } from "../authMiddleware.js";
import mongoose from "mongoose";
const router = express.Router();

router.post("/new", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const acc = await Account.create({
    user: userId,
    account: 1001,
  });
  if (!acc) return res.json({ err: "acc not created" });
  return res.status(200).json({ msg: "acc created", acc });
});

router.get("/balance", authMiddleware, async (req, res) => {
  const acc = await Account.findOne({ user: req.userId });
  console.log(acc);

  if (!acc) return res.json({ msg: "user id didnt match" });
  return res.json({ balance: acc.account, acc });
});


//Transaction in Mongodb
//notes
// session  = m.startsession
// session.startTransaction()
//take amount and Userid
//*IMP:- update *within session: fidupd(id, update parameters, {session})
//update their balance within update params
// if error then session.abortTransaction()
// after successfull transaction: session.commitTransaction(session)
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    const account = await Account.findOne({ user: req.userId }).session(
      session
    );
    if (!account || account.account < amount) {
      await session.abortTransaction();
      return res.status(403).json({ msg: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ user: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Invalid account" });
    } 

    const yourBalance = await Account.findOneAndUpdate(
      { user: req.userId },
      { $inc: { account: -amount } },
      { new: true, session }
    );

    await Account.findOneAndUpdate(
      { user: to },
      { $inc: { account: +amount } },
      { new: true, session }
    );

    await session.commitTransaction(session);

    return res.status(200).json({ msg: "transaction successfull" , yourBalance});
  } catch (error) {
    session.abortTransaction();
    res.status(400).json({ msg: "something went wrong", error });
  }
});

export default router;
