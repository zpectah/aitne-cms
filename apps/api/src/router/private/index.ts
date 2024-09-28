import { Router } from 'express';

import articles from './articles.router';
import categories from './categories.router';
import settings from './settings.router';
import tags from './tags.router';
import translations from './translations.router';
import users from './users.router';

const router = Router();

router.use('/articles', articles);
router.use('/categories', categories);
router.use('/settings', settings);
router.use('/tags', tags);
router.use('/translations', translations);
router.use('/users', users);

export default router;
