"use strict";
///This handles the server for Dr Lindsey
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
///Libraries -->
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const pageRoute_1 = __importDefault(require("./routes/pageRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
///Commencing with the app
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT);
//console.log("mongo: ", process.env.MONGO_URL)
const MONGO_URL = process.env.MAIN_MONGO_URL;
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
///The middleware
app.use(express_1.default.json());
app.use((req, res, next) => {
    //console.log("Middleware: ", req.path, req.method, res);
    next();
});
app.use((0, cors_1.default)(corsOptions));
///The routes
app.use("/", pageRoute_1.default);
app.use("/", adminRoute_1.default);
app.use("/", userRoute_1.default);
///Connecting the app to MongoDB
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => {
    //Listen for requests
    app.listen(PORT, () => {
        console.log("Server connected to DB and listening on port", PORT);
    });
})
    .catch((error) => {
    console.log("DB Error: ", error);
});
