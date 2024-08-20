import mongoose, { Schema } from 'mongoose';

const HeroSchema = new Schema(
    {
        media: { type: String, required: true },
        header: { type: String, required: true },
        description: { type: String, required: true }
    },
    { timestamps: true }
)

const Hero = mongoose.model('Hero', HeroSchema)

export default Hero