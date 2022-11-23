import { Sequelize } from "sequelize";

const db = new Sequelize("railway", "root", "FeKyWRdr1jfcJ2JwRbQF", {
  host: "containers-us-west-137.railway.app",
  dialect: "mysql",
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
export default db;
