import mongoose, { Schema } from 'mongoose';

const CartSchema = new Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        total: { type: Number, required: true },
        shipping: { type: Number, required: true }
    },
    { timestamps: true }
)

const Carts = mongoose.model('Cart', CartSchema)

export default Carts