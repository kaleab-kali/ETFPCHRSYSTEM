import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Button, message } from "antd";
import {DepartmentInfo} from "../../../../../shared/types/departmentTypes"
import { useCreateDepartment, useUpdateDepartment } from "../../../services/mutations/DepartmentMutationFixed";

interface DepartmentFormProps {
    initialValues?: DepartmentInfo;
    visible: boolean;
    onCancel: () => void;
  }
const DepartmentForm: React.FC<DepartmentFormProps> = ({initialValues, visible, onCancel }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (initialValues) {
        form.setFieldsValue({
          name: initialValues.departmentName,
          departmentHead: initialValues.departmentHead,
          
        });
        console.log("Initial Values after edit dispaly:", initialValues);
      } else {
        form.resetFields();
      }
    }, [initialValues, form]);
    
    
    const createDepartmentMutation = useCreateDepartment();
    const updateDepartmentMutation = useUpdateDepartment();
  
    const onFinish = async (values: any) => {
      try {
        await form.validateFields();
  
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("departmentHead", values.departmentHead);
  
        const departmentInfo: DepartmentInfo = {
          departmentID: initialValues?.departmentID || "",
          departmentName: formData.get("name") as string,
          departmentHead: formData.get("departmentHead") as string,
        };
  
        if (initialValues) {
          updateDepartmentMutation.mutate(departmentInfo);
          message.success("department updated successfully!");
        } else {
          createDepartmentMutation.mutate(departmentInfo);
          console.log("Creating department:", departmentInfo);
          message.success("department added successfully!");
        }
        form.resetFields();
        onCancel(); 
      } catch (error) {
        console.error("Validation failed:", error);
      }
    };
  
    return (
      <Modal
        title={initialValues ? "Edit Department" : "Add Department"}
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Department Name"
                rules={[{ required: true, message: "Please enter the name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="departmentHead"
                label="Department Head"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
  
          <Form.Item>
            <Button type="primary" htmlType="submit">
            {initialValues ? "Update Department" : "Add Department"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
}

export default DepartmentForm;