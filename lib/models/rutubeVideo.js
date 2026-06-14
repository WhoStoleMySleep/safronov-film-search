import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const rutubeVideoSchema = new mongoose.Schema({
  owner: { type: ObjectId, required: true },
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  authorName: { type: String, default: '' },
  duration: { type: Number, default: 0 },
  folderId: { type: ObjectId, default: null },
}, { versionKey: false });

export default mongoose.models.rutubeVideo || mongoose.model('rutubeVideo', rutubeVideoSchema);
