import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        subDesc: { type: String, required: true },
        price: { type: Number, require: true },
        color: { type: String },
        size: { type: String },
        units: { type: Number, required: true },
        descriptionImage: { type: String },
        images: [{ type: String, required: true }],
        limitedEdition: { type: Boolean, default: false },
        description: {
            title: { type: String },
            desc: { type: String }
        },
        details: [{ type: String }],
        gender: { type: String },
        categories: [{ type: String }],
        materials: [{ type: String }]
    }
)

const Products = mongoose.model('Product', ProductSchema)

export default Products