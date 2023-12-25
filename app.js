import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgon from "morgan";
import connectDB from "./config/db.js";
import route from "./routes/auth.js";
import product from "./routes/musicRoute.js";
import ExpressFormidable from "express-formidable";
import bodyParser from "body-parser";
import userroute from "./routes/userRoute.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(ExpressFormidable());
app.use(morgon("dev"));
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Happ Hacking",
  });
});
app.use("/api/v1/auth", route);
app.use("/api/v1/product", product);
app.use("/api/v1/user", userroute);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
