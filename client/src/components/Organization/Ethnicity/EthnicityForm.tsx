import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Button, message } from "antd";
import {EthnicityInfo} from "../../../../../shared/types/ethnicity"


interface EthnicityFormProps {
    initialValues?: EthnicityInfo;
    visible: boolean;
    onCancel: () => void;
  }

const EthnicityForm:React.FC<EthnicityFormProps> = ({initialValues, visible, onCancel }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (initialValues) {
        form.setFieldsValue({
          name: initialValues.ethnicityName,
          
        });
        console.log("Initial Values after edit dispaly:", initialValues);
      } else {
        form.resetFields();
      }
    }, [initialValues, form]);
    
    
    // const createDepartmentMutation = useCreateDepartment();
    // const updateDepartmentrMutation = useUpdateDepartment();
  
    const onFinish = async (values: any) => {
      try {
        await form.validateFields();
  
        const formData = new FormData();
        formData.append("ethnicityName", values.ethnicityName);
  
        const ethinicityInfo: EthnicityInfo = {
          ethnicityId: initialValues?.ethnicityId || "",
          ethnicityName: formData.get("ethnicityName") as string,
          
        };
  
        if (initialValues) {
        //   updateDepartmentMutation.mutate(departmentInfo);
          message.success("department updated successfully!");
        } else {
        //   createDepartmentMutation.mutate(departmentInfo);
          console.log("Creating department:", ethinicityInfo);
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
                name="ethnicityName"
                label="Ethnicity Name"
                rules={[{ required: true, message: "Please enter the name" }]}
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

export default EthnicityForm