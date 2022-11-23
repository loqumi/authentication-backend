import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
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
    secret: "kdjskllkmckzlncjk23u8921uijcxlcjkjc89sdjsadjlj389123892nuc8ah9ry3",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

// app.use(
//   cors({
//     credentials: true,
//     origin: "https://loqumi-auth-app.herokuapp.com",
//   })
// );

app.use(cors());

app.use(express.json());

app.use(UserRoute);
app.use(AuthRoute);

store.sync();

app.listen(process.env.PORT, () => {
  console.log("Server up and running...");
});
