import React from "react";
import { Form, Input, Button } from "antd";
// import { FormInstance } from "antd/es/form";
import { useAssignManagerToDepartment  } from "../../../services/mutations/DepartmentMutationFixed";


const AddManagerToDepartmentForm: React.FC = () => {
  const [form] = Form.useForm();

  const addManagerToDepartment = useAssignManagerToDepartment();


  const handleFinish = (values: {
    employeeId: string;
    departmentName: string;
  }) => {
    console.log("Form Values:", values);
    addManagerToDepartment.mutate({
      employeeId: values.employeeId,
      departmentName: values.departmentName,
    });
   
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Employee ID"
        name="employeeId"
        rules={[{ required: true, message: "Please enter the Employee ID" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Department Name"
        name="departmentName"
        rules={[{ required: true, message: "Please enter the Department ID" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Assign Department Head
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddManagerToDepartmentForm;
