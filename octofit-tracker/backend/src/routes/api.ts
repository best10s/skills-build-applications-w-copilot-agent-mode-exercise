import { Router, type Request, type Response, type NextFunction } from 'express';
import type { Model } from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const apiRouter = Router();

function createResourceRouter<T>(model: Model<T>): Router {
  const router = Router();

  function isRequestBody(value: unknown): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  router.get('/', async (_request: Request, response: Response, next: NextFunction) => {
    try {
      const documents = await model.find().sort({ createdAt: -1 });
      response.json(documents);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
      const document = await model.findById(request.params.id);
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(document);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request: Request, response: Response, next: NextFunction) => {
    if (!isRequestBody(request.body)) {
      response.status(400).json({ error: 'Request body must be a JSON object' });
      return;
    }

    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
    if (!isRequestBody(request.body)) {
      response.status(400).json({ error: 'Request body must be a JSON object' });
      return;
    }

    try {
      const document = await model.findByIdAndUpdate(request.params.id, request.body, {
        returnDocument: 'after',
        runValidators: true,
      });
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(document);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
      const document = await model.findByIdAndDelete(request.params.id);
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  return router;
}

apiRouter.use('/users', createResourceRouter(User));
apiRouter.use('/teams', createResourceRouter(Team));
apiRouter.use('/activities', createResourceRouter(Activity));
apiRouter.use('/leaderboard', createResourceRouter(Leaderboard));
apiRouter.use('/workouts', createResourceRouter(Workout));

export default apiRouter;
