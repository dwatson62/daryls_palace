var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  balance: { type: Number, default: 100 },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
