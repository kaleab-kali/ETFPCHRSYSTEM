import React from 'react';
import { Form, Input, Button } from 'antd';

// Sample data for departments, positions, and form questions
const departments: string[] = ['Sales', 'Marketing', 'Engineering']; // Replace with your actual department data
const positions: string[] = ['Manager', 'Associate', 'Engineer']; // Replace with your actual position data

// Define your form questions here (customize as needed)
const formQuestions: Record<string, Record<string, { id: string; label: string; type: string }[]>> = {
  Sales: {
    Manager: [
      { id: 'sales_target', label: 'Sales Target', type: 'number' },
      // Add more questions specific to Sales Managers
    ],
    Associate: [
      // Questions for Sales Associates
    ],
  },
  Marketing: {
    // Questions for Marketing department
  },
  Engineering: {
    // Questions for Engineering department
  },
};

const DynamicForm: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>('');
  const [selectedPosition, setSelectedPosition] = React.useState<string>('');

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };

  const handlePositionChange = (value: string) => {
    setSelectedPosition(value);
  };

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // Handle form submission (e.g., send data to backend)
  };

  const renderFormFields = () => {
    if (!selectedDepartment || !selectedPosition) {
      return null;
    }

    const questions = formQuestions[selectedDepartment as keyof typeof formQuestions][selectedPosition as keyof typeof formQuestions[keyof typeof formQuestions]];

    return questions.map((question) => (
      <Form.Item key={question.id} name={question.id} label={question.label}>
        <Input />
      </Form.Item>
    ));
  };

  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item label="Department">
          <select onChange={(e) => handleDepartmentChange(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item label="Position">
          <select onChange={(e) => handlePositionChange(e.target.value)}>
            <option value="">Select Position</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </Form.Item>

        {renderFormFields()}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DynamicForm;
