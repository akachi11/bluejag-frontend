import mongoose, { Schema } from 'mongoose';
import { generateId } from './GenerateId.mjs';

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        birthday: { type: Number, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
)

const Users = mongoose.model('User', UserSchema)

export default Users