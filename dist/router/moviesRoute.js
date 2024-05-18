"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieControler_1 = require("../controler/movieControler");
const router = express_1.default.Router();
router.route("/").get(movieControler_1.getAllMovies).post(movieControler_1.createMovie);
router.route("/:id").get(movieControler_1.getMovie).patch(movieControler_1.updateMovie).delete(movieControler_1.deleteMovie);
exports.default = router;
