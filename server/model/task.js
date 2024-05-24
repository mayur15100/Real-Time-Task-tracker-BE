// models/Task.js
import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

export default mongoose.model('Task', taskSchema);