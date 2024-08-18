import exp from "express";
import userRouter from "./user.js";

const router = exp.Router();

router.get("/api/v1", userRouter);

export default router;
