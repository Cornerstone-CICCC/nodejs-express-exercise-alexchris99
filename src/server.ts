import express from "express"
import dotenv from "dotenv"
import productsRouter from "./routes/product.routes"
dotenv.config()

const app = express()

app.use(express.json())

// Routes
app.use("/products", productsRouter)

const PORT = process.env.PORT || 3500
app.listen(PORT, () =>{
    console.log(`Server running in port ${PORT}`)
})