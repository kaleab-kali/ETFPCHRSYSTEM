import React, { useState } from "react";
import { Modal, Button,} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import PositionForm from "./PositionForm";

const AddPosition = () => {
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
          Add Position
        </Button>
        <PositionForm visible={visible} onCancel={handleCancel} />
      </>
    );

}

export default AddPosition