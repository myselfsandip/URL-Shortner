import express from "express"
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
dotenv.config();

import urlRouter from "./routes/url.js";

const app = express();
const PORT = 8080;

app.use(express.json());


app.use("/", urlRouter);


app.listen(PORT, () => {
    connectDB();
    console.log(`App is running on PORT ${PORT}`);
})