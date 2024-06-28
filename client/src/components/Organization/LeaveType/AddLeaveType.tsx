import React, { useState } from "react";
import {  Button,} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import LeaveTypeForm from "./LeaveTypeForm";

const AddLeaveType = () => {
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
          Add LeaveType
        </Button>
        <LeaveTypeForm visible={visible} onCancel={handleCancel} />
      </>
    );
}

export default AddLeaveType