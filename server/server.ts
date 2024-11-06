import express from "express";
import userRoute from "./routes/user.route";
import orderRoute from "./routes/order.route";

import cors from "cors";
const app = express();

// For JSON bodies
app.use(express.json());

// For URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);

//listening

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
