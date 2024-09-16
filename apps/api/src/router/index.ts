import { Router } from 'express';
import privateRoutes from './private';

const router = Router();

router.use('/private', privateRoutes);

export default router;
