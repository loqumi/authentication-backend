import { Sequelize } from "sequelize";

const db = new Sequelize(
  "freedb_auth_db",
  "freedb_auth_db_user",
  "p899H4K9Fa&XWYT",
  {
    host: "sql.freedb.tech",
    dialect: "mysql",
  }
);

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
export default db;
