"use strict";
//This handles the schema for the inquiry
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inquiry = void 0;
//Libraries -->
const mongoose_1 = require("mongoose");
//Commencing the app
//This is the schema for the inquiry database
const inquirySchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });
/**
 * @notice Static create and send inquiry
 * @param inquiry The details as required by IInquiry
 * @returns The created inquiry
 */
inquirySchema.statics.sendInquiry = async function (inquiry) {
    //Adding the inquiry to the database before sending it to the admin
    const inquiry_ = await this.create(inquiry);
    //A function should be created that sends the inquiry to the admin
    return inquiry_;
};
/**
 * @notice Static get all inquiries
 * @returns All inquiries
 */
inquirySchema.statics.getAllInquiry = async function () {
    const inquiry = await this.find({}).sort({ createdAt: -1 });
    return inquiry;
};
exports.Inquiry = (0, mongoose_1.model)("Inquiry", inquirySchema);
