import React, {  useState } from "react";
import { Form, Steps, message } from "antd";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useCreateEmployee, useCreateUpload } from "../../services/mutations/employeeMutations";
// import { EmployeeData } from "../../../../shared/types/employeeTypes";

const { Step } = Steps;
let idCounter = 1;
const EmployeeRegistrationForm: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<any>({});
  const createEmployeeMutuation = useCreateEmployee();
  const createUploadMutuation = useCreateUpload();

  const handleFormData = (data: any, file?: File | null) => {
    setFormData((prevData: any) => ({
      ...prevData,
      ...data,
      // file,
      birthday: data.birthday ? data.birthday.toDate() : undefined, // Format the birthday
    }));
  };

  const steps = [
    {
      title: "Step 1",
      content: (
        <Step1
          form={form}
          nextStep={() => nextStep()}
          formData={formData}
          handleFormData={handleFormData}
        />
      ),
    },
    {
      title: "Step 2",
      content: (
        <Step2
          form={form}
          nextStep={() => nextStep()}
          prevStep={() => prevStep()}
          handleFormData={handleFormData}
        />
      ),
    },
    {
      title: "Step 3",
      content: (
        <Step3
          form={form}
          prevStep={() => prevStep()}
          handleFormData={handleFormData}
        />
      ),
    },
  ];

  const nextStep = () => {
    const values = form.getFieldsValue(true);
    handleFormData(values);

    // Log the form data

    // console.log(form.getFieldsValue());
    console.log(formData);
    setCurrentStep(currentStep + 1);
    // form
    //   .validateFields()
    //   .then(() => {
    //     setCurrentStep(currentStep + 1);
    //   })
    //   .catch((error) => {
    //     console.error('Validation failed:', error);
    //   });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = async () => {
    // Log the complete form data
    const values = form.getFieldsValue(true);
    // handleFormData(values);

    console.log("this is the values: " + values);
    // Generate a unique ID in the format of "FPC-0001"
    const uniqueId = `FPC-${String(idCounter).padStart(4, "0")}`;
    idCounter += 1;
    values.id = uniqueId;
    handleFormData(values);
    
    try {
      await form.validateFields();

      // Handle photo upload
      if (formData.photo?.length > 0) {
        const formDat = new FormData();
        formDat.append("photo", formData.photo[0]);
        const result = await createUploadMutuation.mutateAsync(formDat);

        // Assuming the result object has the path to the uploaded photo
        const {  filePath, fileName } = result;
        // console.log("File uploaded successfully:", message);
        console.log("File Path:", filePath);
        console.log("File Name:", fileName);

        // Update the employee's photo field with the path
        await handleFormData({ ...values, photo: fileName });
        createEmployeeMutuation.mutate({
          ...formData,
          photo: fileName,
        });
        // if(createEmployeeMutuation.status ==="success"){

        //   message.success("Form submitted successfully!");
        // }
        // if (createEmployeeMutuation.status === "error") {
        //   message.error("Form submitted unsuccessfully!, Error!!");
        // }

      } else {
        // Trigger the GraphQL mutation with the existing formData
        createEmployeeMutuation.mutate(formData);
        
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
    if (createEmployeeMutuation.status === "success") {
      message.success("Form submitted successfully!");
    }
    if (createEmployeeMutuation.status === "error") {
      message.error("Form submitted unsuccessfully!, Error!!");
    }
    console.log("Complete Form Data:", formData);
  };


  return (
    <>
      <Steps responsive current={currentStep} style={{ padding: "20px 24px 5px", background: "#fff", borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
        {steps.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ padding: "24px", background: "#fff"}}
      >
        <div style={{ margin: "16px 0" }}>{steps[currentStep].content}</div>
      </Form>
    </>
  );
};

export default EmployeeRegistrationForm;