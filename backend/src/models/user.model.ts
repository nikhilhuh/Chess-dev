import { Document, Schema, model } from "mongoose";

// Define the User interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the User schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

// Create the User model
const User = model<IUser>("User", userSchema);

// Export the User model
export default User;