import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

// Send list of products to frontend
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}); // get all products
    res.send(products);
  })
);

// seeding api
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createProducts = await Product.insertMany(data.products);
    res.send({ createProducts });
  })
);

// Send product details to frontend
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// create product
productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample" + Date.now(),
      image:
        "https://images.unsplash.com/photo-1610240050559-e48c408c3eec?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDQxfFM0TUtMQXNCQjc0fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" +
        1,
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res.send({ message: "New Product Created", product: createdProduct });
  })
);

// update product
productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
  const productId = req.params.id
  const product = await Product.findById(productId)
  if(product) {
    product.name = req.body.name
    product.price = req.body.price
    product.image = req.body.image
    product.category = req.body.category
    product.brand = req.body.brand
    product.countInStock = req.body.countInStock
    product.description = req.body.description
    const updatedProduct = product.save()
    res.send({message: "Update Successfull", product: updatedProduct})
  } else {
    res.status(404).send({ message: "Product Not Found" })
  }
}))




export default productRouter;
