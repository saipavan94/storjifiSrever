const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  bucket: String,
  file: String,
  uuid: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Entry', EntrySchema);
