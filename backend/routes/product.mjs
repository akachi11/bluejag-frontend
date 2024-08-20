import { Router } from "express";
import Products from "../models/Products.mjs";

const Product = Products
const router = Router()

// NEW PRODUCT
router.post("/new-product", async (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        subDesc: req.body.subDesc,
        price: req.body.price,
        color: req.body.color,
        size: req.body.size,
        units: req.body.units,
        descriptionImage: req.body.descriptionImage,
        images: req.body.images,
        limitedEdition: req.body.limitedEdition,
        description: {
            title: req.body.description.title,
            desc: req.body.description.desc
        },
        details: req.body.details,
        gender: req.body.gender,
        categories: req.body.categories,
        materials: req.body.materials
    })
    try {
        const savedProduct = await newProduct.save();
        res.json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL PRODUCTS
router.get("/get-products", async (req, res) => {
    const gender = req.query.gender
    const color = req.query.color
    const categories = req.query.categories
    const newProduct = req.query.new

    try {
        let products;

        if (newProduct) {
            products = await Product.find().sort({ createdAt: -1 });
        } else if (gender) {
            products = await Product.find({ gender: gender });
        } else if (color) {
            products = await Product.find({ color: color });
        } else if (categories) {
            products = await Product.find({ categories: categories });
        } else {
            products = await Product.find()
        }

        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router;