import { Router } from 'express';

import { translations } from '../../controllers/private';

const router = Router();

router.get('/', translations.get);
router.get('/:id', translations.getById);
router.put('/', translations.create);
router.patch('/:id', translations.update);
router.delete('/:id', translations.delete);
router.patch('/selected/delete', translations.deleteSelected);

router.patch('/toggle/:id', translations.toggle);
router.patch('/selected/toggle', translations.toggleSelected);

export default router;
