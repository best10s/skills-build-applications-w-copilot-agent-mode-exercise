import { model, Schema, Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export default model('Team', teamSchema);
