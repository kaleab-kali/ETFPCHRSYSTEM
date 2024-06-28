import React, { useState } from "react";
import { Modal, Button,} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import HolidaysForm from "./HolidaysForm";

const AddHolidays = () => {
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
          Add Holiday
        </Button>
        <HolidaysForm visible={visible} onCancel={handleCancel} />
      </>
    );
}

export default AddHolidays