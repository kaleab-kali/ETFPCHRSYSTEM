import React from "react";
import { Form, Input, Button } from "antd";
import { FormInstance } from "antd/es/form";
import { useUpdateRoleDepartmentHead,  } from "../../../services/mutations/DepartmentMutationFixed";


const RoleChangeForm: React.FC = () => {
  const [form] = Form.useForm();

  const assigneHeadToDepartment = useUpdateRoleDepartmentHead();


  const handleFinish = (values: {
    employeeId: string;
    departmentId: string;
  }) => {
    console.log("Form Values:", values);
    assigneHeadToDepartment.mutate({
      employeeId: values.employeeId,
      departmentId: values.departmentId,
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
        label="Department ID"
        name="departmentId"
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

export default RoleChangeForm;
