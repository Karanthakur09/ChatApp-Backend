import express from "express";
import { login } from "../controllers/user";
import { singleAvatar } from "../middlewares/multer.js";

const app = express.Router();


app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);


export default app;