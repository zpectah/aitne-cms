import { Router } from 'express';

import { articles } from '../../controllers/public';

const router = Router();

router.get('/', articles.get);
router.get('/:id', articles.getById);

export default router;
