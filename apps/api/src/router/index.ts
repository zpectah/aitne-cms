import { Router } from 'express';

import privateRoutes from './private';
import publicRoutes from './public';

const router = Router();

router.use('/private', privateRoutes);
router.use('/public', publicRoutes);

export default router;
