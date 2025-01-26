import Joi from 'joi';

const registerSchema = Joi.object({
  firstname: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'First name cannot be empty',
    'string.min': 'First name must be between 3 and 50 characters',
  }),
  lastname: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Last name cannot be empty',
    'string.min': 'Last name must be between 3 and 50 characters',
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Invalid email format',
  }),
  password: Joi.string()
    .min(6)
    .max(100)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    )
    .required()
    .messages({
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least 6 characters long',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
  role: Joi.string().valid('admin', 'customer').default('customer'),
});

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Invalid email format',
  }),
  password: Joi.string()
    .min(6)
    .max(100)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    )
    .required()
    .messages({
      'string.empty': 'Password cannot be empty',
    }),
});

const sendOtpSchema = Joi.object({
  userId: Joi.number().integer().positive().required().messages({
    'number.base': 'User ID must be a number',
    'number.integer': 'User ID must be an integer',
    'number.positive': 'User ID must be a positive number',
    'any.required': 'User ID is required',
  }),
});

const otpValidationSchema = Joi.object({
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.length': 'OTP must be a 6-digit number',
      'string.pattern.base': 'OTP must contain only digits',
      'any.required': 'OTP is required',
    }),
});

export { registerSchema, sendOtpSchema, otpValidationSchema, loginSchema };
