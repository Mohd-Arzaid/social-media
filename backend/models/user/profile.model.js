import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);
