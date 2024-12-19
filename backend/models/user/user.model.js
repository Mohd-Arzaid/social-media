import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    friends:[
      {
        type:mongoose.Schema.ObjectId,
        ref:"User",
      }
    ],
    friendRequest:[
      {
        type:mongoose.Schema.ObjectId,
        ref:"User",
      }
    ],
    lastSeen:{
      type:Date,
      default:Date.now,
    },
    theme:{
      type:String,
      enum:["light", "dark"],
      default:"light",
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
