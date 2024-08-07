import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Username is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must contain 6 characters"],
      select: false,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: function () {
        return this.gender === "male"
          ? `https://avatar.iran.liara.run/public/boy?username=${this.fullName}`
          : `https://avatar.iran.liara.run/public/girl?username=${this.fullName}`;
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
