import mongoose from "mongoose";

const userResponseSchema = new mongoose.Schema(
  {
    // User who answered
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    // Unique identifier for the page/challenge (not a database ID)
    pageIdentifier: {
      type: String,
      required: true,
      trim: true
    },
    
    // User's submitted answers
    shortAnswers: {
      type: [String],
      default: []
    },
    
    // Whether the answer was correct
    isCorrect: {
      type: Boolean,
      required: true
    },
    
    // Points earned
    pointsEarned: {
      type: Number,
      required: true,
      min: 0
    },
    
    // Time taken to answer (in seconds)
    timeTaken: {
      type: Number,
      default: null,
      min: 0
    },
    
    // Category
    category: {
      type: String,
      required: true,
      trim: true
    },
    
    // Level
    level: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    timestamps: true,
    collection: 'userresponses'
  }
);

// Unique index: one user can only answer each page once
userResponseSchema.index({ userId: 1, pageIdentifier: 1 }, { unique: true });
userResponseSchema.index({ userId: 1, category: 1 });
userResponseSchema.index({ userId: 1, level: 1 });
userResponseSchema.index({ userId: 1, createdAt: -1 });

// Static method to check if user has completed a page
userResponseSchema.statics.hasUserCompleted = function(userId, pageIdentifier) {
  return this.findOne({ userId, pageIdentifier });
};

// Static method to get user's all completed pages
userResponseSchema.statics.getUserCompletedPages = function(userId, category = null) {
  const filter = { userId };
  if (category) filter.category = category;
  
  return this.find(filter).sort({ createdAt: -1 });
};

// Static method to get user progress
userResponseSchema.statics.getUserProgress = function(userId, category = null) {
  const matchQuery = { userId };
  if (category) matchQuery.category = category;
  
  return this.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: "$category",
        totalCompleted: { $sum: 1 },
        correctAnswers: { $sum: { $cond: ["$isCorrect", 1, 0] } },
        totalPoints: { $sum: "$pointsEarned" },
        averageTime: { $avg: "$timeTaken" },
        accuracy: {
          $multiply: [
            { $divide: [{ $sum: { $cond: ["$isCorrect", 1, 0] } }, { $sum: 1 }] },
            100
          ]
        }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};

const UserResponse = mongoose.model("UserResponse", userResponseSchema);

export default UserResponse;