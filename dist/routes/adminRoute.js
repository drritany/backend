"use strict";
///This handles the various routes for the admin pages
Object.defineProperty(exports, "__esModule", { value: true });
///Libraries -->
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
//import { requireAuth } from "../middleware/requireAuth";
///Commencing the code
const router = (0, express_1.Router)();
///This requires auth for all routes below
//router.use(requireAuth);
///Create a new product
router.post("/admin/dashboard/product/add/", adminController_1.createProductPage);
///Update product route
router.patch("/admin/dashboard/product/update/:id", adminController_1.updateProductPage);
///Delete product route
router.delete("/admin/dashboard/product/delete/:id", adminController_1.deleteProductPage);
///Create faq route
router.post("/admin/dashboard/faq/add/", adminController_1.createFAQPage);
///Update faq route
router.patch("/admin/dashboard/faq/update/:id", adminController_1.updateFAQPage);
///Delete faq route
router.delete("/admin/dashboard/faq/delete/:id", adminController_1.deleteFAQPage);
///Create contact route
router.post("/admin/dashboard/contact/add/", adminController_1.createContactPage);
///Update contact route
router.patch("/admin/dashboard/contact/update/:id", adminController_1.updateContactPage);
///Delete contact route
router.delete("/admin/dashboard/contact/delete/:id", adminController_1.deleteContactPage);
///Get all newsletter subscribers route
router.get("/admin/dashboard/newsletter-subscribers/", adminController_1.getNewsSubscriberPage);
///Delete newsletter subscribers route
router.delete("/admin/dashboard/newsletter-subscribers/:id", adminController_1.deleteNewsSubscriberPage);
///Get order by id route
router.get("/admin/dashboard/orders/:id", adminController_1.getOrderByIdPage);
///Get all orders by route
router.get("/admin/dashboard/orders/", adminController_1.getAllOrderPage);
///Create quote route
router.post("/admin/dashboard/quote/", adminController_1.createQuotePage);
///Update quote route
router.patch("/admin/dashboard/quote/:id", adminController_1.updateQuotePage);
///Delete quote route
router.delete("/admin/dashboard/quote/:id", adminController_1.deleteQuotePage);
///Delete testimonial route
router.delete("/admin/dashboard/testimony/:id", adminController_1.deleteTestimonyPage);
exports.default = router;
