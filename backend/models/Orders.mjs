import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema(
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
        shippingDetails: { type: Object, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: 'Pending' }
    },
    { timestamps: true }
)

const Orders = mongoose.model('Order', OrderSchema)

export default Orders