import User from '../models/user.model.js';

// ==================== MARK ATTACK AS COMPLETE ====================
export const markAttackComplete = async (req, res) => {
  try {
    const userId = req.user._id;
    const { attackName } = req.body;

    if (!attackName) {
      return res.status(400).json({
        success: false,
        message: 'attackName is required'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Normalize attack name (lowercase, trimmed)
    const normalizedName = attackName.toLowerCase().trim();

    // Check if already completed
    const alreadyCompleted = user.completedAttacks.some(
      attack => attack.attackName === normalizedName
    );

    if (alreadyCompleted) {
      return res.status(200).json({
        success: true,
        message: 'Attack already completed',
        data: { attackName: normalizedName, alreadyCompleted: true }
      });
    }

    // Add to completed attacks
    user.completedAttacks.push({
      attackName: normalizedName,
      completedAt: new Date()
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: `Attack "${attackName}" marked as complete!`,
      data: {
        attackName: normalizedName,
        completedAt: new Date()
      }
    });

  } catch (error) {
    console.error('Mark attack complete error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking attack as complete',
      error: error.message
    });
  }
};

// ==================== GET COMPLETED ATTACKS ====================
export const getCompletedAttacks = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return array of completed attack names
    const completedAttackNames = user.completedAttacks.map(
      attack => attack.attackName
    );

    res.status(200).json({
      success: true,
      data: {
        completedAttacks: completedAttackNames,
        details: user.completedAttacks // Full details with dates if needed
      }
    });

  } catch (error) {
    console.error('Get completed attacks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching completed attacks',
      error: error.message
    });
  }
};