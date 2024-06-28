import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import Step1 from "./step11";
import Step2 from "./step22";
import Step3 from "./step33";
import { Typography } from "antd";
import { useCreateEmployee } from "../services/mutations/employeeMutations";
import { EmployeeProfileInfo } from "../../../shared/types/employeeProfileModel";

const { Title } = Typography;

const { Step } = Steps;

const EmployeeForm: React.FC = () => {
  const employee = useCreateEmployee();
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<Partial<EmployeeProfileInfo>>(
    {}
  );

  const handleProfileChange = (values: Partial<EmployeeProfileInfo>) => {
    setProfileData({ ...profileData, ...values });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  // Object.keys(data).forEach((key) => {
  //   if (key === "photo") {
  //     formData.append("photo", data.photo[0].originFileObj);
  //   } else { 
  //     formData.append(key, data[key]);
  //   }
  // });


//this is the last commented function
//  const appendFormData = (formData: FormData, data: any, parentKey?: string) => {
//    if (data && typeof data === "object" && !(data instanceof Date)) {
//       if (parentKey === "birthday") {
//        // If the parentKey is "birthday", handle the date formatting
//        const formattedDate = data.toISOString().split("T")[0];
//        formData.append("birthday", formattedDate);
//      } else if (parentKey === "employmentDate"){
//       const formattedDate = data.toISOString().split("T")[0];
//       formData.append("employmentDate", formattedDate);
//      } else {
//        // If data is an object, iterate over its keys
//        Object.keys(data).forEach((key) => {
//         if (key === "photo") {
//           formData.append("photo", data.photo[0].originFileObj);
//         }else{
//          appendFormData(
//            formData,
//            data[key],
//            parentKey ? `${parentKey}[${key}]` : key
//          );
//         }
//        });
//      }
//    } else {
//      // For non-object data (e.g., strings, numbers), append directly
//      const value = data instanceof Date ? data.toISOString() : data;
//      formData.append(parentKey as string, value);
//    }
//  };

const appendFormData = (formData: FormData, data: any, parentKey?: string) => {
  if (data && typeof data === "object" && !(data instanceof Date)) {
    if (parentKey) {
      // Handle specific date fields based on the parentKey
      if (
        ["birthday", "employmentDate", "spouseInfo.dob"].includes(parentKey)
      ) {
        const formattedDate = data.toISOString().split("T")[0];
        formData.append(parentKey, formattedDate);
      } else {
        // If data is an object and not a date, iterate over its keys
        Object.keys(data).forEach((key) => {
          if (key === "photo") {
            formData.append("photo", data.photo[0].originFileObj);
          } else {
            appendFormData(
              formData,
              data[key],
              parentKey ? `${parentKey}.${key}` : key
            );
          }
        });
      }
    } else {
      // If no parentKey is provided, iterate over object keys
      Object.keys(data).forEach((key) => {
        if (key === "photo") {
          formData.append("photo", data.photo[0].originFileObj);
        } else {
          appendFormData(formData, data[key], key);
        }
      });
    }
  } else {
    // For non-object data (e.g., strings, numbers), append directly
    const value =
      data instanceof Date ? data.toISOString().split("T")[0] : data;
    formData.append(parentKey as string, value);
  }
};


//  const appendFormData = (formData: FormData, data: any, parentKey?: string) => {
//    if (data && typeof data === "object" && !(data instanceof Date)) {
//      if (data instanceof File && parentKey === "photo") {
//        // If data is a File and the parentKey is "photo", append with field name "photo"
//        formData.append("photo", data);
//      } else if (parentKey === "birthday") {
//        // If the parentKey is "birthday", handle the date formatting
//        const formattedDate = data.toISOString().split("T")[0];
//        formData.append("birthday", formattedDate);
//      } else if (parentKey === "employmentDate"){
//       const formattedDate = data.toISOString().split("T")[0];
//       formData.append("employmentDate", formattedDate);
//      } else {
//        // If data is an object, iterate over its keys
//        Object.keys(data).forEach((key) => {
//          appendFormData(
//            formData,
//            data[key],
//            parentKey ? `${parentKey}[${key}]` : key
//          );
//        });
//      }
//    } else {
//      // For non-object data (e.g., strings, numbers), append directly
//      const value = data instanceof Date ? data.toISOString() : data;
//      formData.append(parentKey as string, value);
//    }
//  };




  const handleFormSubmit = () => {
    const formData = new FormData();
    appendFormData(formData, profileData);
    console.log("FormData before sending:");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Use the formData in the mutation
    employee.mutate(formData);
  };

  return (
    <div>
      <h1>Employee Registration</h1>
      <Steps
        current={currentStep}
        style={{
          padding: "20px 24px 5px",
          background: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Step title="Step 1" />
        <Step title="Step 2" />
        <Step title="Step 3" />
      </Steps>
      <div style={{ padding: 24, background: "#fff" }}>
        {currentStep === 0 && (
          <Step1 profileData={profileData} onChange={handleProfileChange} />
        )}
        {currentStep === 1 && (
          <Step2 profileData={profileData} onChange={handleProfileChange} />
        )}
        {currentStep === 2 && (
          <Step3 profileData={profileData} onChange={handleProfileChange} />
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        {currentStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prevStep}>
            Previous
          </Button>
        )}
        {currentStep < 2 && (
          <Button type="primary" onClick={nextStep}>
            Next
          </Button>
        )}
        {currentStep === 2 && (
          <Button type="primary" onClick={handleFormSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmployeeForm;
