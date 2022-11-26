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

export default db;
