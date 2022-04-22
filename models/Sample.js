const mongoose = require("mongoose");
const { Schema } = mongoose;

const SampleSchema = new Schema({
    siteId: { type: Number },
    namePool: { type: String, required: true },
    absoluteVolumenflow: { type: String, required: true },
    totalizer1: { type: String, required: true },
    level: { type: String, required: true },
    createdAt: { type: Date }
}, {
    timestamps: false,
    versionKey: false
});

module.exports = mongoose.model('Sample', SampleSchema);