"use strict";
//This handles the various pages for the ecommerce website
Object.defineProperty(exports, "__esModule", { value: true });
//Libraries -->
const express_1 = require("express");
const pageController_1 = require("../controllers/pageController");
//Commencing the app
const router = (0, express_1.Router)();
//Homepage
router.get("/", pageController_1.homePage);
//About route
router.get("/about", pageController_1.aboutPage);
//Contact-Us route
router.get("/contact", pageController_1.contactPage);
//Search route
router.get("/products/search", pageController_1.searchProductPage);
///Get all products route
router.get("/products/", pageController_1.getProductPage);
///Product info route
router.get("/product/info/:id", pageController_1.productInfoPage);
///Sort product route
router.get("/products/sort/:sort", pageController_1.productSortPage);
///Get all quotes route
router.get("/quotes/", pageController_1.getQuotePage);
///Get all testimony route
router.get("/testimony", pageController_1.getTestimonyPage);
///Get all contact route
router.get("/contacts", pageController_1.getContactPage);
///Get all faq route
router.get("/faqs", pageController_1.faqPage);
//Login route
//router.get("/login", loginPage);
//Signup route
//router.post("/signup", signupPage);
//Terms of services route
router.get("/terms-of-service", pageController_1.termsPage);
//Privacy Policy route
router.get("/privacy-policy", pageController_1.privacyPage);
//Create admin
// router.post("/admin-create", createAdminPage)
// //Admin Login
// router.post("/admin/login", loginAdminPage)
// //Admin change password
// router.post("/admin/change-password", updateAdminPage)
///Subscribe to newsletter route
router.post("/newsletter-subsriber/add/", pageController_1.createNewsSubscriberPage);
///Get client info route
router.get("/client-info/:ip", pageController_1.getClientInfoPage);
///Send inquiry route
router.post("/inquiry/add/", pageController_1.createInquiry);
exports.default = router;
