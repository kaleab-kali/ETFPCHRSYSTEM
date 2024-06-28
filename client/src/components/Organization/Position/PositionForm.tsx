import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Button, message } from "antd";
import {PositionInfo} from "../../../../../shared/types/positionTypes"
import { useCreatePosition, useUpdatePosition } from "../../../services/mutations/positionMutation";


interface PositionFormProps {
    initialValues?: PositionInfo;
    visible: boolean;
    onCancel: () => void;
  }

const PositionForm:React.FC<PositionFormProps> = ({initialValues, visible, onCancel }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (initialValues) {
        form.setFieldsValue({
          posName: initialValues.posName,
          
        });
        console.log("Initial Values after edit dispaly:", initialValues);
      } else {
        form.resetFields();
      }
    }, [initialValues, form]);
    
    
    const createPositionMutation = useCreatePosition();
    const updatePositionrMutation = useUpdatePosition();
  
    const onFinish = async (values: any) => {
      try {
        await form.validateFields();
  
        const formData = new FormData();
        //position name
        formData.append("posName", values.posName);
  
        const positionInfo: PositionInfo = {
          posId: initialValues?.posId || "",
          posName: formData.get("posName") as string,
        };
  
        if (initialValues) {
          updatePositionrMutation.mutate(positionInfo);
          message.success("position updated successfully!");
        } else {
          createPositionMutation.mutate(positionInfo);
          console.log("Creating position:", positionInfo);
          message.success("position added successfully!");
        }
        form.resetFields();
        onCancel(); 
      } catch (error) {
        console.error("Validation failed:", error);
      }
    };
  
    return (
      <Modal
        title={initialValues ? "Edit Position" : "Add Position"}
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
          <Row gutter={16}>
            <Col span={12}>
              {/* position name */}
                <Form.Item
                    name="posName"
                    label="Position Name"
                    rules={[{ required: true, message: "Please enter position name" }]}
                >   
                    <Input />
                </Form.Item>
            </Col>
        
          </Row>
  
          <Form.Item>
            <Button type="primary" htmlType="submit">
            {initialValues ? "Update Position" : "Add Position"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
}

export default PositionForm