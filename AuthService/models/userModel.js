const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: [true, 'Please tell us your phone!']
  },
  name: {
    type: String,
    default: ''
  },
  zalo_id: {
    type: String,
    default: ''
  },
  address: [
    {
      name: String,
      phone: String,
      street: String,
      ward: String,
      district: String,
      city: String,
    }
  ],
  avatar: {
    type: String,
    default: ''
  },
  is_seller: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  create_at: {
    type: Date,
    default: new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }),
  },
});


userSchema.pre(/^find/, function(next) {
  // this points to the current query
  // this.find({active: { $ne: false }})
  next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
