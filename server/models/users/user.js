const mongoose = require('mongoose');
const { Schema } = mongoose;

const userTypeEnum = ['Applicant', 'candidate', 'admin'];

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cnic: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{13}$/.test(value);
      },
      message: 'CNIC must be exactly 13 digits',
    },
  },
  userType: {
    type: String,
    enum: userTypeEnum,
    required: true,
  },
  otp: {
    value: { type: String, default: '' },
    updatedAt: { type: Date, default: null },
  },
  profilePic: { type: String, required: true },
  
  partyName: { type: String, default: '' },
  StartupDesc: { type: String, default: '' },
  Startuptype: { type: String, default: '' },
  UserAddress: { type: String, default: '' },
  StartupAddress: { type: String, default: '' },
  CNICFront: { type: String},
  CNICBack: { type: String, default: '' },
  Electricitybill: { type: String, default: '' },
  Utilitybill: { type: String, default: '' },
  appliedAsCandidate: { type: Boolean, default: false },

  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
