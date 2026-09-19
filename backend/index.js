import express from "express";
import dotenv from "dotenv";
import connectDb from "./connectDb.js";
import { signup } from "./signup.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.post("/api/signup", signup);

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`server is running at ${port}`);
        });
    })
    .catch((error) => {
        console.error("Unable to start server:", error);
        process.exit(1);
    });