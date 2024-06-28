// EvaluationForm.tsx

import React, { useState } from "react";
import { Form, Input, Radio, Button, Row, Col } from "antd";

const EvaluationForm: React.FC = () => {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  const onFinish = (values: any) => {
    const evalFormData = {
      employeeId: values.employeeId,
      position: values.position,
      department: values.department,
      evaluationPeriod: values.evaluationPeriod,
      communication: values.communication,
      teamwork: values.teamwork,
      punctuality: values.punctuality,
      adaptability: values.adaptability,
      problemSolving: values.problemSolving,
      leadership: values.leadership,
      timeManagement: values.timeManagement,
      qualityOfWork: values.qualityOfWork,
      creativity: values.creativity,
      interpersonalSkills: values.interpersonalSkills,
    };

    console.log("Eval form data:", evalFormData);
    setSubmitted(true);
  };

  const ratingOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <Form
          layout={"vertical"}
          form={form}
          onFinish={onFinish}
          style={{ padding: "24px", background: "#fff" }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="employeeId" label="Employee ID">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="position" label="Position">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="department" label="Department">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item name="evaluationPeriod" label="Evaluation Period">
                <Radio.Group>
                  <Radio value="yearly">Yearly</Radio>
                  <Radio value="monthly">Monthly</Radio>
                  <Radio value="weekly">Weekly</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}></Col>
          </Row>

          <hr />

          <Row>
            <Col span={12}>
              {" "}
              <Form.Item name="communication" label="Communication Skills">
                <Radio.Group options={ratingOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="teamwork" label="Teamwork">
                <Radio.Group options={ratingOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              {" "}
              <Form.Item name="punctuality" label="Punctuality">
                <Radio.Group options={ratingOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item name="adaptability" label="Adaptability">
                <Radio.Group options={ratingOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name="problemSolving" label="Problem Solving">
                <Radio.Group options={ratingOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item name="leadership" label="Leadership">
                <Radio.Group options={ratingOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              {" "}
              <Form.Item name="timeManagement" label="Time Management">
                <Radio.Group options={ratingOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="qualityOfWork" label="Quality of Work">
                <Radio.Group options={ratingOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              {" "}
              <Form.Item name="creativity" label="Creativity">
                <Radio.Group options={ratingOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="interpersonalSkills"
                label="Interpersonal Skills"
              >
                <Radio.Group options={ratingOptions} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EvaluationForm;
