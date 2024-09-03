// import mongoose, { Document, Schema } from "mongoose";
// import bcrypt from "bcryptjs";

// // Validation function for password
// const validatePassword = (password: string) => {
//   const regex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
//   return regex.test(password);
// };

// export enum Roles {
//   Employee = "employee",
//   Manager = "manager",
//   DepartmentHead = "department head",
// }

// interface Education {
//   id?: string;
//   fieldofstudy?: string;
//   institution: string;
//   graduationYear: number;
//   educationLevel: string;
// }

// const educationSchema = new Schema<Education>({
//   id: { type: String},
//   fieldofstudy: { type: String},
//   institution: { type: String, required: true },
//   graduationYear: { type: Number, required: true },
//   educationLevel: { type: String, required: true },
// });

// interface Education2 {
//   bachelor: Education[];
//   master: Education[];
//   phd: Education[];
// }

// const education2Schema = new Schema<Education2>({
//   bachelor: [educationSchema],
//   master: [educationSchema],
//   phd: [educationSchema],
// });
// // interface Education2 {
// //   bachelor: Education[];
// //   master: Education[];
// //   phd: Education[];
// // }

// // const education2Schema = new Schema<Education2>({
// //   bachelor: [educationSchema],
// //   master: [educationSchema],
// //   phd: [educationSchema],
// // });

// interface RankChange {
//   oldRank?: string;
//   newRank?: string;
//   date?: Date;
// }

// interface PhoneNumber {
//   prefix: string;
//   number: string;
// }

// interface Address {
//   region?: string;
//   subcity?: string;
//   woreda?: string;
//   houseNumber?: string;
//   leyuBota?: string;
// }

// interface BirthplaceInfo extends Address {}

// interface MotherInformation {
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   phoneNumber: PhoneNumber;
// }

// interface EmergencyContactInfo {
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   relationship: string;
//   phoneNumber: string;
//   email?: string;
// }

// interface EmergencyContactAddress extends Address {}

// interface EmergencyContact {
//   info: EmergencyContactInfo;
//   address: EmergencyContactAddress;
// }

// interface SpouseInfo {
//   firstName?: string;
//   middleName?: string;
//   lastName?: string;
//   dob?: Date;
//   phoneNumber?: string;
//   address?: Address;
// }

// interface DivorcedInfo {
//   divorceDate?: Date;
// }

// //! leave info
// interface LeaveInfo {
//   employeeId?: string;
//   from?: Date;
//   to?: Date;
//   leaveType?: string;
//   reason?: string;
//   status?: string;
//   leaveFlag?: boolean;
// }

// interface LeaveBalance {
//   leaveType: string;
//   credit: number;
//   used: number;
//   available: number;
// }

// interface YearlyLeaveBalances {
//   year: number;
//   balances: LeaveBalance[];
// }

// interface AppraisalHistory {
//   employeeId?: string;
//   currentLevel?: string;
//   nextLevel?: string;
//   scores?: {
//     education?: number;
//     service?: number;
//     attitude?: number;
//     behaviour?: number;
//     workEfficiency?: number;
//     disciplinary?: number;
//   };
//   totalScore?: number;
//   status?: string;
//   promotionDate?: Date;
// }

// interface Evaluation {
//   employeeId: string;
//   workQuality: number;
//   productivity: number;
//   communication: number;
//   collaboration: number;
//   punctuality: number;
//   evaluationYear: number;
//   total: number;
// }

// interface IAttendance {
//   employeeId: string;
//   date: Date;
//   status: "late" | "on time" | "absent" | "permission";
//   recordedTime: Date;
//   checkOutTime?: Date;
//   evidence?: string;
//   reviewStatus?: string;
// }

// interface Complaint {
//   employeeId?: string;
//   category?: string;
//   complaint?: string;
//   description?: string;
//   complaintId?: string;
//   status?: string;
// }

// export interface EmployeeDocument extends Document {
//   title: string;
//   empId?: string;
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   birthday: Date;
//   gender: string;
//   position: string;
//   department: string;
//   photo?: string;
//   ethnicity: string;
//   phoneNumber: PhoneNumber;
//   email: string;
//   currentAddress: Address;
//   salary: string;
//   educationLevel: string;
//   education: Education[];
//   birthplaceInfo: BirthplaceInfo;
//   motherInformation: MotherInformation;
//   emergencyContact: EmergencyContact;
//   maritalStatus: string;
//   spouseInfo?: SpouseInfo;
//   divorcedInfo?: DivorcedInfo;
//   leaveInfo: LeaveInfo;
//   leaveBalances: YearlyLeaveBalances[];
//   appraisalHistory: AppraisalHistory[];
//   evaluations: Evaluation[];
//   employmentDate?: Date;
//   rankChanges: RankChange[];
//   waitingPeriodUntil?: Date;
//   attendanceRecords: IAttendance[];
//   complaints?: Complaint[];
//   lastSalaryRaise?: Date;
//   lastUpdated?: Date;
//   password?: string;
//   passwordChanged?: Boolean;
//   role: Roles;
//   manager?: string;
//   failedLoginAttempts?: Number;
//   locked?: Boolean;
//   lockedUntil?: Date;
// }

// const rankChangeSchema = new Schema<RankChange>({
//   oldRank: { type: String },
//   newRank: { type: String },
//   date: { type: Date, default: Date.now },
// });

// const evaluationSchema = new Schema<Evaluation>({
//   employeeId: { type: String, required: true },
//   workQuality: { type: Number, required: true },
//   productivity: { type: Number, required: true },
//   communication: { type: Number, required: true },
//   collaboration: { type: Number, required: true },
//   punctuality: { type: Number, required: true },
//   evaluationYear: { type: Number },
//   total: { type: Number },
// });

// const employeeSchema = new Schema<EmployeeDocument>(
//   {
//     title: { type: String, required: true },
//     empId: { type: String },
//     firstName: { type: String, required: true },
//     middleName: { type: String },
//     lastName: { type: String, required: true },
//     birthday: { type: Date, required: true },
//     gender: { type: String, required: true },
//     position: { type: String, required: true },
//     department: { type: String, required: true },
//     photo: { type: String },
//     ethnicity: { type: String, required: true },
//     phoneNumber: {
//       prefix: { type: String, required: true },
//       number: { type: String, required: true },
//     },
//     email: { type: String, required: true },
//     currentAddress: {
//       region: { type: String },
//       subcity: { type: String },
//       woreda: { type: String },
//       houseNumber: { type: String },
//       leyuBota: { type: String },
//     },
//     salary: { type: String, required: true },
//     educationLevel: { type: String },
//     education: [educationSchema],
//     birthplaceInfo: {
//       region: { type: String },
//       subcity: { type: String },
//       woreda: { type: String },
//       houseNumber: { type: String },
//       leyuBota: { type: String },
//     },
//     motherInformation: {
//       firstName: { type: String, required: true },
//       middleName: { type: String },
//       lastName: { type: String, required: true },
//       phoneNumber: {
//         prefix: { type: String, required: true },
//         number: { type: String, required: true },
//       },
//     },
//     emergencyContact: {
//       info: {
//         firstName: { type: String, required: true },
//         middleName: { type: String },
//         lastName: { type: String, required: true },
//         relationship: { type: String, required: true },
//         phoneNumber: { type: String, required: true },
//         email: { type: String },
//       },
//       address: {
//         region: { type: String },
//         subcity: { type: String },
//         woreda: { type: String },
//         houseNumber: { type: String },
//         leyuBota: { type: String },
//       },
//     },
//     maritalStatus: { type: String, required: true },
//     spouseInfo: {
//       firstName: { type: String },
//       middleName: { type: String },
//       lastName: { type: String },
//       dob: { type: Date },
//       phoneNumber: { type: String },
//       address: {
//         region: { type: String },
//         subcity: { type: String },
//         woreda: { type: String },
//         houseNumber: { type: String },
//         leyuBota: { type: String },
//       },
//     },
//     divorcedInfo: {
//       divorceDate: { type: Date },
//     },
//     leaveInfo: {
//       leaveFlag: { type: Boolean, default: false },
//       employeeId: { type: String },
//       from: { type: Date },
//       to: { type: Date },
//       leaveType: { type: String },
//       reason: { type: String },
//       status: { type: String },
//     },
//     lastUpdated: { type: Date, default: null },
//     leaveBalances: [
//       // {
//       //   year: { type: Number },
//       //   balances: [
//       //     {
//       //       leaveType: { type: String },
//       //       credit: { type: Number, default: 0 },
//       //       used: { type: Number, default: 0 },
//       //       available: { type: Number, default: 0 },
//       //     },
//       //   ],
//       // },
//     ],
//     appraisalHistory: [
//       {
//         employeeId: { type: String },
//         currentLevel: { type: String },
//         nextLevel: { type: String },
//         scores: {
//           education: { type: Number },
//           service: { type: Number },
//           attitude: { type: Number },
//           behaviour: { type: Number },
//           workEfficiency: { type: Number },
//           disciplinary: { type: Number },
//         },
//         totalScore: { type: Number },
//         status: { type: String },
//         promotionDate: { type: Date },
//       },
//     ],
//     employmentDate: { type: Date, required: true },
//     rankChanges: [rankChangeSchema],
//     waitingPeriodUntil: { type: Date },
//     evaluations: [evaluationSchema],
//     lastSalaryRaise: { type: Date },
//     attendanceRecords: [
//       {
//         date: { type: Date, required: true },
//         status: {
//           type: String,
//           enum: ["late", "on time", "absent", "permission"],
//           required: true,
//         },
//         recordedTime: { type: Date },
//         checkOutTime: { type: Date },
//         evidence: { type: String },
//         reviewStatus: { type: String },
//       },
//     ],
//     complaints: [
//       {
//         employeeId: { type: String },
//         category: { type: String },
//         complaint: { type: String },
//         description: { type: String },
//         complaintId: { type: String },
//         status: { type: String },
//       },
//     ],
//     password: {
//       type: String,
//       required: true, // for mule to update the value to include the validation
//       // minlength: 12,
//       // validate: [
//       //   validatePassword,
//       //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
//       // ],
//     },
//     passwordChanged: { type: Boolean, default: false },
//     role: {
//       type: String,
//       required: true,
//       enum: Object.values(Roles),
//       default: Roles.Employee,
//     },
//     manager: { type: String },
//     failedLoginAttempts: { type: Number, default: 0 },
//     locked: { type: Boolean, default: false },
//     lockedUntil: { type: Date },
//   },
//   { timestamps: true }
// );

// employeeSchema.pre<EmployeeDocument>("save", async function (next) {
//   if (!this.empId) {
//     const lastEmployee = await Employee.findOne(
//       {},
//       {},
//       { sort: { createdAt: -1 } }
//     );
//     let lastempIdNumber = 0;
//     if (lastEmployee && lastEmployee.empId) {
//       lastempIdNumber = parseInt(lastEmployee.empId.split("-")[1]);
//     }
//     this.empId = `FPC-${(lastempIdNumber + 1).toString().padStart(4, "0")}`;
//   }
//   next();
// });

// const Employee = mongoose.model<EmployeeDocument>("Employee", employeeSchema);
// export default Employee;
// =========================================================================check point=======================
// ============================================================================================================

import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Validation function for password
const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
  return regex.test(password);
};

export enum Roles {
  Employee = "employee",
  Manager = "manager",
  DepartmentHead = "department head",
}

interface Education {
  id?: string;
  fieldofstudy?: string;
  institution: string;
  graduationYear: number;
  educationLevel: string;
}

const educationSchema = new Schema<Education>({
  id: { type: String},
  fieldofstudy: { type: String},
  institution: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  educationLevel: { type: String, required: true },
});

interface Education2 {
  bachelor: Education[];
  master: Education[];
  phd: Education[];
}

const education2Schema = new Schema<Education2>({
  bachelor: [educationSchema],
  master: [educationSchema],
  phd: [educationSchema],
});
// interface Education2 {
//   bachelor: Education[];
//   master: Education[];
//   phd: Education[];
// }

// const education2Schema = new Schema<Education2>({
//   bachelor: [educationSchema],
//   master: [educationSchema],
//   phd: [educationSchema],
// });

interface RankChange {
  oldRank?: string;
  newRank?: string;
  date?: Date;
}

interface PhoneNumber {
  prefix: string;
  number: string;
}

interface Address {
  region?: string;
  subcity?: string;
  woreda?: string;
  houseNumber?: string;
  leyuBota?: string;
}

interface BirthplaceInfo extends Address {}

interface MotherInformation {
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: PhoneNumber;
}

interface EmergencyContactInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
}

interface EmergencyContactAddress extends Address {}

interface EmergencyContact {
  info: EmergencyContactInfo;
  address: EmergencyContactAddress;
}

interface SpouseInfo {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dob?: Date;
  phoneNumber?: string;
  address?: Address;
}

interface DivorcedInfo {
  divorceDate?: Date;
}

//! leave info
interface LeaveInfo {
  employeeId?: string;
  from?: Date;
  to?: Date;
  leaveType?: string;
  reason?: string;
  status?: string;
  leaveFlag?: boolean;
}

interface LeaveBalance {
  leaveType: string;
  credit: number;
  used: number;
  available: number;
}

interface YearlyLeaveBalances {
  year: number;
  balances: LeaveBalance[];
}

interface AppraisalHistory {
  employeeId?: string;
  currentLevel?: string;
  nextLevel?: string;
  scores?: {
    education?: number;
    service?: number;
    attitude?: number;
    behaviour?: number;
    workEfficiency?: number;
    disciplinary?: number;
  };
  totalScore?: number;
  status?: string;
  promotionDate?: Date;
}

interface Evaluation {
  employeeId: string;
  workQuality: number;
  productivity: number;
  communication: number;
  collaboration: number;
  punctuality: number;
  evaluationYear: number;
  total: number;
}

interface IAttendance {
  employeeId: string;
  date: Date;
  status: "late" | "on time" | "absent" | "permission";
  recordedTime: Date;
  checkOutTime?: Date;
  evidence?: string;
  reviewStatus?: string;
}

interface Complaint {
  employeeId?: string;
  category?: string;
  complaint?: string;
  description?: string;
  complaintId?: string;
  status?: string;
}



export interface EmployeeDocument extends Document {
  title: string;
  empId?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthday: Date;
  gender: string;
  position: string;
  department: string;
  photo?: string;
  ethnicity: string;
  phoneNumber: PhoneNumber;
  email: string;
  currentAddress: Address;
  salary: string;
  educationLevel: string;
  education: Education[];
  birthplaceInfo: BirthplaceInfo;
  motherInformation: MotherInformation;
  emergencyContact: EmergencyContact;
  maritalStatus: string;
  spouseInfo?: SpouseInfo;
  divorcedInfo?: DivorcedInfo;
  leaveInfo: LeaveInfo;
  leaveBalances: YearlyLeaveBalances[];
  appraisalHistory: AppraisalHistory[];
  evaluations: Evaluation[];
  employmentDate?: Date;
  rankChanges: RankChange[];
  waitingPeriodUntil?: Date;
  attendanceRecords: IAttendance[];
  complaints?: Complaint[];
  lastSalaryRaise?: Date;
  lastUpdated?: Date;
  password?: string;
  passwordChanged?: Boolean;
  role: Roles;
  manager?: string;
  failedLoginAttempts?: Number;
  locked?: Boolean;
  lockedUntil?: Date;
  retirementDate?: Date;
  status: "active" | "inactive";
  deactivationReason?: string;
}

const rankChangeSchema = new Schema<RankChange>({
  oldRank: { type: String },
  newRank: { type: String },
  date: { type: Date, default: Date.now },
});

const evaluationSchema = new Schema<Evaluation>({
  employeeId: { type: String, required: true },
  workQuality: { type: Number, required: true },
  productivity: { type: Number, required: true },
  communication: { type: Number, required: true },
  collaboration: { type: Number, required: true },
  punctuality: { type: Number, required: true },
  evaluationYear: { type: Number },
  total: { type: Number },
});

const employeeSchema = new Schema<EmployeeDocument>(
  {
    title: { type: String, required: true },
    empId: { type: String },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    photo: { type: String },
    ethnicity: { type: String, required: true },
    phoneNumber: {
      prefix: { type: String, required: true },
      number: { type: String, required: true },
    },
    email: { type: String, required: true },
    currentAddress: {
      region: { type: String },
      subcity: { type: String },
      woreda: { type: String },
      houseNumber: { type: String },
      leyuBota: { type: String },
    },
    salary: { type: String, required: true },
    educationLevel: { type: String },
    education: [educationSchema],
    birthplaceInfo: {
      region: { type: String },
      subcity: { type: String },
      woreda: { type: String },
      houseNumber: { type: String },
      leyuBota: { type: String },
    },
    motherInformation: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
      phoneNumber: {
        prefix: { type: String, required: true },
        number: { type: String, required: true },
      },
    },
    emergencyContact: {
      info: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
        relationship: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String },
      },
      address: {
        region: { type: String },
        subcity: { type: String },
        woreda: { type: String },
        houseNumber: { type: String },
        leyuBota: { type: String },
      },
    },
    maritalStatus: { type: String, required: true },
    spouseInfo: {
      firstName: { type: String },
      middleName: { type: String },
      lastName: { type: String },
      dob: { type: Date },
      phoneNumber: { type: String },
      address: {

        region: { type: String },
        subcity: { type: String },
        woreda: { type: String },
        houseNumber: { type: String },
        leyuBota: { type: String },
      },
    },
    divorcedInfo: {
      divorceDate: { type: Date },
    },
    leaveInfo: {
      leaveFlag: { type: Boolean, default: false },
      employeeId: { type: String },
      from: { type: Date },
      to: { type: Date },
      leaveType: { type: String },
      reason: { type: String },
      status: { type: String },
    },
    lastUpdated: { type: Date, default: null },
    leaveBalances: [
      // {
      //   year: { type: Number },
      //   balances: [
      //     {
      //       leaveType: { type: String },
      //       credit: { type: Number, default: 0 },
      //       used: { type: Number, default: 0 },
      //       available: { type: Number, default: 0 },
      //     },
      //   ],
      // },
    ],
    appraisalHistory: [
      {
        employeeId: { type: String },
        currentLevel: { type: String },
        nextLevel: { type: String },
        scores: {
          education: { type: Number },
          service: { type: Number },
          attitude: { type: Number },
          behaviour: { type: Number },
          workEfficiency: { type: Number },
          disciplinary: { type: Number },
        },
        totalScore: { type: Number },
        status: { type: String },
        promotionDate: { type: Date },
      },
    ],
    employmentDate: { type: Date, required: true },
    rankChanges: [rankChangeSchema],
    waitingPeriodUntil: { type: Date },
    evaluations: [evaluationSchema],
    lastSalaryRaise: { type: Date },
    attendanceRecords: [
      {
        date: { type: Date, required: true },
        status: {
          type: String,
          enum: ["late", "on time", "absent", "permission"],
          required: true,
        },
        recordedTime: { type: Date },
        checkOutTime: { type: Date },
        evidence: { type: String },
        reviewStatus: { type: String },
      },
    ],
    complaints: [
      {
        employeeId: { type: String },
        category: { type: String },
        complaint: { type: String },
        description: { type: String },
        complaintId: { type: String },
        status: { type: String },
      },
    ],
    password: {
      type: String,
      required: true, // for mule to update the value to include the validation
      // minlength: 12,
      // validate: [
      //   validatePassword,
      //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      // ],
    },
    passwordChanged: { type: Boolean, default: false },
    role: {
      type: String,
      required: true,
      enum: Object.values(Roles),
      default: Roles.Employee,
    },
    manager: { type: String },
    failedLoginAttempts: { type: Number, default: 0 },
    locked: { type: Boolean, default: false },
    lockedUntil: { type: Date },
    retirementDate: { type: Date},
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    deactivationReason: { type: String },
  },
  { timestamps: true }
);

employeeSchema.pre<EmployeeDocument>("save", async function (next) {
  if (!this.empId) {
    const lastEmployee = await Employee.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );
    let lastempIdNumber = 0;
    if (lastEmployee && lastEmployee.empId) {
      lastempIdNumber = parseInt(lastEmployee.empId.split("-")[1]);
    }
    this.empId = `FPC-${(lastempIdNumber + 1).toString().padStart(4, "0")}`;
  }
  next();
});

const Employee = mongoose.model<EmployeeDocument>("Employee", employeeSchema);
export default Employee;
