const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({

  username: {type: String, required: true},
  password: {type: String, required: true},

  firstName: {type: String, required: false},
  lastName: {type: String, required: false},
  jobTitle: {type: String, required: false},
  headline: {type: String, required: false},
  location: {type: String, required: false},

  address: [{
    addr_line0: {type: String, required: false},
    addr_line1: {type: String, required: false},
    zipCode: {type: String, required: false},
    city: {type: String, required: false},
    state: {type: String, required: false},
    country: {type: String, required: false},
    main: {type: Boolean, default: true},
  }],

  im: [{
    kind: [{type: String, enum: ['email', 'phone', 'skype', 'jabber', 'msn', 'icq'], required: true, default: 'email'}],
    label: {type: String},
    url: {type: String},
    main: {type: Boolean, default: true},
  }],

  media: [{
      type: Schema.Types.ObjectId,
      ref: "Media"
    }],

  avatars: [{
    type: Schema.Types.ObjectId,
    ref: "Avatar"
  }],

  contacts: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],

  delegates: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
