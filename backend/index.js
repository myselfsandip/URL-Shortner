import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import { connectDB } from "./db/connectDB.js";
dotenv.config({ path: '../.env' });

import urlRouter from "./routes/url.js";

const app = express();
const PORT = 8080;

app.use(express.json());
// Connection with the frontend
app.use(cors());


app.use("/", urlRouter);


app.listen(PORT, () => {
    connectDB();
    console.log(`App is running on PORT ${PORT}`);
})