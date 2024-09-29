import { Router } from 'express';

import { pages } from '../../controllers/public';

const router = Router();

router.get('/', pages.get);
router.get('/:id', pages.getById);

export default router;
