import { model, Schema, Types } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['running', 'walking', 'cycling', 'swimming', 'strength', 'other'],
      required: true,
    },
    durationMinutes: { type: Number, min: 1, required: true },
    distanceKm: { type: Number, min: 0 },
    date: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true },
);

export default model('Activity', activitySchema);
