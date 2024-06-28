// import React, { useState, useEffect } from "react";
// import { Modal, Form, Input, Row, Col, Button, message } from "antd";
// import { RegionInfo, SubcityInfo, WoredaInfo } from "../../../../../shared/types/addressTypes";


// interface AddressFormProps {
//     initialValues?: RegionInfo | SubcityInfo | WoredaInfo;
//     visible: boolean;
//     onCancel: () => void;
// }

// const AddressForm: React.FC<AddressFormProps> = ({initialValues, visible, onCancel }) => {
//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (initialValues) {
//     //   form.setFieldsValue({
//     //     name: initialValues.name,
//     //     mobilenumber: initialValues.mobileNumber,
//     //     email: initialValues.email,
//     //     address: initialValues.address,
//     //   });
//       console.log("Initial Values after edit dispaly:", initialValues);
//     } else {
//       form.resetFields();
//     }
//   }, [initialValues, form]);
  
  
 

//   const onFinish = async (values: any) => {
//     try {
//       await form.validateFields();

//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("mobilenumber", values.mnumber);
//       formData.append("email", values.email);
//       formData.append("address", values.address);

//     //   const supplierInfo: SupplierInfo = {
//     //     sid: initialValues?.sid || "", 
//     //     name: formData.get("name") as string,
//     //     mobileNumber: formData.get("mobilenumber") as string,
//     //     email: formData.get("email") as string,
//     //     address: formData.get("address") as string,
//     //   };

//     //   if (initialValues) {
//     //     updateSupplierMutation.mutate(supplierInfo);
//     //     message.success("Supplier updated successfully!");
//     //   } else {
//     //     createSupplierMutation.mutate(supplierInfo);
//     //     console.log("Creating supplier:", supplierInfo);
//     //     message.success("Supplier added successfully!");
//     //   }
//       form.resetFields();
//       onCancel(); 
//     } catch (error) {
//       console.error("Validation failed:", error);
//     }
//   };

//   return (
//     <Modal
//       title={initialValues ? "Edit Supplier" : "Add Supplier"}
//       visible={visible}
//       onCancel={onCancel}
//       footer={null}
//     >
//       <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               name="regionName"
//               label="Region Name"
//               rules={[{ required: true, message: "Please enter the Region name" }]}
//             >
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="regionShort"
//               label="Region Abbrevation"
//               rules={[
//                 { required: true, message: "Please enter the region abbrevaiton" },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//           {initialValues ? "Update Regionr" : "Add Region"}
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default AddressForm;


import React, { useEffect } from "react";
import { Modal, Form, Input, Row, Col, Button } from "antd";
import { RegionInfo, SubcityInfo, WoredaInfo } from "../../../../../shared/types/addressTypes";

interface AddressFormProps {
  initialValues?: RegionInfo | SubcityInfo | WoredaInfo;
  visible: boolean;
  onCancel: () => void;
  addressType: string;
}

const AddressForm: React.FC<AddressFormProps> = ({ initialValues, visible, onCancel, addressType }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();
      // Process form values (e.g., send to backend)
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const renderFormFields = () => {
    switch (addressType) {
      case "Region":
        return (
          <>
            <Col span={12}>
              <Form.Item
                name="regionName"
                label="Region Name"
                rules={[{ required: true, message: "Please enter the Region name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="regionShort"
                label="Region Abbreviation"
                rules={[{ required: true, message: "Please enter the region abbreviation" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </>
        );
      case "Subcity":
        return (
          <>
            <Col span={12}>
              <Form.Item
                name="subcityName"
                label="Subcity Name"
                rules={[{ required: true, message: "Please enter the Subcity name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="subcityShort"
                label="Subcity Abbreviation"
                rules={[{ required: true, message: "Please enter the subcity abbreviation" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </>
        );
      case "Woreda":
        return (
          <>
            <Col span={12}>
              <Form.Item
                name="woredaName"
                label="Woreda Name"
                rules={[{ required: true, message: "Please enter the Woreda name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="woredaShort"
                label="Woreda Abbreviation"
              >
                <Input />
              </Form.Item>
            </Col>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title={initialValues ? `Edit ${addressType}` : `Add ${addressType}`}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
        <Row gutter={16}>
          {renderFormFields()}
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues ? `Update ${addressType}` : `Add ${addressType}`}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressForm;


