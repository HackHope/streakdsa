import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: String,
    },
    { timestamps: true }
);

export default mongoose.models.Topic ||
    mongoose.model("Topic", TopicSchema);
