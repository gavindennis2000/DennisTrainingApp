import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    accountCreated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    trainingPosts: {
        type: Number,
        required: true,
        default: 0
    },
    profilePicture: {
        type: String,
        required: true, 
        default: "/uploads/default"
    }
}, {
    timestamps: true
});

const Account = mongoose.model('Account', accountSchema);

export default Account;