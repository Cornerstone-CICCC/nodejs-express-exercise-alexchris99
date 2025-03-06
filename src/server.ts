import express from "express" // import express to use it in the server
import dotenv from "dotenv" // import dotenv to get acces to the vars
import productsRouter from "./routes/product.routes" // import the routes so we can use it in the server app
dotenv.config()

const app = express() // create a new app with the instance of express

app.use(express.json())// tell to the app that we are going to make request with json so it will allow it

// Routes
app.use("/products", productsRouter) // set the routes the user can use


const PORT = process.env.PORT || 3500 // set the port the server is going to use
app.listen(PORT, () =>{ // create the instance where the server is going to be initaliced
    console.log(`Server running in port ${PORT}`)
})