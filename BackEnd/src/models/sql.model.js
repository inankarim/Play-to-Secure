import mongoose from "mongoose";

const sqlquizSchema = new mongoose.Schema(
  {
    
    question: {
      type: String,
      required: true,
      trim: true
    },
    
    
    scenario: {
      type: String,
      default: null,
      trim: true
    },
    

    options: {
      type: [{
        optionText: {
          type: String,
          required: true,
          trim: true
        },
        optionLabel: {
          type: String,
          required: true,
          enum: ['A', 'B', 'C', 'D'],
          uppercase: true
        }
      }],
      required: true,
      validate: {
        validator: function(options) {
          return options.length === 4;
        },
        message: 'Exactly 4 options are required'
      }
    },
    
    // Correct answer (should match one of the option labels)
    correctAnswer: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C', 'D'],
      uppercase: true
    },
    
    // Points for this question
    points: {
      type: Number,
      required: true,
      min: 1,
      default: 10
    },
    
    // Level/difficulty of the question
    level: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    
    // Category or topic
    category: {
      type: String,
      required: true,
      trim: true
    },
    
    // Difficulty level as string
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    },
    
    // Explanation for the correct answer
    explanation: {
      type: String,
      default: null,
      trim: true
    },
    
    // Tags for better organization
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    
    // Question status
    isActive: {
      type: Boolean,
      default: true
    },
    
    // Time limit for the question (in seconds) - REMOVED DUPLICATE
    timeLimit: {
      type: Number,
      default: 30,
      min: 10
    },
    
    // Order within the level (for sequential quizzes)
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    collection: 'sqlquizzes' // Explicit collection name
  }
);

// Indexes for better query performance
sqlquizSchema.index({ level: 1, order: 1 });
sqlquizSchema.index({ category: 1, difficulty: 1 });
sqlquizSchema.index({ isActive: 1 });
sqlquizSchema.index({ category: 1, level: 1 });

// Method to validate correct answer exists in options
sqlquizSchema.methods.validateCorrectAnswer = function() {
  const optionLabels = this.options.map(option => option.optionLabel);
  return optionLabels.includes(this.correctAnswer);
};

// Static method to get questions by category and level
sqlquizSchema.statics.getQuestionsByCategory = function(category, level = null) {
  const query = { category: category, isActive: true };
  if (level) query.level = level;
  return this.find(query).sort({ level: 1, order: 1 });
};

// Static method to get random questions by category and level
sqlquizSchema.statics.getRandomQuestions = function(category, level = null, count = 10) {
  const matchQuery = { category: category, isActive: true };
  if (level) matchQuery.level = level;
  
  return this.aggregate([
    { $match: matchQuery },
    { $sample: { size: count } }
  ]);
};

// Pre-save middleware to ensure correct answer is valid
sqlquizSchema.pre('save', function(next) {
  if (!this.validateCorrectAnswer()) {
    next(new Error('Correct answer must match one of the option labels (A, B, C, D)'));
  }
  next();
});

const SqlQuiz = mongoose.model("SqlQuiz", sqlquizSchema);

export default SqlQuiz;