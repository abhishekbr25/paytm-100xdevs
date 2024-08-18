import exp from "express";
import { getUser } from "../controller/user.js";
const router = exp.Router();

router.get("/user", getUser);

export default router;
