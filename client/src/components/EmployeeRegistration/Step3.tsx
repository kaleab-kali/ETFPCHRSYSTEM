// // Step3.tsx
// import React, { useEffect, useState } from "react";
// import { Form, Input, Select, Button, DatePicker, Space, Row, Col } from "antd";
// import { FormInstance } from "antd/lib/form";
// import { data } from "../../utils/data";
// const { Option } = Select;

// interface Step3Props {
//   form: FormInstance<any>;
//   prevStep: () => void;
//   handleFormData: (data: any) => void;
// }

// const Step3: React.FC<Step3Props> = ({ form, prevStep, handleFormData }) => {
//   // const [region, setRegion] = useState<string | null>(null);
//   // const [subcity, setSubcity] = useState<string | null>(null);
//   // const [woreda, setWoreda] = useState<string | null>(null);
//   const [address, setAddress] = useState<{
//     [key: string]: {
//       region: string | null;
//       subcity: string | null;
//       woreda: string | null;
//     };
//   }>({
//     spouseInfo: { region: null, subcity: null, woreda: null },
//     emergencyContact: { region: null, subcity: null, woreda: null },
//   });
//   const [maritalStatus, setMaritalStatus] = useState<string>("single");

//   // Reset subcity and woreda when region changes
//   // useEffect(() => {
//   //   if (region) {
//   //     const subcities = Object.keys(data[region]);
//   //     const firstSubcity = subcities[0];
//   //     setSubcity(firstSubcity);
//   //     form.setFieldsValue({
//   //       emergencyContact: { address: { subcity: firstSubcity } },
//   //     });
//   //     form.setFieldsValue({ spouseInfo: { address: { subcity: firstSubcity } } });

//   //     const woredas = data[region][firstSubcity];
//   //     const firstWoreda = woredas[0];
//   //     setWoreda(firstWoreda);
//   //     form.setFieldsValue({
//   //       emergencyContact: { address: { woreda: firstWoreda } },
//   //     });
//   //     form.setFieldsValue({ spouseInfo: { address: { woreda: firstWoreda } } });
//   //   }
//   // }, [region]);

//   // // Reset woreda when subcity changes
//   // useEffect(() => {
//   //   if (region && subcity) {
//   //     const woredas = data[region][subcity];
//   //     const firstWoreda = woredas[0];
//   //     setWoreda(firstWoreda);
//   //     form.setFieldsValue({
//   //       emergencyContact: { address: { woreda: firstWoreda } },
//   //     });
//   //     form.setFieldsValue({ spouseInfo: { address: { woreda: firstWoreda } } });
//   //   }
//   // }, [subcity]);

//   // const handleRegionChange = (value: string) => {
//   //   setRegion(value);
//   // };

//   // const handleSubcityChange = (value: string) => {
//   //   setSubcity(value);
//   // };

//   // Handlers for spouseInfo and emergencyContact
//   const handleAddressChange = (type: string, field: string, value: string) => {
//     setAddress((prevState) => ({
//       ...prevState,
//       [type]: {
//         ...prevState[type],
//         [field]: value,
//       },
//     }));
//   };
  
//   useEffect(() => {
//     Object.keys(address).forEach((type) => {
//       const { region, subcity } = address[type];

//       if (region) {
//         const subcities = Object.keys(data[region]);
//         const firstSubcity = subcities[0];
//         handleAddressChange(type, "subcity", firstSubcity);
//         form.setFieldsValue({ [type]: { address: { subcity: firstSubcity } } });
//       }

//       if (region && subcity) {
//         const woredas = data[region][subcity];
//         const firstWoreda = woredas[0];
//         handleAddressChange(type, "woreda", firstWoreda);
//         form.setFieldsValue({ [type]: { address: { woreda: firstWoreda } } });
//       }
//     });
//   }, [address]);
//   const handleMaritalStatusChange = (value: string) => {
//     setMaritalStatus(value);
//   };

//   return (
//     <>
//       <Form.Item
//         label={
//           <span style={{ fontWeight: "bold", fontSize: "16px" }}>
//             Emergency Contact Information
//           </span>
//         }
//       >
//         {/* Sub-form for Emergency Contact Information */}
//         <>
//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item
//                 label="First Name"
//                 name={["emergencyContact", "info", "firstName"]}
//                 rules={[
//                   { required: true, message: "Please enter the first name" },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 label="Middle Name"
//                 name={["emergencyContact", "info", "middleName"]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 label="Last Name"
//                 name={["emergencyContact", "info", "lastName"]}
//                 rules={[
//                   { required: true, message: "Please enter the last name" },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row gutter={16}>
//             <Col span={8}>
//               <Form.Item
//                 label="Relationship"
//                 name={["emergencyContact", "info", "relationship"]}
//                 rules={[
//                   { required: true, message: "Please select the relationship" },
//                 ]}
//               >
//                 <Select>
//                   <Option value="spouse">Spouse</Option>
//                   <Option value="sibling">Sibling</Option>
//                   <Option value="parent">Parent</Option>
//                   <Option value="other">Other</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 label="Phone Number"
//                 name={["emergencyContact", "info", "phoneNumber"]}
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please enter your phone number",
//                   },
//                   {
//                     pattern: /^[0-9]{10}$/,
//                     message: "Phone number must be exactly 9 digits",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <Form.Item
//                 label="Email"
//                 name={["emergencyContact", "info", "email"]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item
//             label={
//               <span style={{ fontWeight: "bold", fontSize: "16px" }}>
//                 Emergency Contact Addres
//               </span>
//             }
//           >
//             {/* Sub-form for Address */}
//             <>
//               <Row gutter={16}>
//                 <Col span={8}>
//                   <Form.Item
//                     label="Region"
//                     name={["emergencyContact", "address", "region"]}
//                   >
//                     <Select
//                       options={Object.keys(data).map((region) => ({
//                         label: region,
//                         value: region,
//                       }))}
//                       onChange={(value) =>
//                         handleAddressChange("emergencyContact", "region", value)
//                       }
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                   <Form.Item
//                     label="Zone/Subcity"
//                     name={["emergencyContact", "address", "subcity"]}
//                   >
//                     <Select
//                       options={
//                         data &&
//                         address["emergencyContact"].region &&
//                         data[address["emergencyContact"].region]
//                           ? Object.keys(
//                               data[address["emergencyContact"].region]
//                             ).map((subcity) => ({
//                               label: subcity,
//                               value: subcity,
//                             }))
//                           : []
//                       }
//                       onChange={(value) =>
//                         handleAddressChange(
//                           "emergencyContact",
//                           "subcity",
//                           value
//                         )
//                       }
//                       value={address["emergencyContact"].subcity}
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                   <Form.Item
//                     label="Woreda"
//                     name={["emergencyContact", "address", "woreda"]}
//                   >
//                     <Select
//                       options={
//                         data &&
//                         address["emergencyContact"].region &&
//                         address["emergencyContact"].subcity &&
//                         data[address["emergencyContact"].region][
//                           address["emergencyContact"].subcity
//                         ]
//                           ? data[address["emergencyContact"].region][
//                               address["emergencyContact"].subcity
//                             ].map((woreda) => ({
//                               label: woreda,
//                               value: woreda,
//                             }))
//                           : []
//                       }
//                       value={address["emergencyContact"].woreda}
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Row gutter={16}>
//                 <Col span={8}>
//                   <Form.Item
//                     label="House Number"
//                     name={["emergencyContact", "address", "houseNumber"]}
//                   >
//                     <Input />
//                   </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                   <Form.Item
//                     label="Leyu Bota"
//                     name={["emergencyContact", "address", "leyuBota"]}
//                   >
//                     <Input />
//                   </Form.Item>
//                 </Col>
//               </Row>
//             </>
//           </Form.Item>
//         </>
//       </Form.Item>

//       <Form.Item
//         label="Marital Status"
//         name="maritalStatus"
//         initialValue="single"
//       >
//         <Select onChange={handleMaritalStatusChange}>
//           <Option value="married">Married</Option>
//           <Option value="single">Single</Option>
//           <Option value="divorced">Divorced</Option>
//           <Option value="divorced">Widowed</Option>
//         </Select>
//       </Form.Item>

//       <Form.Item
//         noStyle
//         shouldUpdate={(prevValues, currentValues) =>
//           prevValues.maritalStatus !== currentValues.maritalStatus
//         }
//       >
//         {({ getFieldValue }) => {
//           const currentStatus = getFieldValue("maritalStatus");

//           return (
//             <>
//               {currentStatus === "married" && (
//                 <Form.Item label="Spouse Information" name="spouseInfo">
//                   <Row gutter={16}>
//                     <Col span={8}>
//                       <Form.Item
//                         label="First Name"
//                         name={["spouseInfo", "firstName"]}
//                       >
//                         <Input />
//                       </Form.Item>
//                     </Col>
//                     <Col span={8}>
//                       <Form.Item
//                         label="Middle Name"
//                         name={["spouseInfo", "middleName"]}
//                       >
//                         <Input />
//                       </Form.Item>
//                     </Col>
//                     <Col span={8}>
//                       <Form.Item
//                         label="Last Name"
//                         name={["spouseInfo", "lastName"]}
//                       >
//                         <Input />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                   <Row gutter={16}>
//                     <Col span={8}>
//                       <Form.Item
//                         label="Date of Birth"
//                         name={["spouseInfo", "dob"]}
//                       >
//                         <DatePicker style={{ width: "100%" }} />
//                       </Form.Item>
//                     </Col>
//                     <Col span={8}>
//                       <Form.Item
//                         label="Phone Number"
//                         name={["spouseInfo", "phoneNumber"]}
//                       >
//                         <Input />
//                       </Form.Item>
//                     </Col>
//                   </Row>

//                   <Form.Item
//                     label="Address"
//                     // name={["spouseInfo", "address", "currentAddress"]}
//                   >
//                     {/* Sub-form for Spouse Address */}
//                     <Row gutter={16}>
//                       <Col span={8}>
//                         <Form.Item
//                           label="Region"
//                           name={["spouseInfo", "address", "region"]}
//                         >
//                           <Select
//                             options={Object.keys(data).map((region) => ({
//                               label: region,
//                               value: region,
//                             }))}
//                             onChange={(value) =>
//                               handleAddressChange("spouseInfo", "region", value)
//                             }
//                           />
//                         </Form.Item>
//                       </Col>
//                       <Col span={8}>
//                         <Form.Item
//                           label="Subcity"
//                           name={["spouseInfo", "address", "subcity"]}
//                         >
//                           <Select
//                             options={
//                               address["spouseInfo"].region
//                                 ? Object.keys(
//                                     data[address["spouseInfo"].region]
//                                   ).map((subcity) => ({
//                                     label: subcity,
//                                     value: subcity,
//                                   }))
//                                 : []
//                             }
//                             onChange={(value) =>
//                               handleAddressChange(
//                                 "spouseInfo",
//                                 "subcity",
//                                 value
//                               )
//                             }
//                             // onChange={handleSubcityChange}
//                             value={address["spouseInfo"].subcity}
//                           />
//                         </Form.Item>
//                       </Col>
//                       <Col span={8}>
//                         <Form.Item
//                           label="Woreda"
//                           name={["spouseInfo", "address", "woreda"]}
//                         >
//                           <Select
//                             options={
//                               address["spouseInfo"].region &&
//                               address["spouseInfo"].subcity
//                                 ? data[address["spouseInfo"].region][
//                                     address["spouseInfo"].subcity
//                                   ].map((woreda) => ({
//                                     label: woreda,
//                                     value: woreda,
//                                   }))
//                                 : []
//                             }
//                             value={address["spouseInfo"].woreda}
//                           />
//                         </Form.Item>
//                       </Col>
//                     </Row>
//                   </Form.Item>
//                 </Form.Item>
//               )}

//               {currentStatus === "divorced" && (
//                 <Form.Item label="Divorced Information" name="divorcedInfo">
//                   <Row gutter={16}>
//                     <Col span={8}>
//                       <Form.Item
//                         label="Divorce Date"
//                         name={["divorcedInfo", "divorceDate"]}
//                       >
//                         <DatePicker style={{ width: "100%" }} />
//                       </Form.Item>
//                     </Col>
//                     {/* ... (add other divorced fields) */}
//                   </Row>
//                 </Form.Item>
//               )}
//             </>
//           );
//         }}
//       </Form.Item>

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
//           htmlType="submit"
//           style={{ background: "#1890ff", borderColor: "#1890ff" }}
//         >
//           Submit
//         </Button>
//       </Space>
//     </>
//   );
// };

// export default Step3;


// Step3.tsx
import { useFormContext } from 'react-hook-form';
import { required } from '../../utils/decorators/validators';

const Step3: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">Marital Status & Emergency Contact</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Marital Status Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">Marital Status:</label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('maritalStatus', { validate: required('Marital status is required') })}
          />
          {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus?.message as string}</p>}
        </div>

        {/* Emergency Contact Field */}
        <div className="form-group">
          <label className="block font-medium text-gray-700">Emergency Contact:</label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            {...register('emergencyContact', { validate: required('Emergency contact is required') })}
          />
          {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact?.message as string}</p>}
        </div>
      </div>
    </div>
  );
};

export default Step3;
