const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const mediaSchema = new Schema({
  title: {type: String, required: false},
  description: {type: String, required: false},

  filename: {type: String, required: false}, 
  url: {type: String, required: false}, 

  kind: [{type: String, enum: ['image', 'video', 'audio', 'file', 'link', 'text'], required: true, default: 'text'}],
  visibility: [{type: String, enum: ['public', 'contacts', 'private', 'hidden'], required: true, default: 'public'}],
  rawtext: {type: String, required: false},

  owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
      },

  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Media = mongoose.model('media', mediaSchema);
module.exports = Media;
