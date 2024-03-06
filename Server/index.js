import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
import express from "express";
import cors from "cors";
import users from "./src/routes/users.route.js";
import items from "./src/routes/items.route.js";
import courses from "./src/routes/courses.route.js";

dotenv.config({
  path: "../env",
});

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/", users);
app.use("/", items);
app.use("/", courses);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port : ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log("Error : ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection failed ! ", err);
  });
