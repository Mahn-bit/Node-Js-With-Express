"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const moviesRoute_1 = __importDefault(require("./router/moviesRoute"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/v1/movies", moviesRoute_1.default);
exports.default = app;
