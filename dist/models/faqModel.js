"use strict";
///This handles the schema for FAQs
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQ = void 0;
///Libraries -->
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
require("dotenv/config");
///Commencing the app
///This is the schema for the FAQ database
const faqSchema = new mongoose_2.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });
/**
 * @notice Static create FAQ
 * @param question The question
 * @param answer The answer to the question
 * @returns The created FAQ
 */
faqSchema.statics.createFAQ = async function (question, answer) {
    //Create a new FAQ
    const faq = await this.create({
        question, answer
    });
    return faq;
};
/**
 * @notice Static get all FAQ
 * @returns All FAQs
 */
faqSchema.statics.getAllFAQ = async function () {
    const faq = await this.find({}).sort({ createdAt: -1 });
    return faq;
};
/**
 * @notice Static update FAQ
 * @param id The id of the FAQ to be updated
 * @param question The new question
 * @param answer The new answer
 * @returns All FAQs
 */
faqSchema.statics.updateFAQ = async function (id, body) {
    //Validation of args
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw Error("Id is invalid");
    }
    //This updates the value in the database
    const update = await this.findOneAndUpdate({ _id: id }, { ...body });
    return update;
};
/**
 * @notice Static delete FAQ
 * @param id The id of the FAQ to be deleted
 * @returns The deleted FAQ
 */
faqSchema.statics.deleteFAQ = async function (id) {
    //Validation of args
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw Error("Id is invalid");
    }
    //This deletes the ingredient from the database
    const delete_ = await this.findOneAndDelete({ _id: id });
    return delete_;
};
exports.FAQ = (0, mongoose_2.model)("FAQ", faqSchema);
