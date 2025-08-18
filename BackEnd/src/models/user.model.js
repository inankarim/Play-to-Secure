import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
      // University information
    universityName: {
      type: String,
      default: "",
    },
    // Experience level
    experienceLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    },
    // Points system
    totalPoints: {
      type: Number,
      default: 0,
      min: 0
    },
    // Badge system
    badges: [{
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      },
      level: {
        type: String,
        required: true
      },
      earnedAt: {
        type: Date,
        default: Date.now
      }
    }],
    // Completed levels tracking
    completedLevels: [{
      type: String,
      enum: ['Easy', 'Medium', 'Hard']
    }]
  },
  { timestamps: true }
);


// Virtual for badge count
userSchema.virtual('badgeCount').get(function() {
  return this.badges.length;
});

// Method to add points
userSchema.methods.addPoints = function(points) {
  this.totalPoints += points;
  return this.save();
};

// Method to add badge
userSchema.methods.addBadge = function(badge) {
  // Check if badge already exists
  const existingBadge = this.badges.find(b => b.name === badge.name);
  if (!existingBadge) {
    this.badges.push(badge);
    return this.save();
  }
  return this;
};

// Method to add completed level
userSchema.methods.addCompletedLevel = function(level) {
  if (!this.completedLevels.includes(level)) {
    this.completedLevels.push(level);
    return this.save();
  }
  return this;
};

// Method to update experience level based on points
userSchema.methods.updateExperienceLevel = function() {
  if (this.totalPoints >= 2000) {
    this.experienceLevel = 'Advanced';
  } else if (this.totalPoints >= 500) {
    this.experienceLevel = 'Intermediate';
  } else {
    this.experienceLevel = 'Beginner';
  }
  return this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
