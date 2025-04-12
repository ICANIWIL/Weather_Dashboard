const mongoose = require("mongoose")

const searchSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

// Create index for aggregation queries
searchSchema.index({ city: 1 })

module.exports = mongoose.model("Search", searchSchema)
