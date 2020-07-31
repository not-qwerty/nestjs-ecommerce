import * as mongoose from'mongoose';

export const ProductSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    title: String,
    description: String,
    image: String,
    price: String,
    created: {
        type: DataTransferItem,
        default: Date.now
    }
})