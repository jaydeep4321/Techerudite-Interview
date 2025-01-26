import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import {
  registerSchema,
  sendOtpSchema,
  otpValidationSchema,
} from '../validators/authValidator.js';
import User from '../models/userModel.js';
import sendEmail from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE } from '../config/emailTemplates.js';

const registerUser = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      const errorMessages = error.details.map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: errorMessages[0] });
    }

    const { firstname, lastname, email, password, role } = value;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpireAt = Date.now() + 10 * 60 * 1000;

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      role,
      verifyOtp: otp,
      verifyOtpExpireAt: otpExpireAt,
      isAccountVerified: false,
    });

    console.log(newUser, 'newUser');
    const emailText = EMAIL_VERIFY_TEMPLATE.replace('{{email}}', email).replace(
      '{{otp}}',
      otp
    );
    sendEmail(email, 'Verify Your Account', emailText);

    res.status(201).json({
      success: true,
      message:
        'User registered successfully. Please check your email for OTP verification.',
      userId: newUser.id,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });

    if (user.role !== 'admin')
      return res.status(401).json({
        success: false,
        message: 'You are not allowed to login from here',
      });

    if (!user.isAccountVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ success: true, message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const { error, value } = sendOtpSchema.validate(req.body);

    if (error) {
      const errorMessages = error.details.map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: errorMessages[0] });
    }

    const { userId } = value;

    const user = await User.findByPk(userId);
    const plainUser = user ? user.get({ plain: true }) : null;

    if (user.isAccountVerified) {
      return res.json({ success: false, message: 'Account already verified' });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;

    await user.save();

    console.log(plainUser?.email, 'user..');
    const emailText = EMAIL_VERIFY_TEMPLATE.replace(
      '{{email}}',
      plainUser?.email
    ).replace('{{otp}}', otp);
    sendEmail(plainUser?.email, 'Verify Your Account', emailText);

    return res
      .status(200)
      .json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { error, value } = otpValidationSchema.validate(req.body);

  if (error) {
    const errorMessages = error.details.map((e) => e.message);
    return res.status(400).json({ success: false, message: errorMessages[0] });
  }

  const { userId, otp } = value;

  const user = await User.findByPk(userId);
  if (!user)
    return res.status(400).json({ success: false, message: 'User not found' });

  if (user.isAccountVerified)
    return res
      .status(400)
      .json({ success: false, message: 'Email already verified' });

  if (user.verifyOtp !== otp || user.verifyOtpExpireAt < Date.now()) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid or expired OTP' });
  }

  user.isAccountVerified = true;
  user.verifyOtp = '';
  user.verifyOtpExpireAt = 0;
  await user.save();

  res.json({ success: true, message: 'Email verified successfully' });
};

export { registerUser, loginAdmin };
