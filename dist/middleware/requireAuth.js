"use strict";
///This acts as a middleware for only showing some specified routes to authenticated users
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
///Libraries -->
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const adminModel_1 = require("../models/adminModel");
///Commencing the app
const SECRET = process.env.SECRET;
///This funtion handles the requiring of authentication
const requireAuth = async (req, res, next) => {
    //Verify authentication
    const { authorization } = req.headers;
    console.log("Authorization: ", authorization);
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }
    const token = authorization.split(" ")[1];
    try {
        const { _id } = jsonwebtoken_1.default.verify(token, SECRET);
        req.user = await adminModel_1.Admin.find({ _id }).select("_id");
        console.log("Req User: ", req.user);
        next();
    }
    catch (error) {
        console.log("Require Auth error: ", error);
        res.status(401).json({ error: "Request is not authorized" });
    }
};
exports.requireAuth = requireAuth;
