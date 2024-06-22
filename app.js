import express from "express";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import dotenv from "dotenv";
import { connectDB } from "./utils/features.js";



dotenv.config({
    path: "./.env",
});

//setting up environment variables constants
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);
const app = express();


//setting up middlewares
app.use(express.json());

app.use("/api/v1/user", userRoute); //using routes and controllers in different files so as a middleware

app.get("/", (req, res) => {
    res.send("Welcome to the chat App");
});

server.listen(port, () => {
    console.log(`Server is running on port ${port} in ${envMode} Mode`);
});