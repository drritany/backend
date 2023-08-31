"use strict";
///This handles the various functions for the user page links
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderPage = exports.getOrderPage = exports.updateTestimonyPage = exports.createTestimonyPage = void 0;
const orderModel_1 = require("../models/orderModel");
const testimonyModel_1 = require("../models/testimonyModel");
const utils_1 = require("../utils/utils");
require("dotenv/config");
///Commencing the app
const SECRET = process.env.SECRET;
const spreadsheetId = process.env.SHEET_ID;
/**
 * @notice This function creates a jwt
 * @param _id The id of the user
 */
// const createToken = (_id: string) => {
//   return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
// };
/**
 * @notice Create testimony page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const createTestimonyPage = async (req, res) => {
    try {
        const testimony = await testimonyModel_1.Testimony.createTestimony(req.body);
        res.status(200).json(testimony);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.createTestimonyPage = createTestimonyPage;
/**
 * @notice Update testimony page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const updateTestimonyPage = async (req, res) => {
    try {
        const { id } = req.params;
        const testimony = await testimonyModel_1.Testimony.updateTestimony(id, req.body);
        res.status(200).json(testimony);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.updateTestimonyPage = updateTestimonyPage;
/**
 * @notice View cart page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const getOrderPage = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await orderModel_1.Order.getOrderById(id);
        res.status(200).json(cart);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.getOrderPage = getOrderPage;
/**
 * @notice Create order page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const createOrderPage = async (req, res) => {
    try {
        console.log('Body: ', req.body);
        const { customerSpec, productSpec, clientInfo } = req.body;
        //Processing order
        const order = await orderModel_1.Order.processOrder(customerSpec, productSpec);
        console.log("Order: ", order);
        //Adding the order to the spreadsheet
        const { customerSpec: customer, productSpec: product } = order;
        const c = customer;
        const p = product.cart;
        console.log('Number: ', c.phoneNumbers[0]);
        for (let i = 0; i < p.length; i++) {
            const data = [
                order._id,
                c.fullName,
                c.email,
                c.phoneNumbers[0],
                c.phoneNumbers[1],
                c.country,
                c.state,
                c.deliveryAddress,
                c.postalCode,
                p[i].name,
                p[i].quantity,
                Math.round(p[i].unitPrice * clientInfo.exchangeRate),
                Math.round(p[i].subTotalPrice * clientInfo.exchangeRate),
                (0, utils_1.getCurrentDate)(),
                (0, utils_1.getCurrentTime)(),
                clientInfo.groupTest
            ];
            console.log("Metadata: ", await (0, utils_1.updateSheet)(data));
        }
        //Sending the emails
        res.status(200).json(order);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.createOrderPage = createOrderPage;
