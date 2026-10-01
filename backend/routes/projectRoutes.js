import { Router } from 'express';
import { body } from 'express-validator';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { requireAuth } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

const projectRules = [
  body('title').trim().isLength({ min: 2 }).withMessage('Title is required.'),
  body('summary').trim().isLength({ min: 10 }).withMessage('Summary is required.'),
  body('description').trim().isLength({ min: 20 }).withMessage('Description is required.'),
];

router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/', requireAuth, projectRules, handleValidation, createProject);
router.put('/:id', requireAuth, updateProject);
router.delete('/:id', requireAuth, deleteProject);

export default router;
