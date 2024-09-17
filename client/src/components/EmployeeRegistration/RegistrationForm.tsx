import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Step0 from "./Step0"; // Selection of Civil/Military
import Step1 from "./Step1"; // Basic Info
import Step2 from "./Step2"; // Salary & Education
import Step3 from "./Step3"; // Marital Status & Emergency Contact


const EmployeeFirstRegistrationForm: React.FC = () => {
  const methods = useForm({
    mode: "onChange",
  });
  const { isValid } = methods.formState; // Get form validation state
  const [step, setStep] = useState(0); // Start from Step 0
  const [isMilitary, setIsMilitary] = useState<boolean | null>(null); // Track if user is military or civil

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleTypeSelection = (type: string) => {
    setIsMilitary(type === "military");
    nextStep();
  };

  const onSubmit = (data: any) => {
    console.log("Final Form Data:", data);
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    console.log("FormData:", Object.fromEntries(formData.entries())); // Log FormData as an object
  };

  const handleNextWithLogging = () => {
    console.log(`Step ${step} Values:`, methods.getValues());
    nextStep();
  };

  const steps = [
    "Civil/Military Selection",
    "Basic Info",
    "Salary & Education",
    "Marital & Emergency Contact",
  ];

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl mx-auto p-6 space-y-6 bg-white rounded-lg">
        {/* Breadcrumb Stepper */}
        {/* Responsive Breadcrumb Stepper */}
        <ol className="flex flex-wrap justify-between items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm md:flex-nowrap md:space-x-4">
          {steps.map((label, index) => (
            <li
              key={index}
              className={`flex items-center ${
                step >= index ? "text-green-600" : "text-gray-500"
              } w-full md:w-auto`}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 mr-2 text-xs border rounded-full ${
                  step > index ? "border-green-600" : "border-gray-500"
                }`}
              >
                {step > index ? (
                  // Inline SVG checkmark
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>
              {label}
              {index < steps.length - 1 && (
                <svg
                  className="w-3 h-3 mx-2 hidden md:block"
                  fill="none"
                  viewBox="0 0 12 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                  />
                </svg>
              )}
            </li>
          ))}
        </ol>

        {/* Form Sections */}
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {step === 0 && <Step0 onTypeSelect={handleTypeSelection} />}
          {step === 1 && <Step1 isMilitary={isMilitary} />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {step > 0 && (
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md transition ease-in-out duration-150"
                onClick={prevStep}
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition ease-in-out duration-150 ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={isValid ? handleNextWithLogging : undefined}
                disabled={!isValid}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition ease-in-out duration-150 ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isValid}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default EmployeeFirstRegistrationForm;
