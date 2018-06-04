const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  login: {type: String, required: true},
  password: {type: String, required: true},

  firstName: {type: String, required: false},
  lastName: {type: String, required: false},
  jobTitle: {type: String, required: false},
  headline: {type: String, required: false},

  // userPicture: Media               // doesn't work, asks for a relation()
  // userHeader: String               // doesn't work, asks for a relation()
  // url: String


  // contacts: [User!]! @relation(name: "MyContacts")

  // bonds: [Bond!]! @relation(name: "MyBonds")

  // location: Location! @relation(name: "MyLocation")






}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
