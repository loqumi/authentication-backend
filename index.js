import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  await db.sync();
})();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);

store.sync();

app.listen(process.env.PORT, () => {
  console.log("Server up and running...");
});
