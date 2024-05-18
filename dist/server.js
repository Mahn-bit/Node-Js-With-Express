"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./index"));
const mongoose_1 = require("mongoose");
dotenv_1.default.config();
const port = Number(process.env.PORT);
const connStr = process.env.CONN_STR;
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
        await (0, mongoose_1.connect)(connStr);
        console.log(`DB connection successful.`);
        index_1.default.listen(port, () => {
            console.log(`Server is running at htpp://localhost:${port}`);
        });
    }
    catch (error) {
        console.error(`Failed to connect to mongodb ${error}`);
        process.exit(1);
    }
};
startServer();
