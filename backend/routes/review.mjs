import { Router } from "express";
import Reviews from "../models/Reviews.mjs";

const Review = Reviews
const router = Router()

// NEW REVIEW
router.post("/new-review", async (req, res) => {
    const newReview = new Review({
        rating: req.body.rating,
        userId: req.body.userId,
        productId: req.body.productId,
        overallFit: {
            fit: req.body.overallFit.fit,
            degree: req.body.overallFit.degree
        },
        templateComment: req.body.templateComment,
        text: req.body.text
    })
    try {
        const savedReview = await newReview.save();
        res.json(savedReview)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL REVIEWS
router.get("/get-reviews", async (req, res) => {
    const qNew = req.query.new
    try {
        let reviews;

        if(qNew){
            reviews = await Review.find().sort({ createdAt: -1 }).limit(5); 
        } else reviews = await Review.find()

        res.status(200).json(reviews)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET PRODUCT REVIEWS
router.get("/get-reviews/:pid", async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.pid })
        if (reviews) {
            res.json(reviews)
            return
        } else {
            res.json("No reviews")
        }
    } catch (error) {
        res.json(error)
    }
})

export default router;