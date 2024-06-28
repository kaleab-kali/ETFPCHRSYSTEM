import React, { useState } from "react";
import { Button,} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import TitlesForm from "./TitlesForm";

const AddTitles = () => {
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
          Add Title
        </Button>
        <TitlesForm visible={visible} onCancel={handleCancel} />
      </>
    );
}

export default AddTitles