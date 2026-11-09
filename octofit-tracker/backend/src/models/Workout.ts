import { model, Schema } from 'mongoose';

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sets: { type: Number, min: 1 },
    reps: { type: Number, min: 1 },
    durationMinutes: { type: Number, min: 1 },
  },
  { _id: false },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, min: 1, required: true },
    exercises: { type: [exerciseSchema], default: [] },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
