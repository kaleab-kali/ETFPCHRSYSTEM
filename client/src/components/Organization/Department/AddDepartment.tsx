import React, { useState } from "react";
import {  Button,} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import DepartmentForm from "./DepartmentForm";

const AddDepartment: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
      setVisible(true);
    };
  
    const handleCancel = () => {
      setVisible(false);
    };
  
    return (
      <>
        <Button
          type="primary"
          style={{ float: "right", marginBottom: "20px" }}
          icon={<PlusCircleOutlined />}
          onClick={showModal}
        >
          Add Department
        </Button>
        <DepartmentForm visible={visible} onCancel={handleCancel} />
      </>
    );
}

export default AddDepartment