import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./connectDb.js";
import { signup } from "./signup.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
    cors({
        origin: "https://chalo-ghumte-hai.vercel.app",
        credentials: true,
    })
);

app.get("/", (req, res) => {
    res.send("Chalo Ghumte Hai backend is running 🚀");
});

app.post("/signup", signup);

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