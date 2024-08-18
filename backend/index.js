import express from "express";
import { connectdb } from "./db.js";
import mainRouter from "./routes/index.js";
import cors from "cors";
const app = express();
connectdb();
app.use(cors({}));
app.use(express.json({ limit: "16kb" }));

app.use("/api/v1", mainRouter);

app.listen(2323, () => {
  console.log("connected to port 2323");
});
