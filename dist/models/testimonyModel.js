"use strict";
///This handles the schema for testimonials
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testimony = void 0;
///Libraries -->
const mongoose_1 = require("mongoose");
///Commencing the app
///This is the schema for the testimony database
const testimonySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    profession: {
        type: String,
        required: true,
        trim: true
    },
    testimony: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });
/**
 * @notice Static create testimony
 * @param req Contains all the schema values for creating a testimony
 * @returns The created testimony
 */
testimonySchema.statics.createTestimony = async function (body) {
    //Create a new quote
    const testimony_ = await this.create({ ...body });
    return testimony_;
};
/**
 * @notice Static get all testimonies
 * @returns All testimonies
 */
testimonySchema.statics.getAllTestimony = async function () {
    const testimony = await this.find({}).sort({ createdAt: -1 });
    return testimony;
};
/**
 * @notice Static update testimony
 * @param id The id of the testimony to be updated
 * @param req The items to be updated
 * @returns The updated testimony
 */
testimonySchema.statics.updateTestimony = async function (id, req) {
    //Validation of args
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw Error("Id is invalid");
    }
    //This updates the value in the database
    const update = await this.findOneAndUpdate({ _id: id }, { ...req });
    return update;
};
/**
 * @notice Static delete testimony
 * @param id The id of the testimony to be deleted
 * @returns The deleted testimony
 */
testimonySchema.statics.deleteTestimony = async function (id) {
    //Validation of args
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw Error("Id is invalid");
    }
    //This deletes the quote from the database
    const delete_ = await this.findOneAndDelete({ _id: id });
    return delete_;
};
exports.Testimony = (0, mongoose_1.model)("Testimony", testimonySchema);
