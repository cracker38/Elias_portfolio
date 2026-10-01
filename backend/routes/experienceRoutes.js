import { Router } from 'express';
import { body } from 'express-validator';
import {
  listExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController.js';
import { requireAuth } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

router.get('/', listExperience);
router.post(
  '/',
  requireAuth,
  [
    body('role').trim().notEmpty().withMessage('Role is required.'),
    body('organization').trim().notEmpty().withMessage('Organization is required.'),
    body('period').trim().notEmpty().withMessage('Period is required.'),
  ],
  handleValidation,
  createExperience
);
router.put('/:id', requireAuth, updateExperience);
router.delete('/:id', requireAuth, deleteExperience);

export default router;
