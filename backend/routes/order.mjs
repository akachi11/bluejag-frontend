import { Router } from "express";
import Orders from "../models/Orders.mjs";

const Order = Orders
const router = Router()

// NEW PRODUCT
router.post("/new-order", async (req, res) => {
    const newOrder = new Order({
        userId: req.body.userId,
        products: req.body.products,
        total: req.body.total,
        shippingDetails: req.body.shippingDetails,
        address: req.body.address,
        status: req.body.status
    })
    try {
        const savedOrder = await newOrder.save();
        res.json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ORDER BY ID
router.get("/get-order/:oid", async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.oid })
        if (order) {
            res.json(order)
            return
        } else {
            res.json("Invalid order")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL USER ORDERS
router.get("/get-user-order/:uid", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.uid })
        if (orders) {
            res.json(orders)
            return
        } else {
            res.json("Invalid user")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE ORDER STATUS
router.put("/:oid", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.oid,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err);
    }
})

export default router;