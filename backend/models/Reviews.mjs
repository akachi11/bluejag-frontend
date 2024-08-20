import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema(
    {
        rating: { type: Number, required: true },
        userId: { type: String, required: true },
        productId: {type: String, required: true},
        overallFit: {
            fit: { type: String, required: true },
            degree: { type: Number, required: true}
        },
        templateComment: { type: String, required: true },
        text: { type: String, required: true }
    },
    {timestamps: true}
)

const Reviews = mongoose.model('Review', ReviewSchema)

export default Reviews