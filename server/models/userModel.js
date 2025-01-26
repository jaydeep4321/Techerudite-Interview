import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'First name cannot be empty' },
        len: {
          args: [3, 50],
          msg: 'First name must be between 3 and 50 characters',
        },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Last name cannot be empty' },
        len: {
          args: [3, 50],
          msg: 'Last name must be between 3 and 50 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Invalid email format' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'Password must be at least 6 characters long',
        },
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'customer'),
      allowNull: false,
      defaultValue: 'customer',
    },
    verifyOtp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verifyOtpExpireAt: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    isAccountVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

export default User;
