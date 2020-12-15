import mongoose from 'mongoose';

const Schema = mongoose.Schema

// Urls table
const urlsTable = new Schema({
  a_url: String,
  a_alias: String,
  a_createdAt: { type: Date, default: Date.now() },
})

export default mongoose.model('urls', urlsTable)