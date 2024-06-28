import React, { useEffect } from "react";
import { Modal, Form, Input, Row, Col, Button, message } from "antd";
import { LeaveTypeInfo } from "../../../../../shared/types/leaveTypes";
import {
  useCreateLeaveType,
  useUpdateLeaveType,
} from "../../../services/mutations/LeaveTypeMutation";

interface LeaveTypeFormProps {
  initialValues?: LeaveTypeInfo;
  visible: boolean;
  onCancel: () => void;
}

const LeaveTypeForm: React.FC<LeaveTypeFormProps> = ({
  initialValues,
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        leaveType: initialValues.leaveType,
        credit: initialValues.credit,
      });
      console.log("Initial Values after edit dispaly:", initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const createLeaveTypeMutation = useCreateLeaveType();
  const updateLeaveTypeMutation = useUpdateLeaveType();

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();

      const formData = new FormData();
      formData.append("leaveType", values.leaveType);
      formData.append("credit", values.credit);

      const leavetypeInfo: LeaveTypeInfo = {
        _id: initialValues?._id || "",
        leaveType: formData.get("leaveType") as string,
        credit: formData.get("credit") as string,
      };

      if (initialValues) {
        updateLeaveTypeMutation.mutate(leavetypeInfo);
        message.success("LeaveType updated successfully!");
      } else {
        createLeaveTypeMutation.mutate(leavetypeInfo);
        console.log("Creating LeaveType:", leavetypeInfo);
        message.success("LeaveType added successfully!");
      }
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Leavetype" : "Add Leavetype"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="leaveType"
              label="Leave Type"
              rules={[
                { required: true, message: "Please enter the leaveType" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="credit" label="credit">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update Leave Type" : "Add Leave Type"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LeaveTypeForm;
