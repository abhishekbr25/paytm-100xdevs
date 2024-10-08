import express from "express";
import { connectdb } from "./db.js";
import cors from "cors";
const app = express();   
connectdb();
app.use(cors());
app.use(express.json());

import mainRouter from "./routes/index.js";
app.use("/api/v1", mainRouter); 
 
app.listen(2002, () => {
  console.log("connected to port 2002");
});
