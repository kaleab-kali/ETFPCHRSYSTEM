import express from "express";
import colors from "colors";
import employeeRoute from "./routes/employeeRoutes";
import leaveRoute from "./routes/leaveRoutes"; // Import the leave routes
import apprasialRoute from "./routes/appraisalRoutes";
import hrstaffRoute from "./routes/hrstaffRoutes";
import profileRoute from './routes/profileRoutes'
import departmentRoute from './routes/departmentRoutes'
import AppraisalHistoryRoute from "./routes/appraisalHistoryRoutes";
import complaintRoute from "./routes/complaintRoutes";
import complaintTypeRoute from "./routes/complaintTypeRoutes";
import attendance from "./routes/attendanceRoutes";
import salaryLimitRoute from "./routes/salaryLimitRoutes";
import salaryRaiseRoute from "./routes/salaryRaiseRoutes";
import leaveBalanceRoutes from "./routes/leaveBalanceRoutes";
import { declareAbsentees } from "./services/attendanceService";
import notificationsRouter from './routes/notificationRoutes';
import titleRoute from './routes/subRoutes/titleRoute'
import instituteRoute from './routes/subRoutes/instituteRoute'
import positionRoute from './routes/subRoutes/positionRoute'
// import regionRoute from "./routes/subRoutes/reginonRoute";
import addressRoute from "./routes/subRoutes/addressRoute";
// import regionRoute from "./routes/subRoutes/reginonRoute";

import connectDb from "./config/db";
import dotenv from "dotenv";
// import cors from "cors";
// import express from "express";
// import colors from "colors";
// import employeeRoute from "./routes/employeeRoute";
// import connectDb from "./config/db";
// import uploadMiddleware from "./middleware/upload"; // Corrected spelling mistake
// import { handleFileUpload } from "./controllers/employeeController";
import multer from "multer";
// import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import cron from "node-cron";
import holidayRoutes from "./routes/holidayRoutes";
const app = express();
dotenv.config();
declare module "colors" {
  interface String {
    cyan: String;
  }
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
connectDb();

app.use("/employees", employeeRoute);
app.use("/HRStaff", hrstaffRoute);
app.use("/profile", profileRoute);
app.use("/departments", departmentRoute);
app.use("/leaves", leaveRoute);
app.use("/apprasials", apprasialRoute);
app.use("/appraisalHistory", AppraisalHistoryRoute);
app.use("/complaint", complaintRoute);
app.use("/complaintType", complaintTypeRoute);
app.use("/attendance", attendance);
app.use("/holidays", holidayRoutes);
app.use("/salaryLimits", salaryLimitRoute);
app.use("/salaryRaise", salaryRaiseRoute);
app.use("/leave-balance", leaveBalanceRoutes);
app.use('/notifications', notificationsRouter);
app.use("/title",titleRoute)
app.use("/position",positionRoute)
app.use("/institute",instituteRoute)
// app.use("/region",regionRoute);
app.use("/address", addressRoute);


cron.schedule("20 16 * * *", async () => {
  try {
    console.log("Running daily absentee declaration...");
    const absentees = await declareAbsentees();
    console.log("Declared absent for the following employees:", absentees);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error declaring absentees:", error.message);
    } else {
      console.error("Unknown error occurred during absentee declaration");
    }
  }
});



app.use("/uploads", express.static("uploads"));
const uploadsFolder = path.join(__dirname, "./uploads/");
console.log("Creating a photo-0 ");

if (!fs.existsSync(uploadsFolder)) {
  console.log("Creating a photo0 ");
  fs.mkdirSync(uploadsFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Creating a photo1 " + file.originalname);
    cb(null, uploadsFolder);
  },
  filename: (req, file, cb) => {
    console.log("Creating a photo 2" + file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
const fileupload = upload.single("photo");

app.route("/uploads").post(fileupload, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const filePath = path.join(uploadsFolder, req.file.filename);

    res.json({
      message: "File uploaded successfully.",
      filePath: filePath,
      fileName: req.file.filename,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: "File upload error: " + err.message });
    } else {
      next(err);
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.cyan);
});

// import express from "express";
// import colors from "colors";
// import employeeRoute from "./routes/employeeRoutes";
// import leaveRoute from "./routes/leaveRoutes"; // Import the leave routes
// import connectDb from "./config/db";
// import dotenv from "dotenv";
// import cors from "cors";

// // Extend the String interface with 'colors' properties
// declare module "colors" {
//   interface String {
//     cyan: String;
//   }
// }

// const app = express();
// dotenv.config();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors({ origin: "http://localhost:3000" }));

// const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
// connectDb();

// app.use("/employees", employeeRoute);
// app.use("/leaves", leaveRoute); // Use the leave routes

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
