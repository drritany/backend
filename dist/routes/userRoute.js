"use strict";
//This handles the various user pages for the ecommerce website
Object.defineProperty(exports, "__esModule", { value: true });
//Libraries -->
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
//Commencing the app
const router = (0, express_1.Router)();
///This requires auth for all routes below
//router.use(requireAuth);
///Create testimony route
router.post("/user/dashboard/testimonial/add/", userController_1.createTestimonyPage);
///Update testimony route
router.patch("/user/dashboard/testimonial/:id", userController_1.updateTestimonyPage);
//Cart route
router.get("/user/dashboard/order/:id", userController_1.getOrderPage);
//Order route
router.post("/user/dashboard/order", userController_1.createOrderPage);
exports.default = router;
