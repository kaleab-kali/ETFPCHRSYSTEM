import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Button, message } from "antd";
import {InstituteInfo} from "../../../../../shared/types/InstitutionTypes"
import { useCreateInstitution, useUpdateInstitution } from "../../../services/mutations/InstitutionMutation";



interface EducationalFormProps {
    initialValues?: InstituteInfo;
    visible: boolean;
    onCancel: () => void;
  }

const EducationInstitutionForm:React.FC<EducationalFormProps> = ({initialValues, visible, onCancel }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (initialValues) {
        form.setFieldsValue({
            institutionName: initialValues.instituteName,
            location: initialValues.location,
          
        });
        console.log("Initial Values after edit dispaly:", initialValues);
      } else {
        form.resetFields();
      }
    }, [initialValues, form]);
    
    
    const createInstitutionMutation = useCreateInstitution();
    const updateInstitutionMutation = useUpdateInstitution();
  
    const onFinish = async (values: any) => {
      try {
        await form.validateFields();
  
        const formData = new FormData();
        formData.append("name", values.institutionName);
        formData.append("location", values.location);
  
        const institueInfo: InstituteInfo = {
            instituteId: initialValues?.instituteId || "",
            instituteName: formData.get("name") as string,
            location: formData.get("location") as string,
        };
  
        if (initialValues) {
          updateInstitutionMutation.mutate(institueInfo);
          message.success("Institution updated successfully!");
        } else {
          createInstitutionMutation.mutate(institueInfo);
          console.log("Creating Institution:", institueInfo);
          message.success("Institution added successfully!");
        }
        form.resetFields();
        onCancel(); 
      } catch (error) {
        console.error("Validation failed:", error);
      }
    };
  
    return (
      <Modal
        title={initialValues ? "Edit Institution" : "Add Institution"}
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="institutionName"
                label="Institution Name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="location"
                    label="Location"
                >
                    <Input />
                </Form.Item>
            </Col>
          </Row>
  
          <Form.Item>
            <Button type="primary" htmlType="submit">
            {initialValues ? "Update Institution" : "Add Institution"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
}

export default EducationInstitutionForm