"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // import expres
const uuid_1 = require("uuid"); // package to generate the unique id
// router
const productsRouter = (0, express_1.Router)();
// array of products
const products = [
    { id: (0, uuid_1.v4)(), productName: 'TV', productDescription: "17inch Tv", productPrice: 15 }
];
// get the products route https:localhost:3000/
productsRouter.get("/", (req, res) => {
    res.status(200).json(products); // return the obj arr
});
// add one product
productsRouter.post("/", (req, res) => {
    const { productName, productDescription, productPrice } = req.body; // destructuring the info of the request body that the obj need
    const newProduct = {
        id: (0, uuid_1.v4)(), // create a unique id by the package
        productName,
        productDescription,
        productPrice
    };
    products.push(newProduct); // add the product to the list
    res.status(201).json(products); // return the list with the product added
});
// search by id
productsRouter.get("/:id", (req, res) => {
    const { id } = req.params; // destructure the params to get the id
    const indexFound = products.findIndex(product => product.id === id); // find the index of the id
    if (indexFound === -1) { // if we have a -1 in the indexfound that means that we dont have a find
        res.status(404).send("Product not found");
        return;
    }
    res.status(200).json(products[indexFound]); // in the case we have a indexfound we will return the list with the index 
});
// uppdate product by id
productsRouter.put("/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params; // get the id by destructuring the params
    const foundIndex = products.findIndex(product => product.id === id); // check if we have and index with the same id
    if (foundIndex === -1) { // if we dont have and index we retun an status of 404
        res.status(404).send("Product not found");
        return;
    }
    const uppdateProduct = Object.assign(Object.assign({}, products[foundIndex]), { productName: (_a = req.body.productName) !== null && _a !== void 0 ? _a : products[foundIndex].productName, productDescription: (_b = req.body.productDescription) !== null && _b !== void 0 ? _b : products[foundIndex].productDescription, productPrice: (_c = req.body.productPrice) !== null && _c !== void 0 ? _c : products[foundIndex].productPrice // if the price is not in the request.body we keep the original
     });
    products[foundIndex] = uppdateProduct; // changue the list index that we have for the new uppdated obj
    res.status(200).json(uppdateProduct); // send a responce with the uppdated product
});
// delet by id
productsRouter.delete("/:id", (req, res) => {
    const { id } = req.params; // destructure the id by the requets params
    const foundIndex = products.findIndex(product => product.id == id); // check if we have an index with the same ide
    if (foundIndex === -1) { // in case that we dont have an index
        res.status(404).send("Product not found");
        return;
    }
    products.splice(foundIndex, 1); // create a new array taking apart the index we dont want
    res.status(200).send("Product deleted"); // send a responce confirming the delete
});
exports.default = productsRouter; // export the routes so we can use it in the server app
