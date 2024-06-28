import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Button, message } from "antd";
import {HolidayTypeInfo} from "../../../../../shared/types/HolidaysTypes"


interface HolidayFormProps {
    initialValues?: HolidayTypeInfo;
    visible: boolean;
    onCancel: () => void;
  }

const HolidaysForm: React.FC<HolidayFormProps> = ({initialValues, visible, onCancel }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (initialValues) {
        form.setFieldsValue({
            holidayName: initialValues.holidayName,
            holidayDate: initialValues.holidayDate,
          
        });
        console.log("Initial Values after edit dispaly:", initialValues);
      } else {
        form.resetFields();
      }
    }, [initialValues, form]);
    
    
    // const createDepartmentMutation = useCreateDepartment();
    // const updateDepartmentrMutation = useUpdateDepartment();
  
    const onFinish = async (values: any) => {
    //   try {
    //     await form.validateFields();
  
    //     const formData = new FormData();
    //     formData.append("holidayName", values.holidayName);
    //     formData.append("holidayDate", values.holidayDate);
  
    //     const holidayceInfo: HolidayTypeInfo = {
    //         holidayId: initialValues?.holidayId || "",
    //         holidayName: formData.get("holidayName") as string,
    //         holidayDate: new Date(formData.get("holidayDate") as string),
    //     };
  
    //     if (initialValues) {
    //     //   updateDepartmentMutation.mutate(departmentInfo);
    //       message.success("department updated successfully!");
    //     } else {
    //     //   createDepartmentMutation.mutate(departmentInfo);
    //       console.log("Creating department:", holidayceInfo);
    //       message.success("department added successfully!");
    //     }
    //     form.resetFields();
    //     onCancel(); 
    //   } catch (error) {
    //     console.error("Validation failed:", error);
    //   }
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
                    name="holidayName"
                    label="Holiday Name"
                    rules={[{ required: true, message: "Please enter holiday name" }]}
                ><Input />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="holidayDate"
                    label="Holiday Date"
                    rules={[{ required: true, message: "Please enter holiday date" }]}
                ><Input />
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

export default HolidaysForm