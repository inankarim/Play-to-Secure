import mongoose from "mongoose";

const quizResponseSchema = new mongoose.Schema(
  {
    // User who answered
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    
    // Question ID reference
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SqlQuiz',
      required: true,
      index: true
    },
    
    // User's selected answer (A, B, C, or D)
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
    
    // Points earned
    pointsEarned: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    
    // Time taken to answer (in seconds)
    timeTaken: {
      type: Number,
      default: null,
      min: 0
    },
    
    // Category from the question
    category: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    
    // Level from the question
    level: {
      type: Number,
      required: true,
      min: 1
    },
    
    // Difficulty from the question
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    },
    
    // Order from the question
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    collection: 'quizresponses'
  }
);

// Compound indexes for better query performance
quizResponseSchema.index({ userId: 1, questionId: 1 }, { unique: true }); // One answer per question per user
quizResponseSchema.index({ userId: 1, category: 1, level: 1 });
quizResponseSchema.index({ userId: 1, category: 1, difficulty: 1, level: 1 });
quizResponseSchema.index({ userId: 1, createdAt: -1 });
quizResponseSchema.index({ category: 1, difficulty: 1, level: 1, order: 1 });

// Static method to check if user has answered a question
quizResponseSchema.statics.hasUserAnswered = function(userId, questionId) {
  return this.findOne({ userId, questionId });
};

// Static method to get user's answers for a specific segment
quizResponseSchema.statics.getSegmentProgress = function(userId, category, difficulty, level) {
  return this.find({ 
    userId, 
    category, 
    difficulty, 
    level 
  }).sort({ order: 1 });
};

// Static method to get user's overall progress
quizResponseSchema.statics.getUserProgress = function(userId, category = null) {
  const matchQuery = { userId };
  if (category) matchQuery.category = category;
  
  return this.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: {
          category: "$category",
          difficulty: "$difficulty",
          level: "$level"
        },
        totalAnswered: { $sum: 1 },
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
    { $sort: { "_id.category": 1, "_id.difficulty": 1, "_id.level": 1 } }
  ]);
};

// Static method to count completed questions in a segment
quizResponseSchema.statics.countSegmentCompleted = function(userId, category, difficulty, level) {
  return this.countDocuments({ userId, category, difficulty, level });
};

const QuizResponse = mongoose.model("QuizResponse", quizResponseSchema);

export default QuizResponse;