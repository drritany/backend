"use strict";
///This handles the schema for the admin
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
///Libraries -->
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
const mongoose_1 = require("mongoose");
require("dotenv/config");
//Commencing the app
const ADMIN_EMAIL = [process.env.ADMIN_EMAIL1, process.env.EMAIL2];
const ADMIN_PASSWORD = [process.env.ADMIN_PASSWORD1, process.env.ADMIN_PASSWORD2];
const create = false;
///This is the schema for the admin database
const adminSchema = new mongoose_1.Schema({
    emailAddress: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });
/**
 * @notice Static create admin method
 * @returns The created admins
 */
adminSchema.statics.createAdmin = async function () {
    ///This acts as a modifier check for the function
    if (create === false) {
        throw Error("This function can only be ran once");
    }
    let admins = [];
    for (let i = 0; i < 2; i++) {
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(ADMIN_PASSWORD[i], salt);
        if (!validator_1.default.isEmail(ADMIN_EMAIL[i])) {
            throw Error("Email not valid");
        }
        const emailAddress = ADMIN_EMAIL[i];
        const password = passwordHash;
        const admin = await this.create({
            emailAddress,
            password,
        });
        admins.push(admin);
    }
    return admins;
};
/**
 * @notice Static login method
 * @param emailAddress The email address of the admin
 * @param password The password for login in
 * @returns The logged in admin
 */
adminSchema.statics.login = async function (emailAddress, password) {
    //Validation of args
    if (!validator_1.default.isEmail(emailAddress)) {
        throw Error("Email not valid");
    }
    //Processing the login process
    const admin = await this.findOne({ emailAddress });
    if (!admin) {
        throw Error("Incorrect email");
    }
    const passwordStatus = await bcryptjs_1.default.compare(password, admin.password);
    if (!passwordStatus) {
        throw Error("Incorrect password");
    }
    return admin;
};
/**
 * @notice Static update method
 * @param emailAddress The email address of the admin
 * @param password The password for login in
 * @returns The updated admin
 */
adminSchema.statics.updateAdmin = async function (emailAddress, password) {
    //Validation of args
    if (!validator_1.default.isEmail(emailAddress)) {
        throw Error("Email not valid");
    }
    //Processing the login process
    const admin = await this.findOne({ emailAddress });
    if (!admin) {
        throw Error("Email doesn't exist");
    }
    //Updating the admin
    const newAdmin = await this.findOneAndUpdate({ emailAddress: emailAddress }, { emailAddress, password });
    return newAdmin;
};
/**
 * @notice Static delete method
 * @param id The id of the admin data
 * @returns The deleted admin
 */
adminSchema.statics.deleteAdmin = async function (id) { };
exports.Admin = (0, mongoose_1.model)("Admin", adminSchema);
