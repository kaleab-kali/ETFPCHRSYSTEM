import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import HRStaff from '../models/hrstaffModel'; // Import the HRStaff model
import jwt from 'jsonwebtoken';
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 2 * 60 * 1000;

const createHRStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      role,
      phoneNumber,
      employmentDate,
    } = req.body;

    // Check if HRStaff with the same email already exists
    const existingHRStaff = await HRStaff.findOne({ email });
    if (existingHRStaff) {
      res
        .status(400)
        .json({ message: "HRStaff with this email already exists" });
      return;
    }

    // Validate new password
    if (password.length < 12) {
      res
        .status(400)
        .json({ message: "Password must be at least 12 characters long" });
      return;
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!regex.test(password)) {
      res
        .status(400)
        .json({
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the photo path from the uploaded file
    const photo = req.file?.path;

    // Create the new HRStaff
    const newHRStaff = new HRStaff({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role,
      phoneNumber,
      employmentDate,
      photo,
    });

    // Save the new HRStaff
    await newHRStaff.save();

    res
      .status(201)
      .json({ message: "HRStaff created successfully", newHRStaff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Creat the admin
const createAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, firstName, lastName, password} = req.body;
  
      // Check if HRStaff with the same email already exists
      const existingHRStaff = await HRStaff.findOne({ email });
      if (existingHRStaff) {
        res.status(400).json({ message: 'HRStaff with this email already exists' });
        return;
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new HRStaff
      const newHRStaff = new HRStaff({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        role: "admin",
      });
  
      // Save the new HRStaff
      await newHRStaff.save();
  
      res.status(201).json({ message: 'Admin created successfully', newHRStaff });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const loginHRStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if HRStaff exists
    const hrStaff = await HRStaff.findOne({ email });
    if (!hrStaff) {
      res.status(404).json({ message: "HRStaff not found" });
      return;
    }

    // Ensure failedLoginAttempts is initialized
    if (typeof hrStaff.failedLoginAttempts !== "number") {
      hrStaff.failedLoginAttempts = 0;
    }

    // Check if account is locked
    if (
      hrStaff.locked &&
      hrStaff.lockedUntil &&
      hrStaff.lockedUntil.getTime() > Date.now()
    ) {
      res
        .status(401)
        .json({ message: "Account locked. Please try again later." });
      return;
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, hrStaff.password);
    if (!isMatch) {
      hrStaff.failedLoginAttempts = (hrStaff.failedLoginAttempts as number) + 1;

      if ((hrStaff.failedLoginAttempts as number) >= MAX_LOGIN_ATTEMPTS) {
        hrStaff.locked = true;
        hrStaff.lockedUntil = new Date(Date.now() + LOCKOUT_DURATION);
      }

      await hrStaff.save();
      res
        .status(401)
        .json({
          message: hrStaff.locked
            ? "Account locked. Please try again later."
            : "Invalid credentials",
        });
      return;
    }

    // Reset failed login attempts
    hrStaff.failedLoginAttempts = 0;
    hrStaff.locked = false;
    hrStaff.lockedUntil = undefined;
    await hrStaff.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: hrStaff._id, email, role: hrStaff.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ message: "Login successful", token, role: hrStaff.role, ObjId: hrStaff._id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


  const changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, currentPassword, newPassword } = req.body;
  
      // Check if HRStaff exists
      const hrStaff = await HRStaff.findOne({ email });
      if (!hrStaff) {
        res.status(404).json({ message: 'HRStaff not found' });
        return;
      }
  
      // Check if the current password matches
      const isMatch = await bcrypt.compare(currentPassword, hrStaff.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Current password is incorrect' });
        return;
      }
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password
      hrStaff.password = hashedNewPassword;
      await hrStaff.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const updateHRStaff = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { email, firstName, lastName, role, phoneNumber, employmentDate, photo } = req.body;
  
      // Find the HR staff by ID
      const hrStaff = await HRStaff.findById(id);
      if (!hrStaff) {
        res.status(404).json({ message: 'HR Staff not found' });
        return;
      }
  
      // Update the fields excluding the password
      hrStaff.email = email || hrStaff.email;
      hrStaff.firstName = firstName || hrStaff.firstName;
      hrStaff.lastName = lastName || hrStaff.lastName;
      hrStaff.role = role || hrStaff.role;
      hrStaff.phoneNumber = phoneNumber || hrStaff.phoneNumber;
      hrStaff.employmentDate = employmentDate || hrStaff.employmentDate;
  
      // Update the photo 
      if (req.file?.path) {
        hrStaff.photo = req.file.path;
      } else {
        hrStaff.photo = photo || hrStaff.photo;
      }
  
      // Save the updated HR staff
      await hrStaff.save();
  
      res.status(200).json({ message: 'HR Staff updated successfully', hrStaff });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'HR Server Error' });
    }
  };

  const getAllHRStaff = async (req: Request, res: Response): Promise<void> => {
    try {
      const hrStaff = await HRStaff.find({ role: { $ne: 'admin' } });
      res.status(200).json(hrStaff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get Personnel
  const getStaff = async (req: Request, res: Response): Promise<void> => {
    try {
      const staff = await HRStaff.find({ role: 'staff' });
      res.status(200).json(staff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export { createHRStaff, createAdmin, loginHRStaff, changePassword, updateHRStaff, getAllHRStaff, getStaff };
