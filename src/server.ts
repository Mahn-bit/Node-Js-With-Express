import dotenv from "dotenv";
dotenv.config();

import app from "./index";
import { connect } from "mongoose";

const port: Number | undefined = Number(process.env.PORT);
const connStr: string | undefined = process.env.CONN_STR;

if (!port) {
  console.error(`Port is not defined`);
  process.exit(1);
}

if (!connStr) {
  console.error(`Connection string but defined`);
  process.exit(1);
}

const startServer = async () => {
  try {
    await connect(connStr);
    console.log(`DB connection successful.`);
    app.listen(port, () => {
      console.log(`Server is running at htpp://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Failed to connect to mongodb ${error}`);
    process.exit(1);
  }
};

startServer();
