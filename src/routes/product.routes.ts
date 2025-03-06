import {Router, Response, Request} from 'express'
import {v4 as uuidv4} from 'uuid'
import { Product } from '../types/products'

// router
const productsRouter = Router()

const products: Product[] =[
    {id: uuidv4(), productName: 'TV', productDescription: "17inch Tv", productPrice: 15}
]

// get the products route https:localhost:3000/
productsRouter.get("/",(req: Request<{},{},Omit<Product,'id'>>, res: Response)=>{
    res.status(200).json(products)
})

// add one product
productsRouter.post("/",(req: Request, res: Response) =>{
    const {productName, productDescription, productPrice} = req.body
    const newProduct: Product = {
        id: uuidv4(),
        productName,
        productDescription,
        productPrice
    }
    products.push(newProduct)
    res.status(201).json(products)
})

// search by id
productsRouter.get("/:id",(req:Request<{id:string}>, res: Response)=>{
    const {id} = req.params
    const indexFound = products.findIndex(product => product.id === id)
    if(indexFound === -1){
        res.status(404).send("Product not found")
        return 
    }
    res.status(200).json(products[indexFound])
})

// uppdate product by id
productsRouter.put("/:id",(req: Request<{id:string},{},Partial<Product>>, res: Response)=>{
    const {id} = req.params
    const foundIndex = products.findIndex(product => product.id === id)
    if(foundIndex === -1){
        res.status(404).send("Product not found")
        return
    }
    console.log(foundIndex)
    const uppdateProduct: Product = {
        ...products[foundIndex],
        productName: req.body.productName ?? products[foundIndex].productName,
        productDescription: req.body.productDescription ?? products[foundIndex].productDescription,
        productPrice: req.body.productPrice ?? products[foundIndex].productPrice
    }

    products[foundIndex] = uppdateProduct
    res.status(200).json(uppdateProduct)
})

// delet by id
productsRouter.delete("/:id",(req: Request<{id: string}>, res: Response)=>{
    const {id} = req.params
    const foundIndex = products.findIndex(product => product.id == id)
    if(foundIndex === -1){
        res.status(404).send("Product not found")
        return
    }
    products.splice(foundIndex, 1)
    res.status(200).send("Product deleted")
})

export default productsRouter