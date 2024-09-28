import { Router } from 'express';

import { translations } from '../../controllers/public';

const router = Router();

router.get('/', translations.get);
router.get('/:id', translations.getById);

export default router;
