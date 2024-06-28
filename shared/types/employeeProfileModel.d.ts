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

export interface Education {
  id: string;
  fieldofstudy: string;
  institution: string;
  graduationYear: string; // Change type to number
  educationLevel: string;
}

export interface EmployeeProfileInfo {
  _id: string;
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

  employmentDate?: Date;
}
