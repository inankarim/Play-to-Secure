import mongoose from 'mongoose';

const idorItemProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One progress record per user
  },
  foundItems: {
    type: [String],
    default: [],
    validate: {
      validator: function(items) {
        const validItems = ['crown', 'shield', 'diamond', 'key', 'scroll'];
        return items.every(item => validItems.includes(item));
      },
      message: 'Invalid item name'
    }
  },
  completedItems: {
    type: [String],
    default: [],
    validate: {
      validator: function(items) {
        const validItems = ['crown', 'shield', 'diamond', 'key', 'scroll'];
        return items.every(item => validItems.includes(item));
      },
      message: 'Invalid item name'
    }
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Method to check if all items are found and completed
idorItemProgressSchema.methods.isCompleted = function() {
  return this.completedItems.length === 5;
};

// Method to add an item if not already found
idorItemProgressSchema.methods.addItem = function(itemName) {
  if (!this.foundItems.includes(itemName)) {
    this.foundItems.push(itemName);
  }
};

// Method to mark an item as completed (quiz finished)
idorItemProgressSchema.methods.completeItem = function(itemName) {
  if (!this.completedItems.includes(itemName)) {
    this.completedItems.push(itemName);
    if (this.isCompleted() && !this.completedAt) {
      this.completedAt = new Date();
    }
  }
};

const IdorItemProgress = mongoose.model('IdorItemProgress', idorItemProgressSchema);

export default IdorItemProgress;