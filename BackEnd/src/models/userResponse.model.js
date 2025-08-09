import mongoose from "mongoose";

const userResponseSchema = new mongoose.Schema(
  {
    // User who answered the question
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    // Question that was answered
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SqlQuiz',
      required: true
    },
    
    // User's selected answer
    selectedAnswer: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C', 'D'],
      uppercase: true
    },
    
    // Whether the answer was correct
    isCorrect: {
      type: Boolean,
      required: true
    },
    
    // Points earned for this answer
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
    
    // Category of the question (for easier querying)
    category: {
      type: String,
      required: true,
      trim: true
    },
    
    // Level of the question (for easier querying)
    level: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    collection: 'userresponses' // Explicit collection name
  }
);

// Indexes for better query performance
userResponseSchema.index({ userId: 1, questionId: 1 }, { unique: true }); // Prevent duplicate answers
userResponseSchema.index({ userId: 1, category: 1 });
userResponseSchema.index({ userId: 1, level: 1 });
userResponseSchema.index({ userId: 1, createdAt: -1 });

// Static method to get user progress by category
userResponseSchema.statics.getUserProgress = function(userId, category = null) {
  const matchQuery = { userId: userId };
  if (category) matchQuery.category = category;
  
  return this.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: {
          category: "$category",
          level: "$level"
        },
        totalQuestions: { $sum: 1 },
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
    {
      $group: {
        _id: "$_id.category",
        levels: {
          $push: {
            level: "$_id.level",
            totalQuestions: "$totalQuestions",
            correctAnswers: "$correctAnswers",
            totalPoints: "$totalPoints",
            averageTime: "$averageTime",
            accuracy: "$accuracy"
          }
        },
        overallQuestions: { $sum: "$totalQuestions" },
        overallCorrect: { $sum: "$correctAnswers" },
        overallPoints: { $sum: "$totalPoints" },
        overallAccuracy: {
          $multiply: [
            { $divide: ["$overallCorrect", "$overallQuestions"] },
            100
          ]
        }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};

// Static method to check if user has already answered a question
userResponseSchema.statics.hasUserAnswered = function(userId, questionId) {
  return this.findOne({ userId: userId, questionId: questionId });
};

// Static method to get user's recent activity
userResponseSchema.statics.getUserRecentActivity = function(userId, limit = 10) {
  return this.find({ userId: userId })
    .populate('questionId', 'question category level difficulty points')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Instance method to calculate accuracy percentage
userResponseSchema.methods.getAccuracyPercentage = function() {
  return this.isCorrect ? 100 : 0;
};

const UserResponse = mongoose.model("UserResponse", userResponseSchema);

export default UserResponse;