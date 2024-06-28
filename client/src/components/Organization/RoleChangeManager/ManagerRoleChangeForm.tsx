import React from "react";
import { Form, Input, Button } from "antd";
import { FormInstance } from "antd/es/form";
import { useAssignManagerToEmployee } from "../../../services/mutations/DepartmentMutationFixed";

const ManagerRoleChangeForm: React.FC = () => {
  const [form] = Form.useForm();

  const assignManagerToEmployee = useAssignManagerToEmployee();

  const handleFinish = (values: {
    employeeId: string;
    managerId: string;
  }) => {
    console.log("Form Values:", values);
    assignManagerToEmployee.mutate({
      employeeId: values.employeeId,
      managerId: values.managerId,
    });
    // form.resetFields();
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
        label="Manager ID"
        name="managerId"
        rules={[{ required: true, message: "Please enter the Manager ID" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Assign Manager
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ManagerRoleChangeForm;
