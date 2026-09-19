import User from "./userModel.js";

export const signup = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    // 1. Validate required fields
    if (!name || !email || !address || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 4. Create user
    const user = await User.create({
      name,
      email,
      address,
      password,
    });

    // 5. Don't send password back
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
      },
    });

  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};