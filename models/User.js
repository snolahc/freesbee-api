const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({

  username: {type: String, required: true, unique: true},
  password: {type: String, required: false},

  name: {type: String, required: false},
  title: {type: String, required: false},
  headline: {type: String, required: false},
  location: {type: String, required: false},

  address: [{
    address_1: {type: String, required: false},
    address_2: {type: String, required: false},
    postal_code: {type: String, required: false},
    city: {type: String, required: false},
    region: {type: String, required: false},
    country: {type: String, required: false},
    latitude: {type: Number, required: false},
    longitude: {type: Number, required: false},
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

// ~ family ?
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
