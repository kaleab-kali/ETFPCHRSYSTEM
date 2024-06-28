import React, { useState } from "react";
import { Modal, Button,} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import EducationInstitutionForm from "./EducationInstitutionForm";

const AddEducation = () => {
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
          Add Insituitons
        </Button>
        <EducationInstitutionForm visible={visible} onCancel={handleCancel} />
      </>
    );
}

export default AddEducation