"use strict";
///This handles the various functions for the page links
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInquiry = exports.getClientInfoPage = exports.createNewsSubscriberPage = exports.getContactPage = exports.getTestimonyPage = exports.privacyPage = exports.termsPage = exports.faqPage = exports.productInfoPage = exports.productSortPage = exports.orderPage = exports.cartPage = exports.searchProductPage = exports.aboutPage = exports.contactPage = exports.getQuotePage = exports.getProductPage = exports.homePage = void 0;
const orderModel_1 = require("../models/orderModel");
const productModel_1 = require("../models/productModel");
const quoteModel_1 = require("../models/quoteModel");
const testimonyModel_1 = require("../models/testimonyModel");
const newsletterModel_1 = require("../models/newsletterModel");
const faqModel_1 = require("../models/faqModel");
const contactModel_1 = require("../models/contactModel");
const inquiryModel_1 = require("../models/inquiryModel");
const geoip_lite_1 = require("geoip-lite");
const utils_1 = require("../utils/utils");
require("dotenv/config");
///Commencing the app
const SECRET = process.env.SECRET;
const spreadsheetId = process.env.SHEET_ID;
let group = "A";
/**
 * @notice This function creates a jwt
 * @param _id The id of the user
 */
// const createToken = (_id: string) => {
//   return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
// };
/**
 * @notice Home page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const homePage = async (req, res) => {
    try {
        const view = { msg: "Homepage" };
        console.log("Naira: \u20A6");
        res.status(200).json(view);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.homePage = homePage;
/**
 * @notice Get product by order route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const getProductPage = async (req, res) => {
    try {
        const products = await productModel_1.Product.getProductByOrder();
        res.status(200).json(products);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.getProductPage = getProductPage;
/**
* @notice Get all quotes route
* @param req The params that were passed in during the client request
* @param res The response of the query by client request
*/
const getQuotePage = async (req, res) => {
    try {
        const quotes = await quoteModel_1.Quote.getAllQuote();
        res.status(200).json(quotes);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.getQuotePage = getQuotePage;
/**
 * @notice Contact page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const contactPage = (req, res) => {
    try {
        const view = { msg: "Contactpage" };
        res.status(200).json(view);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.contactPage = contactPage;
/**
 * @notice About page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const aboutPage = (req, res) => {
    try {
        const view = { msg: "Aboutpage" };
        res.status(200).json(view);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.aboutPage = aboutPage;
/**
 * @notice Search page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const searchProductPage = async (req, res) => {
    try {
        const query = req.query.query;
        //console.log("Query search: ", query)
        const products = await productModel_1.Product.getProductBySearch(query);
        res.status(200).json(products);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.searchProductPage = searchProductPage;
/**
 * @notice Cart page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const cartPage = (req, res) => {
    try {
        const view = { msg: "Cartpage" };
        res.status(200).json(view);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.cartPage = cartPage;
/**
 * @notice Order page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const orderPage = async (req, res) => {
    try {
        const { customerSpec, productSpec } = req.body;
        const order = await orderModel_1.Order.processOrder(customerSpec, productSpec);
        res.status(200).json(order);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.orderPage = orderPage;
/**
 * @notice Product page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 * @privateRemarks The sort values ranges from;
 * 0 = Newest arrivals, 1 = Price: High to Low, 2 = Price: Low to High
 */
const productSortPage = async (req, res) => {
    try {
        let products;
        const { sort: sort_ } = req.params;
        const sort = Number(sort_);
        ///Checking to see what sort values were passed in
        switch (sort) {
            case 1:
                products = await productModel_1.Product.getProductByLatest();
                break;
            case 2:
                products = await productModel_1.Product.getProductByPrice("desc");
                break;
            case 3:
                products = await productModel_1.Product.getProductByPrice("asc");
                break;
            default:
                throw Error("A wrong sort argument was passed in, Note: 0 = Newest arrivals, 1 = Price: High to Low, 2 = Price: Low to High");
        }
        res.status(200).json(products);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.productSortPage = productSortPage;
/**
 * @notice Product details page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const productInfoPage = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel_1.Product.getProductById(id);
        //const products = await Product.getProductByOrder("desc")
        res.status(200).json(product);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.productInfoPage = productInfoPage;
/**
 * @notice FAQ page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const faqPage = async (req, res) => {
    try {
        const faqs = await faqModel_1.FAQ.getAllFAQ();
        res.status(200).json(faqs);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.faqPage = faqPage;
/**
 * @notice Terms of service page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const termsPage = (req, res) => {
    try {
        const view = { msg: "Termspage" };
        res.status(200).json(view);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.termsPage = termsPage;
/**
 * @notice Privacy policy page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const privacyPage = (req, res) => {
    try {
        const view = { msg: "privacyPage" };
        res.status(200).json(view);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.privacyPage = privacyPage;
/**
 * @notice Get testimony page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const getTestimonyPage = async (req, res) => {
    try {
        const testimonials = await testimonyModel_1.Testimony.getAllTestimony();
        res.status(200).json(testimonials);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.getTestimonyPage = getTestimonyPage;
/**
 * @notice Get contact page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const getContactPage = async (req, res) => {
    try {
        const contacts = await contactModel_1.Contact.getAllContact();
        res.status(200).json(contacts);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.getContactPage = getContactPage;
/**
 * @notice Subscribe to news letter page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const createNewsSubscriberPage = async (req, res) => {
    try {
        console.log("Body: ", req.body);
        //const { subscriber } = req.body
        //Add the subscriber to the database
        const sub = await newsletterModel_1.News.createSubscriber(req.body);
        console.log("sub: ", req.body);
        ///Send email to subscriber
        const status = await (0, utils_1.sendSubnewsletterEmail)(sub.subscriber);
        console.log("Email Status: ", status);
        console.log("New Subscriber: ", sub);
        res.status(200).json(sub);
    }
    catch (error) {
        console.log("error");
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.createNewsSubscriberPage = createNewsSubscriberPage;
/**
 * @notice Client details page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
const getClientInfoPage = async (req, res) => {
    try {
        let countryCode;
        const { ip } = req.params;
        const location = (0, geoip_lite_1.lookup)(ip);
        if (location) {
            countryCode = location.country;
        }
        else {
            countryCode = "US";
        }
        const clientCountry = utils_1.countryList.filter(c => c["countryCode"] === countryCode);
        const client = clientCountry[0];
        const usdRate = await (0, utils_1.getUSDRate)(clientCountry[0].currency || "USD");
        ///Getting the client info
        const clientInfo = {
            country: client.country,
            countryCode: client.countryCode,
            currency: client.currency,
            currencySymbol: client.currencySymbol,
            exchangeRate: usdRate,
            groupTest: group
        };
        ///Updating the group value
        if (group === "A") {
            group = "B";
        }
        else if (group === "B") {
            group = "A";
        }
        console.log("group updated");
        res.status(200).json(clientInfo);
    }
    catch (error) {
        console.log("error");
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.getClientInfoPage = getClientInfoPage;
//Make inquiry Page
const createInquiry = async (req, res) => {
    try {
        //console.log('Inquiry: ', req.body)
        //Save inquiry to database
        const inquiry = await inquiryModel_1.Inquiry.sendInquiry(req.body);
        //Send email to user who made the inquiry
        console.log('Inquiry: ', inquiry);
        res.status(200).json(inquiry);
    }
    catch (error) {
        const error_ = { msg: `${error}` };
        res.status(400).json(error_);
    }
};
exports.createInquiry = createInquiry;
