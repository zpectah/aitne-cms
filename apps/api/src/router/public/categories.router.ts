import { Router } from 'express';

import { categories } from '../../controllers/public';

const router = Router();

router.get('/', categories.get);
router.get('/:id', categories.getById);

export default router;
