// import React, { useState } from "react";
// import { Button, Modal, Form, Input, Select } from "antd";

// const { Option } = Select;

// interface DataItem {
//   id: number;
//   name: string;
// }

// const BasicRegistrationInfoChange: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [form] = Form.useForm();
//   const [action, setAction] = useState<" "|"addTitle" | "editTitle" | "addEthnicity" | "editEthnicity">(" ");
//   const [titles, setTitles] = useState<DataItem[]>([
//     { id: 1, name: "Title 1" },
//     { id: 2, name: "Title 2" },
//     { id: 3, name: "Title 3" },
//   ]);
//   const [ethnicities, setEthnicities] = useState<DataItem[]>([
//     { id: 1, name: "Ethnicity 1" },
//     { id: 2, name: "Ethnicity 2" },
//     { id: 3, name: "Ethnicity 3" },
//   ]);

//   const showModal = () => {
//     setModalVisible(true);
//   };

//   const handleCancel = () => {
//     setModalVisible(false);
//   };

//   const handleFormSubmit = (values: any) => {
//     if (values.choice === "addTitle") {
//       const newTitle = values.newTitle;
//       setTitles([...titles, { id: titles.length + 1, name: newTitle }]);
//     } else if (values.choice === "editTitle") {
      
//       console.log("Selected title to edit:", values.existingTitle);
//     } else if (values.choice === "addEthnicity") {
//       const newEthnicity = values.newEthnicity;
//       setEthnicities([
//         ...ethnicities,
//         { id: ethnicities.length + 1, name: newEthnicity },
//       ]);
//     } else if (values.choice === "editEthnicity") {
//       // Perform edit action for ethnicity
//       console.log("Selected ethnicity to edit:", values.existingEthnicity);
//     }
//   };

//   const handleActionChange = (value: string) => {
//     setAction(value as any);
//     form.resetFields();
//   };

//   const handleDelete = (id: number, type: string) => {
//     if (type === "title") {
//       setTitles(titles.filter((item) => item.id !== id));
//     } else if (type === "ethnicity") {
//       setEthnicities(ethnicities.filter((item) => item.id !== id));
//     }
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={showModal}>
//         Add/Change Title or Ethnicity
//       </Button>
//       <Modal
//         title="Add/Change Title or Ethnicity"
//         visible={modalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form form={form} onFinish={handleFormSubmit} layout="vertical">
//           <Form.Item
//             name="choice"
//             label="Choose Action"
//             rules={[{ required: true, message: "Please select an action" }]}
//           >
//             <Select
//               placeholder="Select action"
//               onChange={(value) => handleActionChange(value)}
//             >
//               <Option value="addTitle">Add New Title</Option>
//               <Option value="editTitle">Edit Existing Title</Option>
//               <Option value="addEthnicity">Add New Ethnicity</Option>
//               <Option value="editEthnicity">Edit Existing Ethnicity</Option>
//             </Select>
//           </Form.Item>
//           {action === "addTitle" && (
//             <Form.Item
//               name="newTitle"
//               label="Enter Title"
//               rules={[{ required: true, message: "Please enter a title" }]}
//             >
//               <Input placeholder="Enter title" />
//             </Form.Item>
//           )}
//           {action === "editTitle" && (
//             <Form.Item
//               name="existingTitle"
//               label="Select Title to Edit"
//               rules={[{ required: true, message: "Please select a title" }]}
//             >
//               {titles.map((item) => (
//                 <div key={item.id} style={{ marginBottom: "5px" ,display:"flex" }}>
//                   <Input defaultValue={item.name} />
//                   <Button
//                     type="link"
//                     danger
//                     onClick={() => handleDelete(item.id, "title")}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               ))}
//             </Form.Item>
//           )}
//           {action === "addEthnicity" && (
//             <Form.Item
//               name="newEthnicity"
//               label="Enter Ethnicity"
//               rules={[{ required: true, message: "Please enter an ethnicity" }]}
//             >
//               <Input placeholder="Enter ethnicity" />
//             </Form.Item>
//           )}
//           {action === "editEthnicity" && (
//             <Form.Item
//               name="existingEthnicity"
//               label="Select Ethnicity to Edit"
//               rules={[{ required: true, message: "Please select an ethnicity" }]}
//             >
//               {ethnicities.map((item) => (
//                 <div key={item.id} style={{ marginBottom: "5px", display:"flex" }}>
//                   <Input defaultValue={item.name} />
//                   <Button
//                     type="link"
//                     danger
//                     onClick={() => handleDelete(item.id, "ethnicity")}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               ))}
//             </Form.Item>
//           )}
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default BasicRegistrationInfoChange;


import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";

const { Option } = Select;

interface DataItem {
  id: number;
  name: string;
}

const BasicRegistrationInfoChange: React.FC = () => {
  const [modalTitleVisible, setModalTitleVisible] = useState<boolean>(false);
  const [modalEthnicityVisible, setModalEthnicityVisible] = useState<boolean>(
    false
  );
  const [form] = Form.useForm();
  const [action, setAction] = useState<
    "" | "addTitle" | "editTitle" | "addEthnicity" | "editEthnicity"
  >("");
  const [titles, setTitles] = useState<DataItem[]>([
    { id: 1, name: "Title 1" },
    { id: 2, name: "Title 2" },
    { id: 3, name: "Title 3" },
  ]);
  const [ethnicities, setEthnicities] = useState<DataItem[]>([
    { id: 1, name: "Ethnicity 1" },
    { id: 2, name: "Ethnicity 2" },
    { id: 3, name: "Ethnicity 3" },
  ]);

  const handleTitleModalShow = () => {
    setModalTitleVisible(true);
  };

  const handleTitleModalCancel = () => {
    setModalTitleVisible(false);
  };

  const handleEthnicityModalShow = () => {
    setModalEthnicityVisible(true);
  };

  const handleEthnicityModalCancel = () => {
    setModalEthnicityVisible(false);
  };

  const handleFormSubmit = (values: any) => {
    if (values.choice === "addTitle") {
      const newTitle = values.newTitle;
      setTitles([...titles, { id: titles.length + 1, name: newTitle }]);
    } else if (values.choice === "editTitle") {
      
      console.log("Selected title to edit:", values.existingTitle);
    } else if (values.choice === "addEthnicity") {
      const newEthnicity = values.newEthnicity;
      setEthnicities([
        ...ethnicities,
        { id: ethnicities.length + 1, name: newEthnicity },
      ]);
    } else if (values.choice === "editEthnicity") {
      
      console.log("Selected ethnicity to edit:", values.existingEthnicity);
    }
  };

  const handleActionChange = (value: string) => {
    setAction(value as any);
    form.resetFields();
  };

  const handleDelete = (id: number, type: string) => {
    if (type === "title") {
      setTitles(titles.filter((item) => item.id !== id));
    } else if (type === "ethnicity") {
      setEthnicities(ethnicities.filter((item) => item.id !== id));
    }
  };

  return (
    <div>
      <div style={{marginTop: 20}}>
        <Button type="primary" onClick={handleTitleModalShow}>
          Add/Change Title
        </Button>
        <Button type="primary" onClick={handleEthnicityModalShow} style={{ marginLeft: '10px' }}>
          Add/Change Ethnicity
        </Button>
      </div>
      <Modal
        title="Add/Change Title"
        visible={modalTitleVisible}
        onCancel={handleTitleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="choice"
            label="Change Title"
            rules={[{ required: true, message: "Please select an action" }]}
          >
            <Select
              placeholder="Select action"
              onChange={(value) => handleActionChange(value)}
            >
              <Option value="addTitle">Add New Title</Option>
              <Option value="editTitle">Edit Existing Title</Option>
            </Select>
          </Form.Item>
          {action === "addTitle" && (
            <Form.Item
              name="newTitle"
              label="Enter Title"
              rules={[{ required: true, message: "Please enter a title" }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>
          )}
          {action === "editTitle" && (
            <Form.Item
              name="existingTitle"
              label="Select Title to Edit"
              rules={[{ required: true, message: "Please select a title" }]}
            >
              {titles.map((item) => (
                <div key={item.id} style={{ marginBottom: "5px",display:"flex" }}>
                  <Input defaultValue={item.name} />
                  <Button
                    type="link"
                    danger
                    onClick={() => handleDelete(item.id, "title")}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add/Change Ethnicity"
        visible={modalEthnicityVisible}
        onCancel={handleEthnicityModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="choice"
            label="Change Ethnicity"
            rules={[{ required: true, message: "Please select an action" }]}
          >
            <Select
              placeholder="Select action"
              onChange={(value) => handleActionChange(value)}
            >
              <Option value="addEthnicity">Add New Ethnicity</Option>
              <Option value="editEthnicity">Edit Existing Ethnicity</Option>
            </Select>
          </Form.Item>
          {action === "addEthnicity" && (
            <Form.Item
              name="newEthnicity"
              label="Enter Ethnicity"
              rules={[
                { required: true, message: "Please enter an ethnicity" },
              ]}
            >
              <Input placeholder="Enter ethnicity" />
            </Form.Item>
          )}
          {action === "editEthnicity" && (
            <Form.Item
              name="existingEthnicity"
              label="Select Ethnicity to Edit"
              rules={[
                { required: true, message: "Please select an ethnicity" },
              ]}
            >
              {ethnicities.map((item) => (
                <div key={item.id} style={{ marginBottom: "5px",display:"flex"  }}>
                  <Input defaultValue={item.name} />
                  <Button
                    type="link"
                    danger
                    onClick={() => handleDelete(item.id, "ethnicity")}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BasicRegistrationInfoChange;
