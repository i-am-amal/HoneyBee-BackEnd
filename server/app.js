import { config } from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./Frameworks/database/dbConfig.js";
import userRouter from "./interfaces/routes/userRouter.js";
import ChatRouter from "./interfaces/routes/ChatRouter.js";
import callRouter from "./interfaces/routes/callRouter.js";
import paymentRouter from './interfaces/routes/paymentRouter.js'
import io from './Sockets/Socket.js'
config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/chat", ChatRouter);
app.use("/api/call", callRouter);
app.use("/api", userRouter);
app.use("/api/payment", paymentRouter);
let server;

connectDB().then(() => {
  server = app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
  });
  io.attach(server)
});

