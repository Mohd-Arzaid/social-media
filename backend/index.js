import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user/user.route.js";
import messageRoute from "./routes/messages/message.route.js";


import profileRoute from "./routes/user/profile.route.js";
import fileUpload from 'express-fileupload';
import { cloudinaryConnect } from "./config/cloudinary.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));


app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

cloudinaryConnect();


// Testing the server
app.get("/", (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Server is up and running ...",
    });
  });


//Api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/messages", messageRoute);

// Listening to the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
