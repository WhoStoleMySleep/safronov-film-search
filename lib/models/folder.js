import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const folderSchema = new mongoose.Schema({
  owner: { type: ObjectId, required: true },
  name: { type: String, required: true, trim: true },
}, { timestamps: true, versionKey: false });

export default mongoose.models.Folder || mongoose.model('Folder', folderSchema);
