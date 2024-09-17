import { Appraisal } from './../../../shared/types/appraisalTypes.d';
import i18n from "i18next";
import { initReactI18next, Translation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import EthnicityForm from "../components/Organization/Ethnicity/EthnicityForm";
import PositionForm from "../components/Organization/Position/PositionForm";
import { compileFunction } from "vm";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  am: {
    translation: {
      greeting: "ለምሳሌ እንኳን ደህና መጡ",
      totalEmployee: "ጠቅላላ የሰራተኛ ብዛት ",
      inactive: "የሄደ ሰራተኛ",
      present: "በስራ ላይ የተገኘ",
      absent: "በስራ ላይ ያልተገኘ",
      onLeave: "ፍቃድ ላይ ያለ ",
      reward: "እርከን",
      dashboard: "ዳሽቦርድ",
      leave: "ፈቃድ",
      attendance: "መገኘት",
      employee: "ሰራተኛ",
      Registration: "ምዝገባ",
      department: "ክፍል",
      list: "ዝርዝር",
      organization: "ተቅዋም",
      request: "ጥያቄ",
      currentLeave: "ፈቃድ ጥያቄ ዝርዝር",
      history: "ታሪክ",
      profile: "መገለጫ",
      title: "ማዕረግ",
      firstName: "ስም",
      middleName: "የአባት ስም",
      lastName: "የአያት ስም",
      birthday: "ልደት",
      employmentDate: "የቅጥር ምዝገባ ቀን",
      position: "የሥራ መደብ",
      ethnicity: "ብሔረ",
      photo: "ፎቶ",
      gender: "ጾታ",
      phoneNumber: "ስልክ ቁጥር",
      email: "ኢሜል",
      currentAddress: "የአሁኑ አድራሻ",
      region: "ክልል",
      subcity: "ክፍለ ከተማ",
      woreda: "ወረዳ",
      kebele: "ቀበሌ",
      houseNumber: "የቤት ቁጥር",
      emergencyContact: "አዲስ አገልግሎት",
      emergencyPhoneNumber: "አዲስ ስልክ ቁጥር",
      emergencyEmail: "አዲስ ኢሜል",
      emergencyAddress: "አዲስ አድራሻ",
      organizationName: "የፌዴራል ማረሚያ ቤት ኮሚሽን ",
      appraisal: "ማዕረግ",
      complaint: "ቅሬታ",
      recentActivity: "የቅርብ ተግባራ",
      
    },
  },
  en: {
    translation: {
      greeting: "Hello, welcome to the page",
      totalEmployee: "Total Employee",
      present: "Present",
      absent: "Absent",
      onLeave: "On Leave",
      recentActivity: "Recent Activity",
      dashboard: "Dashboard",
      leave: "Leave",
      attendance: "Attendance",
      employee: "Employee",
      department: "Department",
      inactive: "inactive",
      list: "List",
      organization: "Organization",
      request: "Request",
      currentLeave: "Leave Approval",
      history: "History",
      profile: "Profile",
      Registration: "Registration",
      title: "Title",
      firstName: "First Name",
      middleName: "Middle Name",
      lastName: "Last Name",
      birthday: "Birthday",
      employmentDate: "Employment Date",
      ethnicity: "Ethinicity",
      position: "Position",
      photo: "Photo",
      gender: "Gender",
      phoneNumber: "Phone Number",
      email: "Email",
      currentAddress: "Current Address",
      region: "Region",
      subcity: "Subcity",
      woreda: "Woreda",
      kebele: "Kebele",
      houseNumber: "House Number",
      emergencyContact: "Emergency Contact",
      emergencyPhoneNumber: "Emergency Phone Number",
      emergencyEmail: "Emergency Email",
      emergencyAddress: "Emergency Address",
      organizationName: "Federal Prison Commission",
      complaint: "Complaint",
      reward: "Reward",
      appraisal: "Appraisal",
      

      welcomeMessage: "Welcome to React and react-i18next",
    },
  },
  fr: {
    translation: {
      greeting: "Bonjour, bienvenue sur la page",
      welcomeMessage: "Bienvenue à React et react-i18next",
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // passes i18n down to react-i18next
  .init({
    debug: true,
    resources,
    fallbackLng: "am",
    lng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
