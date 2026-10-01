import { Router } from 'express';
import { getSite, getGithub } from '../controllers/siteController.js';

const router = Router();
router.get('/', getSite);
router.get('/github', getGithub);

export default router;
