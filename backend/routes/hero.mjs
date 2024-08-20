import { Router } from "express";
import Hero from "../models/Hero.mjs";

const router = Router()

//CREATE
router.post("/", async (req, res) => {
    const newHero = new Hero({
        media: req.body.media,
        header: req.body.header,
        description: req.body.description
    })
    try {
        const savedHero = await newHero.save();
        res.json(savedHero)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE
router.put("/:hid", async (req, res) => {
    try {
        const updatedHero = await Hero.findByIdAndUpdate(
            req.params.hid,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedHero)
    } catch (err) {
        res.status(500).json(err);
    }
})

//DELETE 
router.delete("/:hid", async (req, res) => {
    try {
        await Hero.findByIdAndDelete(req.params.hid)
        res.status(200).json("Hero deleted")
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET ALL 
router.get("/", async (req, res) => {
    try {
        const heros = await Hero.find()
        res.status(200).json(heros);
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router;