import { Router } from 'express';

import { tags } from '../../controllers/public';

const router = Router();

router.get('/', tags.get);
router.get('/:id', tags.getById);

export default router;
