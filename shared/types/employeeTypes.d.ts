interface LeaveInfo {
  employeeId?: string;
  from?: Date;
  to?: Date;
  leaveType?: string;
  reason?: string;
  status?: string;
  leaveFlag: boolean;

  leaveBalance?: {
    [year: string]: {
      leaveType: {
        annual: {
          credit: number;
          used: number;
          available: number;
        };
        health: {
          credit: number;
          used: number;
          available: number;
        };
        study: {
          credit: number;
          used: number;
          available: number;
        };
        maternity: {
          credit: number;
          used: number;
          available: number;
        };
        family: {
          credit: number;
          used: number;
          available: number;
        };
        paternity: {
          credit: number;
          used: number;
          available: number;
        };
        unpaid: {
          used: number;
        };
      };
    };
  };
}
interface EvaluationData {
  employeeId?: string;
  workQuality?: number;
  productivity?: number;
  communication?: number;
  collaboration?: number;
  punctuality?: number;
  evaluationYear?: number;
  total?: number;
}
interface CurrentAddress {
  region?: string;
  subcity?: string;
  woreda?: string;
  houseNumber?: string;
  leyuBota?: string;
  camp?: string;
}

interface Phone {
  prefix: string;
  number: string;
}

interface Education {
  id?: string;
  fieldofstudy?: string;
  institution: string;
  graduationYear: string; // Change type to number
  educationLevel: string;
}

interface BirthplaceInfo {
  region?: string;
  subcity?: string;
  woreda?: string;
  houseNumber?: string;
  leyuBota?: string;
}

interface MotherInformation {
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: {
    prefix: string;
    number: string;
  };
}
interface Address {
  region?: string;
  subcity?: string;
  woreda?: string;
  houseNumber?: string;
  leyuBota?: string;
}

interface ContactInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
}

interface EmergencyContact {
  info: ContactInfo;
  address: Address;
}

interface SpouseInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob?: Date;
  phoneNumber?: string;
  address: Address;
}

interface DivorcedInfo {
  divorceDate: Date;
  // Add other divorced fields as needed
}
export interface IAttendance {
  _id:string;
  employeeId: string;
  date: Date;
  status: "late" | "on time" | "absent";
  recordedTime: Date;
  checkOutTime?: Date;
  evidence?: string; // URL or path to the evidence document
  reviewStatus?: string;
}

export interface EducationalInfo {
  id: string;
  fieldofstudy: string;
  institution: string;
  graduationYear: string; // Change type to number
  educationLevel: string;
}

export interface EmployeeData {
  _id: string;
  empId: string;
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthday: Date;
  gender: string;
  position: string;
  department: string;
  photo: string;
  ethnicity: string;
  phoneNumber: Phone;
  email: string;
  currentAddress: CurrentAddress;
  salary: string;
  educationLevel: string;
  education: Education[];
  birthplaceInfo: BirthplaceInfo;
  motherInformation: MotherInformation;
  emergencyContact: EmergencyContact;
  maritalStatus: string;
  spouseInfo?: SpouseInfo;
  divorcedInfo?: DivorcedInfo;
  leaveInfo?: LeaveInfo;
  role: Roles;
  manager?: string;
  status?: string;
  evaluations?: EvaluationData[];
  attendanceRecords: IAttendance[];
  leaveBalances?: [
    {
      year: number ;
      balances: [
        {
          leaveType: string ;
          credit: number;
          used: number;
          available:number;
        }
      ];
      _id:string ;
    }
  ];
}
