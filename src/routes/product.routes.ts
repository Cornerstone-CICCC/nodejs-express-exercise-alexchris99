import {Router, Response, Request} from 'express' // import expres
import {v4 as uuidv4} from 'uuid' // package to generate the unique id
import { Product } from '../types/products' // import the imnterface to used in the list

// router
const productsRouter = Router()

// array of products
const products: Product[] =[
    {id: uuidv4(), productName: 'TV', productDescription: "17inch Tv", productPrice: 15}
]

// get the products route https:localhost:3000/
productsRouter.get("/",(req: Request, res: Response)=>{// 
    res.status(200).json(products)// return the obj arr
})

// add one product
productsRouter.post("/",(req: Request, res: Response) =>{
    const {productName, productDescription, productPrice} = req.body// destructuring the info of the request body that the obj need
    const newProduct: Product = { // create a new project with the steucture od Product interface
        id: uuidv4(),// create a unique id by the package
        productName,
        productDescription,
        productPrice
    }
    products.push(newProduct) // add the product to the list
    res.status(201).json(products) // return the list with the product added
})

// search by id
productsRouter.get("/:id",(req:Request<{id:string}>, res: Response)=>{ // the request must contain an id in form of string
    const {id} = req.params // destructure the params to get the id
    const indexFound = products.findIndex(product => product.id === id) // find the index of the id
    if(indexFound === -1){ // if we have a -1 in the indexfound that means that we dont have a find
        res.status(404).send("Product not found")
        return 
    }
    res.status(200).json(products[indexFound]) // in the case we have a indexfound we will return the list with the index 
})

// uppdate product by id
productsRouter.put("/:id",(req: Request<{id:string},{},Partial<Product>>, res: Response)=>{ // the id must be a string and the body of the request will be a partial of prducts because we can uppdate one field or more not all are needed
    const {id} = req.params // get the id by destructuring the params
    const foundIndex = products.findIndex(product => product.id === id) // check if we have and index with the same id
    if(foundIndex === -1){ // if we dont have and index we retun an status of 404
        res.status(404).send("Product not found")
        return
    }
    const uppdateProduct: Product = { // create a new instance of the product that is going to be uppdated
        ...products[foundIndex], // make a copy of all the data of the product
        productName: req.body.productName ?? products[foundIndex].productName, // if the productname is not in the request.body we keep the original
        productDescription: req.body.productDescription ?? products[foundIndex].productDescription,// if the productdescrition is not in the request.body we keep the original
        productPrice: req.body.productPrice ?? products[foundIndex].productPrice // if the price is not in the request.body we keep the original
    }

    products[foundIndex] = uppdateProduct // changue the list index that we have for the new uppdated obj
    res.status(200).json(uppdateProduct)// send a responce with the uppdated product
})

// delet by id
productsRouter.delete("/:id",(req: Request<{id: string}>, res: Response)=>{ // the id must be a string
    const {id} = req.params // destructure the id by the requets params
    const foundIndex = products.findIndex(product => product.id == id)// check if we have an index with the same ide
    if(foundIndex === -1){// in case that we dont have an index
        res.status(404).send("Product not found")
        return
    }
    products.splice(foundIndex, 1) // create a new array taking apart the index we dont want
    res.status(200).send("Product deleted")// send a responce confirming the delete
})

export default productsRouter // export the routes so we can use it in the server app