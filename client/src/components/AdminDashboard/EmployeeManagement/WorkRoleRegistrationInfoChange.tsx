// import React, { useState } from "react";
// import { Button, Modal, Form, Input, Select, FormInstance } from "antd";

// const { Option } = Select;

// interface DataItem {
// id: number;
// name: string;
// }

// const WorkRoleRegistrationInfoChange = () => {
// const [modalDepartmentVisible, setModalDepartmentVisible] = useState<boolean>(false);
// const [modalPositionVisible, setModalPositionVisible] = useState<boolean>(
// false
// );
// const [formDepartment] = Form.useForm(); // Separate form instance for department modal
// const [formPosition] = Form.useForm();
// const [action, setAction] = useState<
// | "addDepartment" | "editDepartment" | "addPosition" | "editPosition"
//   >("addDepartment");
//     const [departments, setDepartments] = useState<DataItem[]>([
//       { id: 1, name: "Department 1" },
//       { id: 2, name: "Department 2" },
//       { id: 3, name: "Department 3" },
//     ]);
//     const [positions, setEthnicities] = useState<DataItem[]>([
//       { id: 1, name: "Position 1" },
//       { id: 2, name: "Position 2" },
//       { id: 3, name: "Position 3" },
//     ]);

//     const handleDepartmentModalShow = () => {
//       setModalDepartmentVisible(true);
//     };

//     const handleDepartmentModalCancel = () => {
//       setModalDepartmentVisible(false);
//     };

//     const handlePositionModalShow = () => {
//       setModalPositionVisible(true);
//     };

//     const handlePositionModalCancel = () => {
//       setModalPositionVisible(false);
//     };

//     const handleFormSubmit = (values: any) => {
//       if (values.choice === "addDepartment") {
//         const newDepartment = values.newDepartment;
//         setDepartments([...departments, { id: departments.length + 1, name: newDepartment }]);
//       } else if (values.choice === "editDepartment") {

//         console.log("Selected Department to edit:", values.existingDepartment);
//       } else if (values.choice === "addPosition") {
//         const newPosition = values.newPosition;
//         setEthnicities([
//           ...positions,
//           { id: positions.length + 1, name: newPosition },
//         ]);
//       } else if (values.choice === "editPosition") {

//         console.log("Selected Position to edit:", values.existingPosition);
//       }
//     };

//     const handleActionChange = (value: string, formInstance: FormInstance) => {
//         setAction(value as any);
//         // formInstance.resetFields();
//       };

//     const handleDelete = (id: number, type: string) => {
//       if (type === "department") {
//         setDepartments(departments.filter((item) => item.id !== id));
//       } else if (type === "position") {
//         setEthnicities(positions.filter((item) => item.id !== id));
//       }
//     };

//     return (
//       <div>
//         <div style={{marginTop: 20}}>
//           <Button type="primary" onClick={handleDepartmentModalShow}>
//             Add/Change Department
//           </Button>
//           <Button type="primary" onClick={handlePositionModalShow} style={{ marginLeft: '10px' }}>
//             Add/Change Position
//           </Button>
//         </div>
//         <Modal
//           title="Add/Change Department"
//           visible={modalDepartmentVisible}
//           onCancel={handleDepartmentModalCancel}
//           footer={null}
//         >
//           <Form form={formDepartment} onFinish={handleFormSubmit} layout="vertical">
//             <Form.Item
//               name="choice"
//               label="Change Department"
//               rules={[{ required: true, message: "Please select an action" }]}
//             >
//               <Select
//                 placeholder="Select action"
//                 onChange={(value) => handleActionChange(value,formDepartment)}
//               >
//                 <Option value="addDepartment">Add New Department</Option>
//                 <Option value="editDepartment">Edit Existing Department</Option>
//               </Select>
//             </Form.Item>
//             {action === "addDepartment" && (
//               <Form.Item
//                 name="newDepartment"
//                 label="Enter Department"
//                 rules={[{ required: true, message: "Please enter a Department" }]}
//               >
//                 <Input placeholder="Enter Department" />
//               </Form.Item>
//             )}
//             {action === "editDepartment" && (
//               <Form.Item
//                 name="existingDepartment"
//                 label="Select Department to Edit"
//                 // rules={[{ required: true, message: "Please select a Department" }]}
//               >
//                 {departments.map((item) => (
//                   <div key={item.id} style={{ marginBottom: "5px",display:"flex"  }}>
//                     <Input defaultValue={item.name} />
//                     <Button
//                       type="link"
//                       danger
//                       onClick={() => handleDelete(item.id, "department")}
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 ))}
//               </Form.Item>
//             )}
//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>
//         <Modal
//           title="Add/Change Position"
//           visible={modalPositionVisible}
//           onCancel={handlePositionModalCancel}
//           footer={null}
//         >
//           <Form form={formPosition} onFinish={handleFormSubmit} layout="vertical">
//             <Form.Item
//               name="choice"
//               label="Change Position"
//               rules={[{ required: true, message: "Please select an action" }]}
//             >
//               <Select
//                 placeholder="Select action"
//                 onChange={(value) => handleActionChange(value,formPosition)}
//               >
//                 <Option value="addPosition">Add New Position</Option>
//                 <Option value="editPosition">Edit Existing Position</Option>
//               </Select>
//             </Form.Item>
//             {action === "addPosition" && (
//               <Form.Item
//                 name="newPosition"
//                 label="Enter Position"
//                 rules={[
//                   { required: true, message: "Please enter an Position" },
//                 ]}
//               >
//                 <Input placeholder="Enter Position" />
//               </Form.Item>
//             )}
//             {action === "editPosition" && (
//               <Form.Item
//                 name="existingPosition"
//                 label="Select Position to Edit"
//                 rules={[
//                   { required: true, message: "Please select an Position" },
//                 ]}
//               >
//                 {positions.map((item) => (
//                   <div key={item.id} style={{ marginBottom: "5px", display:"flex"  }}>
//                     <Input defaultValue={item.name} />
//                     <Button
//                       type="link"
//                       danger
//                       onClick={() => handleDelete(item.id, "position")}
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 ))}
//               </Form.Item>
//             )}
//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>
//     );
// }

// export default WorkRoleRegistrationInfoChange

//! :skdjasn========================================================================
// import React, { useState } from "react";
// import { Button, Modal, Form, Input, Select, Checkbox } from "antd";
// import { CheckboxChangeEvent } from 'antd/es/checkbox';

// const { Option } = Select;

// interface DataItem {
// id: number;
// name: string;
// }

// const WorkRoleRegistrationInfoChange = () => {
// const [modalDepartmentVisible, setModalDepartmentVisible] = useState<boolean>(false);
// const [modalPositionVisible, setModalPositionVisible] = useState<boolean>(false);
// const [formDepartment] = Form.useForm();
// const [formPosition] = Form.useForm();
// const [action, setAction] = useState<
// "" | "addDepartment" | "editDepartment" | "addPosition" | "editPosition"
// >("");
// const [departments, setDepartments] = useState<DataItem[]>([
// { id: 1, name: "Department 1" },
// { id: 2, name: "Department 2" },
// { id: 3, name: "Department 3" },
// ]);
// const [positions, setPositions] = useState<DataItem[]>([
// { id: 1, name: "Position 1" },
// { id: 2, name: "Position 2" },
// { id: 3, name: "Position 3" },
// ]);
// const [editableFields, setEditableFields] = useState<{ [key: string]: number }>({});
// const [editedValue, setEditedValue] = useState<string>("");

// const handleDepartmentModalShow = () => {
// setModalDepartmentVisible(true);
// };

// const handleDepartmentModalCancel = () => {
// setModalDepartmentVisible(false);
// };

// const handlePositionModalShow = () => {
// setModalPositionVisible(true);
// };

// const handlePositionModalCancel = () => {
// setModalPositionVisible(false);
// };

// const handleFormSubmit = (values: any) => {
// if (values.choice === "addDepartment") {
// const newDepartment = values.newDepartment;
// setDepartments([...departments, { id: departments.length + 1, name: newDepartment }]);
// } else if (values.choice === "editDepartment") {

// console.log("Selected Department to edit:", values.existingDepartment);
// } else if (values.choice === "addPosition") {
// const newPosition = values.newPosition;
// setPositions([...positions, { id: positions.length + 1, name: newPosition }]);
// } else if (values.choice === "editPosition") {
// console.log("Selected Position to edit:", values.existingPosition);
// }
// };

// const handleActionChange = (value: string, formInstance: any) => {
// setAction(value as any);
// // formInstance.resetFields();
// };

// const handleDelete = (id: number, type: string) => {
// if (type === "department") {
// setDepartments(departments.filter((item) => item.id !== id));
// } else if (type === "position") {
// setPositions(positions.filter((item) => item.id !== id));
// }
// };

// const handleCheckboxChange = (e: CheckboxChangeEvent, itemId: number, type: string) => {
// const { checked } = e.target;
// if (checked) {
// setEditableFields({ ...editableFields, [type]: itemId });
// } else {
// setEditableFields({});
// }
// };

// const isEditable = (itemId: number, type: string) => {
// return editableFields[type] === itemId;
// };

// const handleUpdate = (itemId: number, type: string) => {
// const updatedValue = editedValue.trim();
// if (type === "position") {
// const updatedPositions = positions.map((position) =>
// position.id === itemId ? { ...position, name: updatedValue } : position
// );
// setPositions(updatedPositions);
// }
// };

// return (
// <div>
// <div style={{marginTop: 20}}>
// <Button type="primary" onClick={handleDepartmentModalShow}>
// Add/Change Department
// </Button>
// <Button type="primary" onClick={handlePositionModalShow} style={{ marginLeft: '10px' }}>
// Add/Change Position
// </Button>
// </div>
// <Modal
// title="Add/Change Department"
// visible={modalDepartmentVisible}
// onCancel={handleDepartmentModalCancel}
// footer={null}
// >
// <Form form={formDepartment} onFinish={handleFormSubmit} layout="vertical">
// <Form.Item
// name="choice"
// label="Change Department"
// rules={[{ required: true, message: "Please select an action" }]}
// >
// <Select
// placeholder="Select action"
// onChange={(value) => handleActionChange(value, formDepartment)}
// >
// <Option value="addDepartment">Add New Department</Option>
// <Option value="editDepartment">Edit Existing Department</Option>
// </Select>
// </Form.Item>
// {action === "addDepartment" && (
// <Form.Item
// name="newDepartment"
// label="Enter Department"
// rules={[{ required: true, message: "Please enter a Department" }]}
// >
// <Input placeholder="Enter Department" />
// </Form.Item>
// )}
// {action === "editDepartment" && (
// <Form.Item
// name="existingDepartment"
// label="Select Department to Edit"
// // rules={[{ required: true, message: "Please select a Department" }]}
// >
// {departments.map((item) => (
// <div key={item.id} style={{ marginBottom: "5px", display: "flex" }}>
// <Checkbox
// checked={isEditable(item.id, "department")}
// onChange={(e) => handleCheckboxChange(e, item.id, "department")}
// />
// <Input defaultValue={item.name} disabled={!isEditable(item.id, "department")} />
// <Button
// type="link"
// danger
// onClick={() => handleDelete(item.id, "department")}
// >
// Delete
// </Button>
// </div>
// ))}
// </Form.Item>
// )}
// <Form.Item>
// <Button type="primary" htmlType="submit">
// Submit
// </Button>
// </Form.Item>
// </Form>
// </Modal>
// <Modal
// title="Add/Change Position"
// visible={modalPositionVisible}
// onCancel={handlePositionModalCancel}
// footer={null}
// >
// <Form form={formPosition} onFinish={handleFormSubmit} layout="vertical">
// <Form.Item
// name="choice"
// label="Change Position"
// rules={[{ required: true, message: "Please select an action" }]}
// >
// <Select
// placeholder="Select action"
// onChange={(value) => handleActionChange(value, formPosition)}
// >
// <Option value="addPosition">Add New Position</Option>
// <Option value="editPosition">Edit Existing Position</Option>
// </Select>
// </Form.Item>
// {action === "addPosition" && (
// <Form.Item
// name="newPosition"
// label="Enter Position"
// rules={[
// { required: true, message: "Please enter an Position" },
// ]}
// >
// <Input placeholder="Enter Position" />
// </Form.Item>
// )}
// {action === "editPosition" && (
// <Form.Item
// name="existingPosition"
// label="Select Position to Edit"
// rules={[
// { required: true, message: "Please select an Position" },
// ]}
// >
// {positions.map((item) => (
// <div key={item.id} style={{ marginBottom: "5px", display: "flex" }}>
// <Checkbox
// checked={isEditable(item.id, "position")}
// onChange={(e) => handleCheckboxChange(e, item.id, "position")}
// />
// <Input defaultValue={item.name} disabled={!isEditable(item.id, "position")} />
// <Button
// type="link"
// danger
// onClick={() => handleDelete(item.id, "position")}
// >
// Delete
// </Button>
// </div>
// ))}
// </Form.Item>
// )}
// <Form.Item>
// <Button type="primary" htmlType="submit">
// Submit
// </Button>
// </Form.Item>
// </Form>
// </Modal>
// </div>
// );
// }

// export default WorkRoleRegistrationInfoChange;

import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
const { Option } = Select;

interface DataItem {
  id: number;
  name: string;
}
const initialDepartments: DataItem[] = [
  { id: 1, name: "Department 1" },
  { id: 2, name: "Department 2" },
  { id: 3, name: "Department 3" },
];

const initialPositions: DataItem[] = [
  { id: 1, name: "Position 1" },
  { id: 2, name: "Position 2" },
  { id: 3, name: "Position 3" },
];

const WorkRoleRegistrationInfoChange = () => {
  const [modalDepartmentVisible, setModalDepartmentVisible] =
    useState<boolean>(false);
  const [modalPositionVisible, setModalPositionVisible] =
    useState<boolean>(false);
  const [formDepartment] = Form.useForm();
  const [formPosition] = Form.useForm();
  const [action, setAction] = useState<
    "addDepartment" | "editDepartment" | "addPosition" | "editPosition"
  >("addDepartment");
  const [departments, setDepartments] =
    useState<DataItem[]>(initialDepartments);
  const [positions, setPositions] = useState<DataItem[]>(initialPositions);
  const [editableId, setEditableId] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");

  const handleDepartmentModalShow = () => {
    setModalDepartmentVisible(true);
  };

  const handleDepartmentModalCancel = () => {
    setModalDepartmentVisible(false);
    setEditableId(null); // Reset editable state
  };

  const handlePositionModalShow = () => {
    setModalPositionVisible(true);
  };

  const handlePositionModalCancel = () => {
    setModalPositionVisible(false);
    setEditableId(null); // Reset editable state
  };

  const handleFormSubmit = (values: any) => {
    if (values.choice === "addDepartment") {
      const newDepartment = values.newDepartment;
      setDepartments([
        ...departments,
        { id: departments.length + 1, name: newDepartment },
      ]);
    } else if (values.choice === "addPosition") {
      const newPosition = values.newPosition;
      setPositions([
        ...positions,
        { id: positions.length + 1, name: newPosition },
      ]);
    } else {
      console.error("Position to edit not found");
    }
    setModalDepartmentVisible(false);
    setEditableId(null); // Reset editable state after successful edit
  };

  const handleActionChange = (value: string) => {
    setAction(value as any);
    setEditableId(null); // Reset editable state on action change
  };

  const handleDelete = (id: number, type: string) => {
    if (type === "department") {
      setDepartments(departments.filter((item) => item.id !== id));
    } else if (type === "position") {
      setPositions(positions.filter((item) => item.id !== id));
    }
  };

  const handleCheckboxChange = (
    e: CheckboxChangeEvent,
    itemId: number,
    type: string
  ) => {
    const { checked } = e.target;
    setEditableId(checked ? itemId : null);
  };
  const handleUpdate = () => {
    if (editableId !== null && editedValue.trim()) {
      const updatedValue = editedValue.trim();

      if (action === "editDepartment") {
        const updatedDepartmentIndex = departments.findIndex(
          (item) => item.id === editableId
        );
        if (updatedDepartmentIndex !== -1) {
          const updatedDepartments = [...departments];
          updatedDepartments[updatedDepartmentIndex].name = updatedValue;
          console.log(updatedDepartments);
          setDepartments(updatedDepartments);
        } else {
          console.error("Department to edit not found");
        }
      } else if (action === "editPosition") {
        const updatedPositionIndex = positions.findIndex(
          (item) => item.id === editableId
        );
        if (updatedPositionIndex !== -1) {
          const updatedPositions = [...positions];
          updatedPositions[updatedPositionIndex].name = updatedValue;
          setPositions(updatedPositions);
        } else {
          console.error("Position to edit not found");
        }
      }

      setEditableId(null); // Reset editable state after successful update
      setEditedValue(""); // Clear edited value
    } else {
      console.warn("No item selected or no value entered for update.");
    }
  };

  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <Button type="primary" onClick={handleDepartmentModalShow}>
          Add/Change Department
        </Button>
        <Button
          type="primary"
          onClick={handlePositionModalShow}
          style={{ marginLeft: "10px" }}
        >
          Add/Change Position
        </Button>
      </div>
      <Modal
        title="Add/Change Department"
        visible={modalDepartmentVisible}
        onCancel={handleDepartmentModalCancel}
        footer={null}
      >
        <Form
          form={formDepartment}
          onFinish={handleFormSubmit}
          layout="vertical"
        >
          <Form.Item
            name="choice"
            label="Change Department"
            rules={[{ required: true, message: "Please select an action" }]}
          >
            <Select placeholder="Select action" onChange={handleActionChange}>
              <Option value="addDepartment">Add New Department</Option>
              <Option value="editDepartment">Edit Existing Department</Option>
            </Select>
          </Form.Item>
          {action === "addDepartment" && (
            <Form.Item
              name="newDepartment"
              label="Enter Department"
              rules={[{ required: true, message: "Please enter a Department" }]}
            >
              <Input placeholder="Enter Department" />
            </Form.Item>
          )}
          {action === "editDepartment" && (
            <Form.Item
              name="existingDepartment"
              label="Select Department to Edit"
              rules={[
                { required: true, message: "Please select a Department" },
              ]}
            >
              {departments.map((item) => (
                <div
                  key={item.id}
                  style={{ marginBottom: "5px", display: "flex", gap: "5px"}}
                >
                  <Checkbox
                    checked={editableId === item.id}
                    onChange={(e) =>
                      handleCheckboxChange(e, item.id, "department")
                    }
                  />
                  <Input
                    defaultValue={item.name}
                    disabled={!(editableId === item.id)}
                    onChange={(e) => setEditedValue(e.target.value)}
                  />
                  {editableId === item.id && (
                    <Button type="link" onClick={handleUpdate}>
                      Save
                    </Button>
                  )}
                  <Button
                    type="link"
                    danger
                    onClick={() => handleDelete(item.id, "department")}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </Form.Item>
          )}
          <Form.Item>
            {action !== "editDepartment" && (
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            )}
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add/Change Position"
        visible={modalPositionVisible}
        onCancel={handlePositionModalCancel}
        footer={null}
      >
        <Form form={formPosition} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="choice"
            label="Change Position"
            rules={[{ required: true, message: "Please select an action" }]}
          >
            <Select placeholder="Select action" onChange={handleActionChange}>
              <Option value="addPosition">Add New Position</Option>
              <Option value="editPosition">Edit Existing Position</Option>
            </Select>
          </Form.Item>
          {action === "addPosition" && (
            <Form.Item
              name="newPosition"
              label="Enter Position"
              rules={[{ required: true, message: "Please enter a Position" }]}
            >
              <Input placeholder="Enter Position" />
            </Form.Item>
          )}
          {action === "editPosition" && (
            <Form.Item
              name="existingPosition"
              label="Select Position to Edit"
              rules={[{ required: true, message: "Please select a Position" }]}
            >
              {positions.map((item) => (
                <div
                  key={item.id}
                  style={{ marginBottom: "5px", display: "flex" }}
                >
                  <Checkbox
                    checked={editableId === item.id}
                    onChange={(e) =>
                      handleCheckboxChange(e, item.id, "position")
                    }
                  >
                    {item.name}
                  </Checkbox>
                  {editableId === item.id && (
                    <Button type="link" onClick={handleUpdate}>
                      Save
                    </Button>
                  )}
                  <Button
                    type="link"
                    danger
                    onClick={() => handleDelete(item.id, "position")}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </Form.Item>
          )}
          <Form.Item>
            {action !== "editPosition" && (
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WorkRoleRegistrationInfoChange;
