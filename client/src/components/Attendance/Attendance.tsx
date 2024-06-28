import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, message, Card, Badge, ConfigProvider } from "antd";
import { useCreateCheckInAttendance, useCreateCheckOutAttendance } from "../../services/mutations/attendanceMutation";
import AttendanceGif from "../../assets/Time management.gif"
import Loader from "../Common/Loader";
import { useAuth } from "../../context/AuthContext";
const AttendanceForm: React.FC = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [formType, setFormType] = useState(""); // to track which form to display
  const checkIn = useCreateCheckInAttendance();
  const checkOut = useCreateCheckOutAttendance();
  const {user} = useAuth()
  // const {status}=checkOut
  const [loaderSpinners, setLoaderSpinners] = useState<boolean>(false);

  // useEffect(() => {
  //   if (checkIn.status === "pending" ) {
  //     setLoaderSpinners(true);
  //     // setEditCurrentAddModalVisible(!currentAddEditModalVisible);

  //     // showLoader();
  //   }
  //   if (checkIn.status ==="success") {
  //     setModalVisible(false);
  //     // setEditBirthDateModalVisible(!birthDateEditModalVisible);
  //     setLoaderSpinners(false);
  //     message.success("Checked In successfully!");
  //   }
  //   if (checkIn.status === "error") {
  //     setModalVisible(false);
  //     // setEditBirthDateModalVisible(!birthDateEditModalVisible);
  //     setLoaderSpinners(false);
  //     message.error("Checked In Failed!");
  //   }
  // }, [checkIn.status]);
    // useEffect(() => {
    //   if (checkOut.status === "pending") {
    //     setLoaderSpinners(true);
    //     // setEditCurrentAddModalVisible(!currentAddEditModalVisible);

    //     // showLoader();
    //   }
    //   if (checkOut.status === "success") {
    //     setModalVisible(false);
    //     // setEditBirthDateModalVisible(!birthDateEditModalVisible);
    //     setLoaderSpinners(false);
    //     message.success("Checked Out successfully!");
    //   }
    //   if (checkOut.status === "error") {
    //     setModalVisible(false);
    //     // setEditBirthDateModalVisible(!birthDateEditModalVisible);
    //     setLoaderSpinners(false);
    //     message.error("Checked Out Failed!");
    //   }
    // }, [checkOut.status]);
  let loading;
  const showCheckInForm = () => {
    checkIn.mutate(user?.employeeId);
    loading=checkIn.status
    setFormType("checkIn");
    setModalVisible(true);
  };

  const showCheckOutForm = () => {
    checkOut.mutate(user?.employeeId);
    loading = checkOut.status;

    setFormType("checkOut");
    setModalVisible(true);
  };

  const onFinish = async () => {
    if(formType === "checkIn") {
        checkIn.mutate(employeeId)
    console.log("onFinish check in" + employeeId )
    }
    if (formType === "checkOut") {
      checkOut.mutate(employeeId);
      console.log("onFinish check out" + employeeId);
    }
    // try {
    //   // Perform attendance recording logic here

    //   message.success("Attendance recorded successfully");
    //   setModalVisible(false); // Hide modal after recording attendance
    // } catch (error) {
    //   console.error("Error recording attendance:", error);
      // message.error("Failed to record attendance");
    // }
  };

  return (
    <div style={{ width: "90%", marginLeft: "50px", marginBottom: "10px" }}>
      <h2>Attendance</h2>
      <div
        style={{
          display: "flex",
          backgroundColor: "white",
          borderRadius: "10px",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <ConfigProvider
            theme={{
              components: {
                Card: {
                  headerBg: "lightblue",
                },
              },
            }}
          >
            <Card title="Check-In Instructions" style={{ color: "green" }}>
              <div style={{ marginBottom: "10px" }}>
                <Badge
                  status="processing"
                  text="Arrive at work before 9:00 AM."
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Badge
                  status="processing"
                  text="Scan your ID card at the entrance gate."
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Badge
                  status="processing"
                  text="Proceed to your designated work area."
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Badge
                  status="processing"
                  text="Open your workstation and start your tasks."
                />
              </div>
              <Button type="primary" loading={loading} onClick={showCheckInForm} size="large">
                Check In
              </Button>
            </Card>
            <Card title="Check-Out Instructions">
              <div style={{ marginBottom: "10px" }}>
                <Badge
                  status="processing"
                  text="Finish your tasks before leaving."
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Badge
                  status="processing"
                  text="Save your work and close applications."
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Badge status="processing" text="Turn off your workstation." />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Badge
                  status="processing"
                  text="Scan your ID card at the exit gate."
                />
              </div>
              <Button type="primary" loading={loading} onClick={showCheckOutForm} size="large">
                Check Out
              </Button>
            </Card>
          </ConfigProvider>
        </div>

        <div>
          <img
            src={AttendanceGif}
            alt="trip"
            width="400px"
            height="540px"
            style={{
              borderTopLeftRadius: "30px",
              borderBottomLeftRadius: "30px",
              marginTop: "4px",
            }}
          />
        </div>
      </div>

      {/* <Modal
        title={formType === "checkIn" ? "Check In" : "Check Out"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="Employee ID"
            name="employeeId"
            rules={[{ required: true, message: "Please enter employee ID" }]}
          >
            <Input onChange={(e) => setEmployeeId(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {formType === "checkIn" ? "Check In" : "Check Out"}
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
      <Loader value={loaderSpinners} />
    </div>
  );
};

export default AttendanceForm;
