import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const [alex, sam] = await Promise.all([
      User.findOneAndUpdate(
        { username: 'alex' },
        { $set: { email: 'alex@example.com', displayName: 'Alex' } },
        { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { username: 'sam' },
        { $set: { email: 'sam@example.com', displayName: 'Sam' } },
        { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
      ),
    ]);

    await Team.findOneAndUpdate(
      { name: 'OctoFit Crew' },
      { $set: { members: [alex._id, sam._id] } },
      { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
    );

    const activityDate = new Date('2026-01-15T08:00:00.000Z');
    await Activity.findOneAndUpdate(
      { user: alex._id, type: 'running', date: activityDate },
      { $set: { durationMinutes: 30, distanceKm: 5 } },
      { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
    );

    await Promise.all([
      Leaderboard.findOneAndUpdate(
        { user: alex._id },
        { $set: { points: 120 } },
        { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
      ),
      Leaderboard.findOneAndUpdate(
        { user: sam._id },
        { $set: { points: 90 } },
        { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
      ),
    ]);

    await Workout.findOneAndUpdate(
      { title: 'Starter Strength' },
      {
        $set: {
          description: 'A short full-body strength session.',
          difficulty: 'beginner',
          durationMinutes: 20,
          exercises: [
            { name: 'Bodyweight squat', sets: 3, reps: 10 },
            { name: 'Push-up', sets: 3, reps: 8 },
          ],
        },
      },
      { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
