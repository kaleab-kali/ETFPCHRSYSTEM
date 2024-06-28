import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme } from "antd";
import BasicRegistrationInfoChange from "../../components/AdminDashboard/EmployeeManagement/BasicRegistrationInfoChange";
import AddressRegistrationInfoChange from "../../components/AdminDashboard/EmployeeManagement/AddressRegistrationInfoChange";
import EduactionRegistrationInfoChange from "../../components/AdminDashboard/EmployeeManagement/EduactionRegistrationInfoChange";
import WorkRoleRegistrationInfoChange from "../../components/AdminDashboard/EmployeeManagement/WorkRoleRegistrationInfoChange";

const { Content } = Layout;

const EmployeeInfoEditPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        Employee Registration Form Control Board
      </Title>
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: "5px 0px",
            minHeight: 480,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: "grid",
            gridTemplateColumns: "1fr 1fr", // Divide into two columns
            gridTemplateRows: "1fr 1fr", // Divide into two rows
            gap: "20px", // Gap between grid items
          }}
        >
          <div
            style={{
              gridColumn: "1 / span 1",
              gridRow: "1 / span 1",
              padding: "5px 20px",
              background: "#fff", // Card background color
              borderRadius: "10px", // Card border radius
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Card box shadow
            }}
          >
            <Title level={5} style={{ fontWeight: "bold" }}>
            
              Basic information Change
            </Title>
            <BasicRegistrationInfoChange />
            
          </div>
          <div style={{ gridColumn: "2 / span 1", gridRow: "1 / span 1",
            padding: "20px",
            background: "#fff", 
            borderRadius: "10px", 
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
           }}>
            <Title level={5} style={{ fontWeight: "bold" }}>
              {" "}
              Educational information Change
            </Title>
            <EduactionRegistrationInfoChange />
            
          </div>
          <div style={{ gridColumn: "1 / span 1", gridRow: "2 / span 1" ,
            padding: "20px",
            background: "#fff", 
            borderRadius: "10px", 
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}>
            <Title level={5} style={{ fontWeight: "bold" }}>
              {" "}
              Address information Change
            </Title>
            <AddressRegistrationInfoChange />
            
          </div>
          <div style={{ gridColumn: "2 / span 1", gridRow: "2 / span 1" ,
             padding: "5px 20px",
             background: "#fff", 
             borderRadius: "10px", 
             boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}>
            <Title level={5} style={{ fontWeight: "bold" }}>
              {" "}
              Work role information Change
            </Title>
            <WorkRoleRegistrationInfoChange />
            
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default EmployeeInfoEditPage;
