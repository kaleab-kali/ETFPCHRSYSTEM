// // Step1.tsx
// import React, { useEffect, useState } from "react";
// import { Form, Select, Input, Radio, DatePicker, Button, Row, Col, Upload } from "antd";
// import { FormInstance } from "antd/lib/form";

// import moment from "moment";
// import { data } from "../../utils/data";
// import { RcFile } from "antd/es/upload";
// import { UploadOutlined } from "@ant-design/icons";
// const { Option } = Select;

// interface Step1Props {
//   form: FormInstance<any>;
//   nextStep: () => void;
//   formData: any;
//   handleFormData: (data: any) => void;
// }
//   const positions = [
//     "Warden",
//     "Deputy Warden",
//     "Correctional Officer",
//     "Probation Officer",
//   ];
//   const departments = [
//     "Security",
//     "Health Services",
//     "Food Services",
//     "Rehabilitation",
//   ];


// const Step1: React.FC<Step1Props> = ({ form, nextStep,formData, handleFormData }) => {
//   const [region, setRegion] = useState<string | null>(null);
//   const [subcity, setSubcity] = useState<string | null>(null);
//   const [woreda, setWoreda] = useState<string | null>(null);

//   const validateName = (_rule: any, value: string, callback: (error?: string) => void) => {
//     // Regular expression to check for numbers or unknown characters
//     const nameRegex = /^[a-zA-Z\s]*$/;
//     // Check if the length of the name is less than 3 characters
//     if (value && (value.length < 3 || !nameRegex.test(value))) {
//       callback('Please enter a valid name with at least 3 characters and no numbers or special characters.');
//     } else {
//       callback();
//     }
//   };

//   // Reset subcity and woreda when region changes
//   useEffect(() => {
//     if (region) {
//       const subcities = Object.keys(data[region]);
//       const firstSubcity = subcities[0];
//       setSubcity(firstSubcity);
//       form.setFieldsValue({ currentAddress: { subcity: firstSubcity } });

//       const woredas = data[region][firstSubcity];
//       const firstWoreda = woredas[0];
//       setWoreda(firstWoreda);
//       form.setFieldsValue({
//         currentAddress: { woreda: firstWoreda },
//       });
//     }
//   }, [region]);

//   // Reset woreda when subcity changes
//   useEffect(() => {
//     if (region && subcity) {
//       const woredas = data[region][subcity];
//       const firstWoreda = woredas[0];
//       setWoreda(firstWoreda);
//       form.setFieldsValue({ currentAddress: { woreda: firstWoreda } });
//     }
//   }, [subcity]);

//   const handleRegionChange = (value: string) => {
//     setRegion(value);
//   };

//   const handleSubcityChange = (value: string) => {
//     setSubcity(value);
//   };
//   const handleDatePickerChange = (
//     date: moment.Moment | null,
//     dateString: string
//   ) => {
//     form.setFieldsValue({ birthday: date }); // Set the moment object directly
//   };
//    const handlePhotoChange = (info: { file: RcFile }) => {
//      const file = info.file;
//      handleFormData({ ...formData, file }); // Pass the file along with other form data
//    };

   

//   return (
//     <>
//       {/* first row */}
//       <Row gutter={16}>
//         <Col span={8}>
//           {/* <Col  xs={24} sm={12} md={8} lg={6}> */}
//           <Form.Item
//             label="የማዕረግ መጠሪያ"
//             name="title"
//             rules={[{ required: true, message: "Please select a title" }]}
//           >
//             <Select>
//               <Option value="ato">Ato</Option>
//               <Option value="doctor">Doctor</Option>
//               <Option value="Constable">ኮንስታብል</Option>
//               <Option value="Assistant Sergeant">ረዳት ሳጅን</Option>
//               <Option value="Deputy Sergeant">ምክትል ሳጅን</Option>
//               <Option value="Sergeant">ሳጅን</Option>
//               <Option value="Chief Sergeant">ዋና ሳጅን</Option>
//               <Option value="Assistant Inspector">ረዳት ኢንስፔክተር</Option>
//               <Option value="Deputy Inspector">ምክትል ኢንስፔክተር</Option>
//               <Option value="Inspector">ኢንስፔክተር</Option>
//               <Option value="Chief Inspector">ዋና ኢንስፔክተር</Option>
//               <Option value="DeputyCommander">ምክትል ኮማንደር</Option>
//               <Option value="Commander">ኮማንደር</Option>
//               <Option value="Assistant Commissioner">ረዳት ኮሚሽነር</Option>
//               <Option value="Deputy Commissioner">ምክትል ኮሚሽነር</Option>
//               <Option value="Commissioner General">ኮሚሽነር ጀነራል</Option>
//             </Select>
//           </Form.Item>
//         </Col>
//         <Col span={8}>
//           {/* <Col  xs={24} sm={12} md={8} lg={6}> */}
//           <Form.Item
//             label="First Name"
//             name="firstName"
//             rules={[
//               { required: true, message: "Please enter your first name" },
//               { validator: validateName },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col span={8}>
//           <Form.Item
//             label="Middle Name"
//             name="middleName"
//             rules={[{ validator: validateName }]}
//           >
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>
//       {/* second Row */}
//       <Row gutter={16}>
//         <Col span={8}>
//           <Form.Item
//             label="Last Name"
//             name="lastName"
//             rules={[
//               { required: true, message: "Please enter your last name" },
//               { validator: validateName },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col span={8}>
//           <Form.Item
//             label="Birthday"
//             name="birthday"
//             rules={[{ required: true, message: "Please select your birthday" }]}
//           >
//             <DatePicker
//               style={{ width: "100%" }}
//               onChange={() => handleDatePickerChange}
//             />
//           </Form.Item>
//         </Col>
//         <Col span={8}>
//           <Form.Item
//             label="Employment Date"
//             name="employmentDate"
//             // rules={[{ required: true, message: "Please select employment date" }]}
//           >
//             <DatePicker
//               style={{ width: "100%" }}
//               onChange={() => handleDatePickerChange}
//             />
//           </Form.Item>
//         </Col>
//       </Row>
//       {/* Third Row */}
//       <Row gutter={16}>
//         <Col span={8}>
//           <Form.Item
//             label="Position"
//             name="position"
//             rules={[{ required: true, message: "Please select your position" }]}
//           >
//             <Select placeholder="Select a position">
//               {positions.map((position) => (
//                 <Option
//                   key={position}
//                   value={position.toLowerCase().replace(" ", "")}
//                 >
//                   {position}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>
//         <Col span={8}>
//           <Form.Item
//             label="Department"
//             name="department"
//             rules={[
//               { required: true, message: "Please select your department" },
//             ]}
//           >
//             <Select placeholder="Select a department">
//               {departments.map((department) => (
//                 <Option
//                   key={department}
//                   value={department.toLowerCase().replace(" ", "")}
//                 >
//                   {department}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>
//         <Col span={8}>
//           <Form.Item
//             label="Ethnicity"
//             name="ethnicity"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter your ethnicity",
//               },
//             ]}
//           >
//             <Select placeholder="Select Ethnicity">
//               <Option value="Afar">Afar</Option>
//               <Option value="Amhara">Amhara</Option>
//               <Option value="Gurage">Gurage</Option>
//               <Option value="Harari">Harari</Option>
//               <Option value="Oromo">Oromo</Option>
//               <Option value="Tigray">Tgray</Option>
//               <Option value="Sidama">Sidama</Option>
//               <Option value="snnp">SNNP</Option>
//               <Option value="Somalie">Somalie</Option>
//             </Select>
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={16}>
//         <Col span={12}>
//           <Form.Item
//             label="Photo"
//             name="photo"
//             valuePropName="fileList"
//             getValueFromEvent={(e) => [e.file]}
//             rules={[{ required: true, message: "Please upload your photo" }]}
//           >
//             <Upload
//               beforeUpload={(file) => {
//                 handlePhotoChange({ file });
//                 return false; // Prevent default behavior (auto-upload)
//               }}
//               showUploadList={false}
//               action="http://localhost:8000/uploads" //  the server endpoint for file upload
//             >
//               <Button icon={<UploadOutlined />}>Click to upload</Button>
//             </Upload>
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item
//             label="Gender"
//             name="gender"
//             rules={[{ required: true, message: "Please select your gender" }]}
//           >
//             <Radio.Group>
//               <Radio value="male">Male</Radio>
//               <Radio value="female">Female</Radio>
//             </Radio.Group>
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row gutter={16}>
//         <Col span={12}>
//           <Form.Item
//             label="Phone Number"
//             name="phoneNumber"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter your phone number",
//               },
//             ]}
//           >
//             <Input.Group compact>
//               {/* Ethiopian country code */}
//               <Form.Item
//                 name={["phoneNumber", "prefix"]}
//                 initialValue="+251"
//                 noStyle
//               >
//                 <Input style={{ width: "20%" }} readOnly />
//               </Form.Item>
//               {/* Phone number input */}
//               <Form.Item
//                 name={["phoneNumber", "number"]}
//                 noStyle
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please enter your phone number",
//                   },
//                   {
//                     pattern: /^[0-9]{9}$/,
//                     message: "Phone number must be exactly 9 digits",
//                   },
//                 ]}
//               >
//                 <Input style={{ width: "80%" }} />
//               </Form.Item>
//             </Input.Group>
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: "Please enter your email" }]}
//           >
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Form.Item
//         label={
//           <span style={{ fontWeight: "bold", fontSize: "16px" }}>
//             Current Address
//           </span>
//         }
//         // name="currentAddress"
//       >
//         <>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label="Region" name={["currentAddress", "region"]}>
//                 <Select
//                   options={Object.keys(data)?.map((region) => ({
//                     label: region,
//                     value: region,
//                   }))}
//                   onChange={handleRegionChange}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 label="Zone/Subcity"
//                 name={["currentAddress", "subcity"]}
//               >
//                 <Select
//                   options={
//                     region
//                       ? Object.keys(data[region])?.map((subcity) => ({
//                           label: subcity,
//                           value: subcity,
//                         }))
//                       : []
//                   }
//                   onChange={handleSubcityChange}
//                   value={subcity}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label="Woreda" name={["currentAddress", "woreda"]}>
//                 <Select
//                   options={
//                     region && subcity
//                       ? data[region][subcity]?.map((woreda) => ({
//                           label: woreda,
//                           value: woreda,
//                         }))
//                       : []
//                   }
//                   value={woreda}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item
//                 label="House Number"
//                 name={["currentAddress", "houseNumber"]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 label="Leyu Bota"
//                 name={["currentAddress", "leyuBota"]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item label="Camp" name={["currentAddress", "camp"]}>
//                 <Input />
//               </Form.Item>
//             </Col>
//           </Row>
//         </>
//         {/* Sub-form for Current Address */}
//       </Form.Item>

//       <Button
//         type="primary"
//         onClick={nextStep}
//         style={{ background: "#1890ff", borderColor: "#1890ff" }}
//       >
//         Next
//       </Button>
//     </>
//   );
// };

// export default Step1;

// Step1.tsx
// // Step1.tsx
// import { useFormContext } from 'react-hook-form';
// import { required } from '../../utils/decorators/validators';

// interface Step1Props {
//   isMilitary: boolean | null; // Determine which rank options to show
// }

// const Step1: React.FC<Step1Props> = ({ isMilitary }) => {
//   const { register, formState: { errors } } = useFormContext();

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Title:</label>
//           <select
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('title', { validate: required('Title is required') })}
//           >
//             {isMilitary ? (
//               <>
//                 <option value="Private">Private</option>
//                 <option value="Sergeant">Sergeant</option>
//                 <option value="Lieutenant">Lieutenant</option>
//                 <option value="Captain">Captain</option>
//               </>
//             ) : (
//               <>
//                 <option value="Mr.">Mr.</option>
//                 <option value="Mrs.">Mrs.</option>
//                 <option value="Ms.">Ms.</option>
//                 <option value="Dr.">Dr.</option>
//               </>
//             )}
//           </select>
//           <p className="text-red-500 text-sm">{errors.title?.message as string}</p>
//         </div>

//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Name:</label>
//           <input
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-8 px-2"
//             {...register('name', { validate: required('Name is required') })}
//           />
//           <p className="text-red-500 text-sm">{errors.name?.message as string}</p>
//         </div>

//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Age:</label>
//           <input
//             type="number"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('age', { 
//               validate: {
//                 required: required('Age is required'),
//                 isNumber: (value) => (!isNaN(value) ? true : 'Age must be a number'),
//                 min: (value) => (value >= 18 ? true : 'Must be at least 18 years old'),
//               }
//             })}
//           />
//           <p className="text-red-500 text-sm">{errors.age?.message as string}</p>
//         </div>

//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Photo:</label>
//           <input
//             type="file"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('photo')}
//           />
//         </div>

//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Address:</label>
//           <input
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('address')}
//           />
//         </div>

//         <div className="form-group">
//           <label className="block font-medium text-gray-700">Height (in cm):</label>
//           <input
//             type="number"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//             {...register('height', { validate: (value) => (value >= 50 ? true : 'Height must be at least 50 cm') })}
//           />
//           <p className="text-red-500 text-sm">{errors.height?.message as string}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step1;


import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { required } from '../../utils/decorators/validators';

// Define types for the cascading dropdown data
interface RegionData {
  [key: string]: string[];
}

interface WoredaData {
  [key: string]: string[];
}

// Dummy data for cascading dropdowns
const regionData: RegionData = {
  'Region 1': ['Subcity 1A', 'Subcity 1B'],
  'Region 2': ['Subcity 2A', 'Subcity 2B'],
};

const woredaData: WoredaData = {
  'Subcity 1A': ['Woreda 1A1', 'Woreda 1A2'],
  'Subcity 1B': ['Woreda 1B1', 'Woreda 1B2'],
  'Subcity 2A': ['Woreda 2A1', 'Woreda 2A2'],
  'Subcity 2B': ['Woreda 2B1', 'Woreda 2B2'],
};

// Dummy data for dropdowns
const positionOptions = ['Manager', 'Engineer', 'Technician', 'HR'];
const departmentOptions = ['Sales', 'Marketing', 'IT', 'HR'];
const ethnicityOptions = ['Amhara', 'Oromo', 'Tigray', 'Somali'];
const genderOptions = ['Male', 'Female', 'Other'];

interface Step1Props {
  isMilitary: boolean | null;
}

const Step1: React.FC<Step1Props> = ({ isMilitary }) => {
  const { register, formState: { errors } } = useFormContext();
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedSubcity, setSelectedSubcity] = useState<string>('');

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedRegion(value);
    setSelectedSubcity(''); // Reset subcity when region changes
  };

  const handleSubcityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcity(e.target.value);
  };

  // Function to get error message from nested objects
  const getErrorMessage = (field: string) => {
    const errorField = field.split('.').reduce((prev, curr) => prev?.[curr], errors as Record<string, any>);
    return errorField?.message;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Basic Information</h2>

      {/* Title Field */}
      <div className="form-group">
        <label className="block font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <select
          className="mt-1 block w-100 border border-gray-300 rounded-md shadow-sm px-3"
          {...register('title', { validate: required('Title is required') })}
        >
          {isMilitary ? (
            <>
              <option value="Private">Private</option>
              <option value="Sergeant">Sergeant</option>
              <option value="Lieutenant">Lieutenant</option>
              <option value="Captain">Captain</option>
            </>
          ) : (
            <>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
            </>
          )}
        </select>
        {getErrorMessage('title') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('title')}</p>}
      </div>

      {/* Personal Info Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Name */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
            {...register('firstName', { validate: required('First name is required') })}
          />
          {getErrorMessage('firstName') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('firstName')}</p>}
        </div>

        {/* Middle Name */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Middle Name <span className="text-red-500">*</span>
          </label>
          <input
            className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
            {...register('middleName', { validate: required('Middle name is required') })}
          />
          {getErrorMessage('middleName') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('middleName')}</p>}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
            {...register('lastName', { validate: required('Last name is required') })}
          />
          {getErrorMessage('lastName') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('lastName')}</p>}
        </div>

        {/* Age */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Age <span className="text-red-500">*</span>:
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('age', { validate: required('Age is required') })}
          />
          {getErrorMessage('age') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('age')}</p>}
        </div>

        {/* Height */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Height (cm) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('height', { validate: required('Height is required') })}
          />
          {getErrorMessage('height') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('height')}</p>}
        </div>

        {/* Weight */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Weight (kg) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('weight', { validate: required('Weight is required') })}
          />
          {getErrorMessage('weight') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('weight')}</p>}
        </div>

        {/* Position Dropdown */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Position <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('position', { validate: required('Position is required') })}
          >
            <option value="">Select Position</option>
            {positionOptions.map((pos) => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
          {getErrorMessage('position') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('position')}</p>}
        </div>

        {/* Department Dropdown */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('department', { validate: required('Department is required') })}
          >
            <option value="">Select Department</option>
            {departmentOptions.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {getErrorMessage('department') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('department')}</p>}
        </div>

        {/* Photo Upload */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Photo <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('photo', { validate: required('Photo is required') })}
          />
          {getErrorMessage('photo') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('photo')}</p>}
        </div>

        {/* Ethnicity Dropdown */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Ethnicity <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('ethnicity', { validate: required('Ethnicity is required') })}
          >
            <option value="">Select Ethnicity</option>
            {ethnicityOptions.map((eth) => (
              <option key={eth} value={eth}>{eth}</option>
            ))}
          </select>
          {getErrorMessage('ethnicity') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('ethnicity')}</p>}
        </div>

        {/* Gender Dropdown */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('gender', { validate: required('Gender is required') })}
          >
            <option value="">Select Gender</option>
            {genderOptions.map((gender) => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
          {getErrorMessage('gender') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('gender')}</p>}
        </div>

        {/* Birthday */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Birthday <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('birthday', { validate: required('Birthday is required') })}
          />
          {getErrorMessage('birthday') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('birthday')}</p>}
        </div>
      </div>

      {/* Phone Number */}
      <div className="form-group">
        <label className="block font-medium text-gray-700">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value="+251"
            readOnly
            className="mt-1 block w-10 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
          <input
            type="text"
            placeholder="Phone number"
            className="mt-1 block w-150 px-3 border border-gray-300 rounded-md shadow-sm"
            {...register('phoneNumber.number', { validate: required('Phone number is required') })}
          />
        </div>
        {getErrorMessage('phoneNumber.number') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('phoneNumber.number')}</p>}
      </div>

      {/* Current Address Section */}
      <h3 className="text-lg font-medium text-gray-700 mt-4">Current Address</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
        {/* Region Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Region <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('currentAddress.region', { validate: required('Region is required') })}
            onChange={handleRegionChange}
          >
            <option value="">Select Region</option>
            {Object.keys(regionData).map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          {getErrorMessage('currentAddress.region') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('currentAddress.region')}</p>}
        </div>

        {/* Subcity Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Subcity <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('currentAddress.subcity', { validate: required('Subcity is required') })}
            onChange={handleSubcityChange}
            disabled={!selectedRegion}
          >
            <option value="">Select Subcity</option>
            {selectedRegion && regionData[selectedRegion]?.map((subcity) => (
              <option key={subcity} value={subcity}>{subcity}</option>
            ))}
          </select>
          {getErrorMessage('currentAddress.subcity') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('currentAddress.subcity')}</p>}
        </div>

        {/* Woreda Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Woreda <span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('currentAddress.woreda', { validate: required('Woreda is required') })}
            disabled={!selectedSubcity}
          >
            <option value="">Select Woreda</option>
            {selectedSubcity && woredaData[selectedSubcity]?.map((woreda) => (
              <option key={woreda} value={woreda}>{woreda}</option>
            ))}
          </select>
          {getErrorMessage('currentAddress.woreda') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('currentAddress.woreda')}</p>}
        </div>

        {/* House Number Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            House Number <span className="text-red-500">*</span>
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('currentAddress.houseNumber', { validate: required('House number is required') })}
          />
          {getErrorMessage('currentAddress.houseNumber') && <p className="text-red-500 text-sm mt-1">{getErrorMessage('currentAddress.houseNumber')}</p>}
        </div>

        {/* Leyu Bota Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">Leyu Bota (if applicable)</label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('currentAddress.leyuBota')}
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;
