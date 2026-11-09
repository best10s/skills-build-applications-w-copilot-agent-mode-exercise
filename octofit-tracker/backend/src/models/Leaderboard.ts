import { model, Schema, Types } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, min: 0, default: 0, required: true },
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);
