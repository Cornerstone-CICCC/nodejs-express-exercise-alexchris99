"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
// router
const productsRouter = (0, express_1.Router)();
const products = [
    { id: (0, uuid_1.v4)(), productName: 'TV', productDescription: "17inch Tv", productPrice: 15 }
];
// get the products route https:localhost:3000/
productsRouter.get("/", (req, res) => {
    res.status(200).json(products);
});
// add one product
productsRouter.post("/", (req, res) => {
    const { productName, productDescription, productPrice } = req.body;
    const newProduct = {
        id: (0, uuid_1.v4)(),
        productName,
        productDescription,
        productPrice
    };
    products.push(newProduct);
    res.status(201).json(products);
});
// search by id
productsRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const indexFound = products.findIndex(product => product.id === id);
    if (indexFound === -1) {
        res.status(404).send("Product not found");
        return;
    }
    res.status(200).json(products[indexFound]);
});
// uppdate product by id
productsRouter.put("/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const foundIndex = products.findIndex(product => product.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Product not found");
        return;
    }
    console.log(foundIndex);
    const uppdateProduct = Object.assign(Object.assign({}, products[foundIndex]), { productName: (_a = req.body.productName) !== null && _a !== void 0 ? _a : products[foundIndex].productName, productDescription: (_b = req.body.productDescription) !== null && _b !== void 0 ? _b : products[foundIndex].productDescription, productPrice: (_c = req.body.productPrice) !== null && _c !== void 0 ? _c : products[foundIndex].productPrice });
    products[foundIndex] = uppdateProduct;
    res.status(200).json(uppdateProduct);
});
// delet by id
productsRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const foundIndex = products.findIndex(product => product.id == id);
    if (foundIndex === -1) {
        res.status(404).send("Product not found");
        return;
    }
    products.splice(foundIndex, 1);
    res.status(200).send("Product deleted");
});
exports.default = productsRouter;
