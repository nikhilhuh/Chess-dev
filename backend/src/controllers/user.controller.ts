import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model";

dotenv.config();

interface SignUpRequestBody {
  name: string;
  email: string;
  password: string;
}

interface SignInRequestBody {
  email: string;
  password: string;
}

interface ChangePasswordRequestBody {
  oldPassword: string;
  newPassword: string;
}

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const userController = {
  // POST http://localhost:3000/api/user/signup
  signUp: async (req: Request<{}, {}, SignUpRequestBody>, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        message: "Please provide all the required fields.",
      });
      return;
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({
          message: "User already exists.",
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({
        message: "Signup successful.",
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  // POST http://localhost:3000/api/user/signin
  signIn: async (req: Request<{}, {}, SignInRequestBody>, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide all the required fields.",
      });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        res.status(400).json({
          message: "User does not exist.",
        });
        return;
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        res.status(400).json({
          message: "Invalid credentials.",
        });
        return;
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error(
          "JWT_SECRET is not defined in the environment variables."
        );
      }

      const token = jwt.sign({ id: existingUser._id }, jwtSecret, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Signin successful.",
        token,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  // PUT http://localhost:3000/api/user/change-password
  changePassword: async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res.status(400).json({
        message: "Please provide all the required fields.",
      });
      return;
    }

    try {
      const existingUser = await User.findById(req.user?.id);
      if (!existingUser) {
        res.status(400).json({
          message: "User does not exist.",
        });
        return;
      }

      const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
      if (!isMatch) {
        res.status(400).json({
          message: "Old password is incorrect.",
        });
        return;
      }

      existingUser.password = await bcrypt.hash(newPassword, 10);
      await existingUser.save();

      res.status(200).json({
        message: "Password updated successfully.",
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  // GET http://localhost:3000/api/user/get-user
  getUser: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const existingUser = await User.findById(req.user?.id).select(
        "-password"
      );
      if (!existingUser) {
        res.status(400).json({
          message: "User does not exist.",
        });
        return;
      }

      res.status(200).json(existingUser);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
};

export default userController;
