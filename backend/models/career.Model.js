// models/CareerAnalysis.js
import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    background: {
        type: String,
        required: true
    },
    suggestion: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.career || mongoose.model('career', careerSchema);
