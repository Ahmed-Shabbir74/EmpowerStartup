// adminController.js

const User = require('../models/users/user');

const getUsersForAdmin = async (req, res) => {
  try {
    const users = await User.find({}, 'username email cnic appliedAsCandidate partyName StartupDesc Startuptype UserAddress StartupAddress');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching user list for admin:', error);
    res.status(500).json({ message: 'Error fetching user list for admin' });
  }
};

module.exports = {
  getUsersForAdmin,
};
