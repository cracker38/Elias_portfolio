import { Router } from 'express';
import { body } from 'express-validator';
import { listSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';
import { requireAuth } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

router.get('/', listSkills);
router.post(
  '/',
  requireAuth,
  [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('category').trim().notEmpty().withMessage('Category is required.'),
  ],
  handleValidation,
  createSkill
);
router.put('/:id', requireAuth, updateSkill);
router.delete('/:id', requireAuth, deleteSkill);

export default router;
