import { Router } from 'express';

import { settings } from '../../controllers/private';

const router = Router();

router.get('/', settings.get);
router.get('/:name', settings.getByName);
router.patch('/patch', settings.patch);

export default router;
