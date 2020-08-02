import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    seller: {
        type: Boolean,
        default: false,
    },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        country: String,
        zip: Number
    },
    created: {
        type: Date,
        default: Date.now,
    }
})

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();

    } catch (err) {
        return next(err);
    }
})