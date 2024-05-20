import { Document, Schema } from "mongoose";
import bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

 
UserSchema.methods.comparePassword = async (candidatePassword: string): Promise<boolean> => {
    try{
        return bcrypt.compare(candidatePassword, this.password)
    }
}