import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IDecodedToken, IUser, IUserRequest } from '../config/interfaces';
import Student from '../models/student.schema';
import Teacher from '../models/teacher.schema';
import User from '../models/user.schema';
import { UserRole } from '../utils/constants';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/generateToken';

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Password is incorrect!' });
  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id });

  res.cookie('refreshtoken', refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 100, // 30 days
  });

  res.json({
    msg: 'Login Success!',
    access_token,
    user: { ...user._doc, password: '' },
  });
};

export const checkRole = (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, teacherId } = req.params;
    const { user } = req;

    if (
      // Student
      !(
        studentId &&
        user.role === UserRole.STUDENT &&
        user.account === studentId
      ) &&
      user.role !== UserRole.ADMIN &&
      // Teacher
      !(
        teacherId &&
        user.role === UserRole.TEACHER &&
        user.account === teacherId
      ) &&
      user.role !== UserRole.ADMIN
    ) {
      return res
        .status(403)
        .json({ msg: 'You do not have permission to perform this action' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const restrictTo = (roles: string[]) => {
  return (req: IUserRequest, res: Response, next: NextFunction) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ msg: 'You do not have permission to perform this action' });
      }
      next();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };
};

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password, type } = req.body;

      const user = await User.findOne({ account });

      switch (type) {
        case UserRole.STUDENT: {
          const student = await Student.findOne({ student_id: account });
          if (!student) {
            return res.status(400).json({
              msg: 'Account must be a student id or student does not exist!',
            });
          }
          break;
        }
        case UserRole.TEACHER: {
          const teacher = await Teacher.findOne({ teacher_id: account });
          if (!teacher) {
            return res.status(400).json({
              msg: 'Account must be a teacher id or teacher does not exist!',
            });
          }
          break;
        }
        default: {
          // Role Admin
          return res
            .status(400)
            .json({ msg: 'You cannot create an admin account or wrong type!' });
        }
      }

      // Check user exists
      if (user) return res.status(400).json({ msg: 'Account already exists' });

      // Create new user
      const passwordHash = bcrypt.hashSync(password, 12);
      const newUser: IUser = await User.create({
        name,
        account,
        password: passwordHash,
        type,
      });

      const accessToken = generateAccessToken({ id: newUser._id });

      return res.json({
        msg: 'Create user success!',
        user: newUser,
        token: accessToken,
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;

      const user = await User.findOne({ account });

      if (!user)
        return res.status(400).json({ msg: 'This account does not exits.' });

      loginUser(user, password, res);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie('refreshtoken', { path: `/api/refresh_token` });
      return res.json({ msg: 'Logged out!' });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: 'Please login now' });

      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );
      if (!decoded.id) return res.status(400).json({ msg: 'Please login now' });

      const user = await User.findById(decoded.id).select('-password');
      if (!user)
        return res.status(400).json({ msg: 'This account does not exist.' });

      const access_token = generateAccessToken({ id: user._id });
      res.json({ access_token, user });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  protect: async (req: IUserRequest, res: Response, next: NextFunction) => {
    try {
      // 1) Getting token and check of it's there
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization?.split(' ')[1];
      }

      if (!token) {
        return res
          .status(401)
          .json({ msg: 'You are not logged in! Please log in to get access.' });
      }

      // 2) Verification token
      const decoded = <IDecodedToken>(
        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
      );

      // 3) Check if user still exists
      const currentUser: IUser = await User.findById(decoded.id);
      if (!currentUser) {
        return res.status(401).json({
          msg: 'The user belonging to this token does no longer exist.',
        });
      }

      req.user = currentUser;

      // GRANT ACCESS TO PROTECTED ROUTE
      next();
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
