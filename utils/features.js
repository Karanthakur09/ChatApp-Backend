import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
};

//function to connect to database (mongoDb)
const connectDB = (uri) => {
    mongoose
        .connect(uri, { dbName: "ChatApp" })
        .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
        .catch((err) => {
            throw err;
        });
};

//using jsonwebtoken when user is logged In
const sendToken = (res, user, code, message) => {
    const token = jwt.sign(
        {
            _id: user._id
        },
        process.env.env.JWT_SECRET
    );

    return res.status(code).cookie("chatApp-token", token, cookieOptions).json(
        {
            success: true,
            user,
            message,
        }
    );
}

const emitEvent = (req, event, users, data) => {
    const io = req.app.get("io");
    const usersSocket = getSockets(users);
    io.to(usersSocket).emit(event, data);
  };

export {
    connectDB,
    sendToken,
    cookieOptions,
    emitEvent
};