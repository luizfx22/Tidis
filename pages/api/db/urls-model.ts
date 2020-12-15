import mongoose from 'mongoose';

const { Schema } = mongoose;

// Urls table
const urlsTable = new Schema({
  a_url: String,
  a_alias: String,
  a_createdAt: { type: Date, default: Date.now() },
});

export default mongoose.models.urls || mongoose.model('urls', urlsTable);
