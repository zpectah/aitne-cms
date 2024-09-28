import { Router } from 'express';

import { settings } from '../../controllers/public';

const router = Router();

router.get('/', settings.get);
router.get('/:name', settings.getByName);

export default router;
