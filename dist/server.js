"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // import express to use it in the server
const dotenv_1 = __importDefault(require("dotenv")); // import dotenv to get acces to the vars
const product_routes_1 = __importDefault(require("./routes/product.routes")); // import the routes so we can use it in the server app
dotenv_1.default.config();
const app = (0, express_1.default)(); // create a new app with the instance of express
app.use(express_1.default.json()); // tell to the app that we are going to make request with json so it will allow it
// Routes
app.use("/products", product_routes_1.default); // set the routes the user can use
const PORT = process.env.PORT || 3500; // set the port the server is going to use
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});
