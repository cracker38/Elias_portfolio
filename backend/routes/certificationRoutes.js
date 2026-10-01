import { Router } from 'express';
import { body } from 'express-validator';
import {
  listCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../controllers/certificationController.js';
import { requireAuth } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

router.get('/', listCertifications);
router.post(
  '/',
  requireAuth,
  [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('issuer').trim().notEmpty().withMessage('Issuer is required.'),
  ],
  handleValidation,
  createCertification
);
router.put('/:id', requireAuth, updateCertification);
router.delete('/:id', requireAuth, deleteCertification);

export default router;
