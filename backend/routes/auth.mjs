import { Router } from "express";
import Users from "../models/Users.mjs";
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken'

const User = Users
const router = Router()

// REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
        birthday: req.body.birthday
    })

    try {
        const usedMail = await User.findOne({ email: req.body.email });
        let usedPhone
        if (req.body.phone !== "" || req.body.phone !== undefined) {
            usedPhone = await User.findOne({ phone: req.body.phone });
        }
        if (usedMail) {
            console.log(usedMail)
            res.json("Used mail")
            return
        } else if (usedPhone) {
            res.json("Used phone")
            return
        } else {
            const savedUser = await newUser.save();
            const accessToken = jwt.sign(
                { id: savedUser.id },
                process.env.JWT_SEC,
                { expiresIn: "3d" }
            )

            const { password, ...others } = savedUser._doc

            res.status(200).json({ ...others, accessToken })
        }

    } catch (error) {
        res.status(500).json(error)
    }
})


// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.json("Wrong user")
            return
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        )
        const dbPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        if (dbPassword !== req.body.password) {
            res.json("Wrong password");
            return
        }

        const accessToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        )

        const { password, ...others } = user._doc

        res.status(200).json({ ...others, accessToken })
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router;