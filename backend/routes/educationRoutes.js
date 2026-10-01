import { Router } from 'express';
import { body } from 'express-validator';
import {
  listEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController.js';
import { requireAuth } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

router.get('/', listEducation);
router.post(
  '/',
  requireAuth,
  [
    body('program').trim().notEmpty().withMessage('Program is required.'),
    body('institution').trim().notEmpty().withMessage('Institution is required.'),
    body('period').trim().notEmpty().withMessage('Period is required.'),
  ],
  handleValidation,
  createEducation
);
router.put('/:id', requireAuth, updateEducation);
router.delete('/:id', requireAuth, deleteEducation);

export default router;
