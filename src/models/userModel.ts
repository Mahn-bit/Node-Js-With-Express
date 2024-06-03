import { CallbackError, Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt";

// interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string;
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// const userSchema = new Schema<IUser>(
//   {
//     username: {
//       type: String,
//       required: [true, "Username is required."],
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       match: [/\S+@\S+\.\S+/, "Email is invalid"],
//     },
//     password: { type: String, require: [true, "Password is required."] },
//   },
//   {
//     timestamps: true,
//     strict: "throw",
//   }
// );

// userSchema.pre<IUser>("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(error.message);
//       next(error);
//     }
//   }
// });

// userSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ): Promise<boolean> {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// const User = model<IUser>("User", userSchema);

interface UserProps extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserProps>({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    require: [true, "Email is reqiured"],
    lowercase: true,
  },

  password: { type: String, required: [true, "Password is required"] },
});

// userSchema.pre<UserProps>("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   try{
//     const salt = await bcrypt.genSalt(10);
//     this.password  = await bcrypt.hash(this.password, salt)
//     next()
//   } catch(error){
//     next(error)
//   }
// });

userSchema.pre<UserProps>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

userSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<UserProps>("User", userSchema);

export default User;
