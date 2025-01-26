import express from 'express';
import {
  registerUser,
  loginAdmin,
  sendVerifyOtp,
  verifyEmail,
} from '../controllers/authController.js';
import { setUserRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/admin/register', setUserRole, registerUser);
router.post('/customer/register', setUserRole, registerUser);
router.post('/login', loginAdmin);
router.post('/send-verify-otp', sendVerifyOtp);
router.post('/verify-email', verifyEmail);

export default router;
