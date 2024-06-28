import React, { useEffect } from "react";
import { Modal, Form, Input, Row, Col, Button, message } from "antd";
import { TitleInfo } from "../../../../../shared/types/titlesTypes";
import {
  useUpdateTitle,
  useCreateTitle,
} from "../../../services/mutations/titleMutation";

interface TitlesFormProps {
  initialValues?: TitleInfo;
  visible: boolean;
  onCancel: () => void;
}

const TitlesForm: React.FC<TitlesFormProps> = ({
  initialValues,
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.titleName,
      });
      console.log("Initial Values after edit dispaly:", initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const createTitleMutation = useCreateTitle();
  const updateTitleMutation = useUpdateTitle();

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();

      const formData = new FormData();
      formData.append("name", values.name);

      const titleInfo: TitleInfo = {
        //  _id: initialValues?._id || "",
        titleId: initialValues?.titleId || "",
        titleName: formData.get("name") as string,
      };

      if (initialValues) {
        updateTitleMutation.mutate(titleInfo);
        message.success("Title updated successfully!");
      } else {
        createTitleMutation.mutate(titleInfo);
        console.log("Creating Title:", titleInfo);
        message.success("Title added successfully!");
      }
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Title" : "Add Title"}
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
            {/* title name */}
            <Form.Item
              name="name"
              label="Title Name"
              rules={[{ required: true, message: "Title name is required" }]}
            >
              <Input placeholder="Enter Title Name" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update Title" : "Add Title"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TitlesForm;
