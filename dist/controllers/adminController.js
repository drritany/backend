"use strict";
///This handles the various functions for the admin page links
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTestimonyPage = exports.deleteQuotePage = exports.updateQuotePage = exports.createQuotePage = exports.getAllOrderPage = exports.getOrderByIdPage = exports.deleteNewsSubscriberPage = exports.getNewsSubscriberPage = exports.deleteContactPage = exports.updateContactPage = exports.createContactPage = exports.deleteFAQPage = exports.updateFAQPage = exports.createFAQPage = exports.deleteProductPage = exports.updateProductPage = exports.createProductPage = void 0;
const orderModel_1 = require("../models/orderModel");
const productModel_1 = require("../models/productModel");
const quoteModel_1 = require("../models/quoteModel");
const testimonyModel_1 = require("../models/testimonyModel");
const newsletterModel_1 = require("../models/newsletterModel");
const faqModel_1 = require("../models/faqModel");
const contactModel_1 = require("../models/contactModel");
require("dotenv/config");
///Commencing the app
const SECRET = process.env.SECRET;
/**
 * @notice This function creates a jwt
 * @param _id The id of the user
 */
// const createToken = (_id: string) => {
//   return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
// };
/**
 * @notice Create product page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const createProductPage = async (req, res) => {
    try {
        const { category, subCategory, name, images, videos, price, orders, description, specification } = req.body;
        const product = await productModel_1.Product.createProduct(category, subCategory, name, images, videos, price, orders, description, specification);
        res.status(200).json(product);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.createProductPage = createProductPage;
/**
 * @notice Update product page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const updateProductPage = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel_1.Product.updateProduct(id, req.body);
        res.status(200).json(product);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.updateProductPage = updateProductPage;
/**
 * @notice Delete product page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const deleteProductPage = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel_1.Product.deleteProduct(id);
        res.status(200).json(product);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.deleteProductPage = deleteProductPage;
/**
 * @notice Create FAQ page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const createFAQPage = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const faq = await faqModel_1.FAQ.createFAQ(question, answer);
        console.log("Body: ", faq);
        res.status(200).json(faq);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.createFAQPage = createFAQPage;
/**
 * @notice Update faq page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const updateFAQPage = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await faqModel_1.FAQ.updateFAQ(id, req.body);
        res.status(200).json(faq);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.updateFAQPage = updateFAQPage;
/**
 * @notice Delete faq page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const deleteFAQPage = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await faqModel_1.FAQ.deleteFAQ(id);
        res.status(200).json(faq);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.deleteFAQPage = deleteFAQPage;
/**
 * @notice Create contact page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const createContactPage = async (req, res) => {
    try {
        const faq = await contactModel_1.Contact.createContact(req.body);
        console.log("Body: ", faq);
        res.status(200).json(faq);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.createContactPage = createContactPage;
/**
 * @notice Update contact page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const updateContactPage = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await contactModel_1.Contact.updateContact(id, req.body);
        res.status(200).json(faq);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.updateContactPage = updateContactPage;
/**
* @notice Delete contact page route
* @param req The params that were passed in during the client request
* @param res The response of the query by client request
*/
const deleteContactPage = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await contactModel_1.Contact.deleteContact(id);
        res.status(200).json(faq);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.deleteContactPage = deleteContactPage;
/**
 * @notice Get newsletter subscribers page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const getNewsSubscriberPage = async (req, res) => {
    try {
        const subsribers = await newsletterModel_1.News.getAllSubscriber();
        res.status(200).json(subsribers);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.getNewsSubscriberPage = getNewsSubscriberPage;
/**
 * @notice Delete newsletter subscribers page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const deleteNewsSubscriberPage = async (req, res) => {
    try {
        const { id } = req.params;
        const susbcriber = await newsletterModel_1.News.deleteSubscriber(id);
        res.status(200).json(susbcriber);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.deleteNewsSubscriberPage = deleteNewsSubscriberPage;
/**
 * @notice Get order by id page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const getOrderByIdPage = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel_1.Order.getOrderById(id);
        res.status(200).json(order);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.getOrderByIdPage = getOrderByIdPage;
/**
 * @notice Get all orders page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const getAllOrderPage = async (req, res) => {
    try {
        const orders = await orderModel_1.Order.getOrders();
        res.status(200).json(orders);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.getAllOrderPage = getAllOrderPage;
/**
 * @notice Create quote page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const createQuotePage = async (req, res) => {
    try {
        const { quote: quote_ } = req.body;
        const quote = await quoteModel_1.Quote.createQuote(quote_);
        res.status(200).json(quote);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.createQuotePage = createQuotePage;
/**
 * @notice Update quote page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const updateQuotePage = async (req, res) => {
    try {
        const { id } = req.params;
        const quote = await quoteModel_1.Quote.updateQuote(id, req.body);
        res.status(200).json(quote);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.updateQuotePage = updateQuotePage;
/**
 * @notice Delete quote page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const deleteQuotePage = async (req, res) => {
    try {
        const { id } = req.params;
        const quote = await quoteModel_1.Quote.deleteQuote(id);
        res.status(200).json(quote);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.deleteQuotePage = deleteQuotePage;
/**
 * @notice Delete testimony page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const deleteTestimonyPage = async (req, res) => {
    try {
        const { id } = req.params;
        const testimony = await testimonyModel_1.Testimony.deleteTestimony(id);
        res.status(200).json(testimony);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.deleteTestimonyPage = deleteTestimonyPage;
