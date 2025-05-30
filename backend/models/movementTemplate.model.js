import mongoose from "mongoose";

const movementTemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const MovementTemplate = mongoose.model('MovementTemplate', movementTemplateSchema);

export default MovementTemplate;