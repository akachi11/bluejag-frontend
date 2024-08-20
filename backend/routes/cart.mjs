import { Router } from "express";
import Carts from "../models/Carts.mjs";

const Cart = Carts
const router = Router()

//CREATE
router.post("/", async (req, res) => {
    const newCart = new Cart({
        userId: req.body.userId,
        products: req.body.products,
        total: req.body.total,
        shipping: req.body.shipping
    })
    try {
        const existingCart = await Cart.findOne({ userId: req.body.userId })
        if (!existingCart) {
            try {
                const savedCart = await newCart.save();
                res.json(savedCart)
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            try {
                const updatedCart = await Cart.findOneAndUpdate(
                    { userId: req.body.userId },
                    {
                        $set: req.body
                    },
                    { new: true }
                );
                res.status(200).json(updatedCart)
            } catch (err) {
                res.status(500).json(err);
            }
        }
    } catch (error) {

    }
})

//UPDATE
router.put("/:uid", async (req, res) => {
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { userId: req.params.uid },
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err);
    }
})

//DELETE 
router.delete("/:uid", async (req, res) => {
    try {
        await Cart.findOneAndDelete({ userId: req.params.uid })
        res.status(200).json("Cart deleted")
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET USER CART
router.get("/find/:uid", async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.uid })
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET ALL 
router.get("/", async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router;