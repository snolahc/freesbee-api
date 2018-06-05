const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const avatarSchema = new Schema({
  
  application: {type: String, required: true}, // external social network
  username: {type: String, required: true},
  api_key: {type: String, required: false},
  oauth_token: {type: String, required: false},

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Avatar = mongoose.model('Avatar', avatarSchema);
module.exports = Avatar;
