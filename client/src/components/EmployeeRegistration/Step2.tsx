// // Step2.tsx
// import React, { useEffect, useState } from "react";
// import {
//   Form,
//   Input,
//   DatePicker,
//   Radio,
//   Select,
//   Button,
//   Space,
//   Row,
//   Col,
//   AutoComplete,
// } from "antd";
// import { FormInstance } from "antd/lib/form";
// import Title from "antd/es/typography/Title";
// import { data } from "../../utils/data";

// const { Option } = Select;
// type Degree = { id: number };
// type Degrees = { bachelor: Degree[]; master: Degree[]; phd: Degree[] };
// type Level = "bachelor" | "master" | "phd";

// const universitiesInEthiopia = [
//   // Public Universities
//   "Addis Ababa University (AAU)",
//   "Adama Science and Technology University (ASTU)",
//   "Arba Minch University (AMU)",
//   "Adigrat University (AU)",
//   "Ambo University (AU)",
//   "Aksum University (ASU)",
//   "Arsi University (ASPU)",
//   "Bahir Dar University (BDU)",
//   "Dilla University (DU)",
//   "Debre Tabor University (DTU)",
//   "Gambella University (GU)",
//   "Haramaya University (HU)",
//   "Hawassa University (HWU)",
//   "Jigjiga University (JJU)",
//   "Jimma University (JU)",
//   "Jomo Kenyatta University of Agriculture and Technology (JKUAT) - Ethiopian Campus",
//   "Kemise University (Kemu)",
//   "Mekelle University (MU)",
//   "Metu University (MTU)",
//   "Nekemte University (NU)",
//   "Sodo University (SU)",
//   "Wollega University (WU)",
//   "Wollo University (WU)",
//   "Wolayta Sodo University (WSU)",

//   // Private Universities
//   "Admas University",
//   "Akaki Science and Technology University (ASTU)",
//   "Ambo University",
//   "Bethel University",
//   "Blue Nile University",
//   "Central Ethiopia University",
//   "Defense University",
//   "Debre Markos University",
//   "EiABC Engineering College",
//   "Ethiopian Institute of Technology (EiT)",
//   "Ethiopian Medical College",
//   "Gondar University",
//   "Hope University",
//   "Jimma University of Science and Technology",
//   "Kotebe Metropolitan University",
//   "Mekelle University",
//   "Millennium Institute of Leadership and Governance",
//   "Nekemte University",
//   "New Hope University College",
//   "Rift Valley University College",
//   "Saint Mary's University",
//   "Selam University",
//   "St. Paul's University College",
//   "Unity University",
//   "Wako University",
//   "Woldia University",

//   // Colleges
//   "Asbeha Technical College",
//   "Awassa College of Agriculture",
//   "Babur Technical College",
//   "Debre Birhan Polytechnic College",
//   "Debub University - College of Law",
//   "Dire Dawa Polytechnic College",
//   "Ethiopia Institute of Public Administration & Development",
//   "Gambella College of Teacher Education",
//   "Gondar College of Education",
//   "Haramaya University - College of Education",
//   "Hawassa College of Technology",
//   "Jigjiga Polytechnic College",
//   "Jimma College of Agriculture",
//   "Mekelle College of Technology",
//   "Nekemte College of Teacher Education",
//   "Shoa College of Agriculture",
//   "Wondo Genet Agriculture College",
// ];

// interface Step2Props {
//   form: FormInstance<any>;
//   prevStep: () => void;
//   nextStep: () => void;
//   handleFormData: (data: any) => void;
// }

// const DegreeFields: React.FC<{ degreeName: string; index: number }> = ({
//   degreeName,
//   index,
// }) => (
//   <div>
//     <h2>
//       {degreeName} {index + 1}
//     </h2>
//     <Row gutter={16}>
//       <Col span={8}>
//         <Form.Item
//           label="Graduation Year"
//           name={["education", degreeName, index, "graduationYear"]}
//         >
//           <Input placeholder="Enter Graduation Year" />
//         </Form.Item>
//       </Col>
//       <Col span={8}>
//         <Form.Item
//           label="Field of Study"
//           name={["education", degreeName, index, "fieldOfStudy"]}
//         >
//           <Input placeholder="Enter Field of Study" />
//         </Form.Item>
//       </Col>
//       <Col span={8}>
//         <Form.Item
//           label="University Name"
//           name={["education", degreeName, index, "universityName"]}
//         >
//           <AutoComplete
//             options={universitiesInEthiopia.map((university) => ({
//               value: university,
//             }))}
//             filterOption={(inputValue, option) =>
//               option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
//               -1
//             }
//             placeholder="Enter University Name"
//           />
//         </Form.Item>
//       </Col>
//     </Row>
//   </div>
// );

// const Step2: React.FC<Step2Props> = ({
//   form,
//   nextStep,
//   prevStep,
//   handleFormData,
// }) => {
//   const [region, setRegion] = useState<string | null>(null);
//   const [subcity, setSubcity] = useState<string | null>(null);
//   const [woreda, setWoreda] = useState<string | null>(null);

//   // Reset subcity and woreda when region changes
//   useEffect(() => {
//     if (region) {
//       const subcities = Object.keys(data[region]);
//       const firstSubcity = subcities[0];
//       setSubcity(firstSubcity);
//       form.setFieldsValue({ birthplaceInfo: { subcity: firstSubcity } });

//       const woredas = data[region][firstSubcity];
//       const firstWoreda = woredas[0];
//       setWoreda(firstWoreda);
//       form.setFieldsValue({
//         birthplaceInfo: { woreda: firstWoreda  },
//       });
//     }
//   }, [region]);

//   useEffect(() => {
//     if (region && subcity) {
//       const woredas = data[region][subcity];
//       const firstWoreda = woredas[0];
//       setWoreda(firstWoreda);
//       form.setFieldsValue({ birthplaceInfo: { woreda: firstWoreda } });
//     }
//   }, [subcity]);

//   const handleRegionChange = (value: string) => {
//     setRegion(value);
//   };

//   const handleSubcityChange = (value: string) => {
//     setSubcity(value);
//   };
//   const [educationLevel, setEducationLevel] = useState<Level | "">("");
//   const [degrees, setDegrees] = useState<Degrees>({
//     bachelor: [{ id: 1 }],
//     master: [{ id: 1 }],
//     phd: [{ id: 1 }],
//   });

//   const addDegree = (level: Level) => {
//     const id = degrees[level][degrees[level].length - 1].id + 1;
//     setDegrees({ ...degrees, [level]: [...degrees[level], { id }] });
//   };
//   useEffect(() => {
//     setDegrees({
//       bachelor: [{ id: 1 }],
//       master: [{ id: 1 }],
//       phd: [{ id: 1 }],
//     });
//   }, [educationLevel]);

//   const removeDegree = (level: Level) => {
//     const newDegrees = degrees[level].slice(0, -1);
//     setDegrees({ ...degrees, [level]: newDegrees });
//   };


//   const onFinish = () => {
//     const values = form.getFieldsValue(true);
//     handleFormData(values);
//     nextStep();
//   };

//   return (
//     <>
//       <Form.Item
//         label="Salary"
//         name="salary"
//         rules={[{ required: true, message: "Please enter the salary" }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item label="Select Education Level" name="educationLevel">
//         <Select onChange={(value) => setEducationLevel(value)}>
//           <Option value="10grade">10th Grade</Option>
//           <Option value="twelfth">12th Grade</Option>
//           <Option value="tvet">TVET</Option>
//           <Option value="diploma">Diploma</Option>
//           <Option value="bachelor">Bachelor's Degree</Option>
//           <Option value="master">Master's Degree</Option>
//           <Option value="phd">PhD</Option>
//         </Select>
//       </Form.Item>

//       {(["bachelor", "master", "phd"] as Level[]).map((level) =>
//         degrees[level].map(
//           (degree, index) =>
//             educationLevel === level && (
//               <DegreeFields
//                 degreeName={level.charAt(0).toUpperCase() + level.slice(1)}
//                 index={index}
//                 key={degree.id}
//               />
//             )
//         )
//       )}

//       {(["bachelor", "master", "phd"] as Level[]).map(
//         (level) =>
//           educationLevel === level && (
//             <>
//               <Button type="dashed" onClick={() => addDegree(level)}>
//                 Add Another {level.charAt(0).toUpperCase() + level.slice(1)}'s
//                 Degree
//               </Button>
//               {degrees[level].length > 1 && (
//                 <Button
//                   type="dashed"
//                   danger
//                   onClick={() => removeDegree(level)}
//                 >
//                   Remove Last {level.charAt(0).toUpperCase() + level.slice(1)}'s
//                   Degree
//                 </Button>
//               )}
//             </>
//           )
//       )}

//       <Form.Item
//         label={
//           <span style={{ fontWeight: "bold", fontSize: "16px" }}>
//             Birthplace Information
//           </span>
//         }
//       >
//         {/* Sub-form for Birthplace Information */}
//         <>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="Region" name={["birthplaceInfo", "region"]}>
//                 <Select
//                   options={Object.keys(data).map((region) => ({
//                     label: region,
//                     value: region,
//                   }))}
//                   onChange={handleRegionChange}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Zone/Subcity"
//                 name={["birthplaceInfo", "subcity"]}
//               >
//                 <Select
//                   options={
//                     region
//                       ? Object.keys(data[region]).map((subcity) => ({
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
//           </Row>

//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item label="Woreda" name={["birthplaceInfo", "woreda"]}>
//                 <Select
//                   options={
//                     region && subcity
//                       ? data[region][subcity].map((woreda) => ({
//                           label: woreda,
//                           value: woreda,
//                         }))
//                       : []
//                   }
//                   value={woreda}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 label="House Number"
//                 name={["birthplaceInfo", "houseNumber"]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 label="Leyu Bota"
//                 name={["birthplaceInfo", "leyuBota"]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//           </Row>
//         </>
//       </Form.Item>

//       <Title level={4}>Mother's Information</Title>
//       <Row gutter={16}>
//         <Col span={8}>
//           <Form.Item
//             label="Mother's First Name"
//             name={["motherInformation", "firstName"]}
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter your mother's first name",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col span={8}>
//           <Form.Item
//             label="Mother's Middle Name"
//             name={["motherInformation", "middleName"]}
//             // rules={[
//             //   {
//             //     required: true,
//             //     message: "Please enter your mother's middle name",
//             //   },
//             // ]}
//           >
//             <Input />
//           </Form.Item>
//         </Col>
//         <Col span={8}>
//           <Form.Item
//             label="Mother's Last Name"
//             name={["motherInformation", "lastName"]}
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter your mother's last name",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={16}>
//         <Col span={12}>
//           {/* Input Group for Phone Number */}
//           <Form.Item
//             label="Mother's Phone Number"
//             name={["motherInformation", "phoneNumber"]}
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter your mother's phone number",
//               },
//             ]}
//           >
//             <Input.Group compact>
//               {/* Ethiopian country code */}
//               <Form.Item
//                 name={["motherInformation", "phoneNumber", "prefix"]}
//                 noStyle
//                 initialValue="+251"
//               >
//                 <Input style={{ width: "20%" }} readOnly />
//               </Form.Item>
//               {/* Phone number input */}
//               <Form.Item
//                 name={["motherInformation", "phoneNumber", "number"]}
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
//       </Row>

//       <Space>
//         <Button
//           type="primary"
//           onClick={prevStep}
//           style={{ background: "#1890ff", borderColor: "#1890ff" }}
//         >
//           Previous
//         </Button>
//         <Button
//           type="primary"
//           onClick={onFinish}
//           style={{ background: "#1890ff", borderColor: "#1890ff" }}
//         >
//           Next
//         </Button>
//       </Space>
//     </>
//   );
// };

// export default Step2;


// Step2.tsx

// Step2.tsx
import { useFormContext } from 'react-hook-form';
import { required } from '../../utils/decorators/validators';

const Step2: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Salary & Education</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Salary Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">Salary:</label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('salary', { 
              validate: {
                required: required('Salary is required'),
                isNumber: (value) => (!isNaN(value) ? true : 'Salary must be a number'),
                min: (value) => (value >= 1000 ? true : 'Salary must be at least 1000'),
              }
            })}
          />
          {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary?.message as string}</p>}
        </div>

        {/* Education Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">Education:</label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('education')}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
