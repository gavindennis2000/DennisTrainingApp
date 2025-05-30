import mongoose from "mongoose";

const date = new Date();
const simpleDate = {
  year: date.getFullYear(),
  month: date.getMonth() + 1, // JS months are 0-based
  day: date.getDate()
};

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
        type: Object,
        required: true,
        default: simpleDate,
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