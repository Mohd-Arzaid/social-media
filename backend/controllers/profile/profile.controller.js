import { Profile } from "../../models/user/profile.model.js";
import { User } from "../../models/user/user.model.js";
import uploadImageToCloudinary from "../../utils/imageUploader.js";

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password, ...userWithoutPassword } = userDetails.toObject(); // Omit password from the response

    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user details.",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;

    const userId = req.user.id;

    // Find the user by ID and populate their profile
    const userDetails = await User.findById(userId).populate(
      "additionalDetails"
    );

    // Check if the user exists
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user details
    userDetails.firstName = firstName || userDetails.firstName;
    userDetails.lastName = lastName || userDetails.lastName;

    // Save updated user details
    await userDetails.save();

    const profile = userDetails.additionalDetails;
    profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
    profile.about = about || profile.about;
    profile.contactNumber = contactNumber || profile.contactNumber;
    profile.gender = gender || profile.gender;
    await profile.save();

    // Return the updated user details
    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails: userDetails,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "An error occurred while updating the profile.",
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //Delete Profile of the User
    await Profile.findByIdAndDelete(user.additionalDetails);

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "User cannot be deleted successfully",
    });
  }
};

export const updateDisplayPicture = async (req, res) => {
  try {
    // Check if the file is uploaded
    if (!req.files || !req.files.displayPicture) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    // Upload image to Cloudinary
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000, // height
      80 // quality as a percentage
    );

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );

    return res.send({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
    });

  } catch (error) {
    console.error("Error updating display picture:", error); 
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
