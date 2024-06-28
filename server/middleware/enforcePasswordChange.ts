import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import Employee from "../models/employeeModel";

const enforcePasswordChange = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
           console.log(email, password);
        const employee = await Employee.findOne({ email: email });
        console.log(employee)
        if (employee && !employee.passwordChanged && typeof password === "string") {
            const isMatch = await bcrypt.compare(password, employee.password || '');
                        if (isMatch) {
                          // Send password change required message
                          //res.status(403).json({ message: "Password change required" });
                          // Redirect to change password page
                          return res
                            .status(403)
                            .json({ message: "Password change required" });
                        }

        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default enforcePasswordChange;
