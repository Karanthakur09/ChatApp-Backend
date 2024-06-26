import express from "express";
import { getMyProfile, login } from "../controllers/user";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated, logout } from "../middlewares/auth.js";

const app = express.Router();



app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

app.use(isAuthenticated);

app.get("/me", getMyProfile);
app.get("/logout", logout);
//after this only authenticated user must access further
app.use(errorMiddleware);//at the end

export default app;