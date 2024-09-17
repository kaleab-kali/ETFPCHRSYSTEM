import React from "react";
import EmployeeRegistrationForm from "../../components/EmployeeRegistration/EmployeeRegistrationForm";
import Title from "antd/lib/typography/Title";
import { Layout } from "antd";
import RegistrationForm from "../../components/EmployeeRegistration/RegistrationForm";
import EmployeeFirstRegistrationForm from "../../components/EmployeeRegistration/RegistrationForm";
 const { Content } = Layout;

const EmployeeRegistrationPage = () => {
  return (
    <>
      <Title level={4} style={{ padding: "10px 30px", marginBottom: "0", marginTop: 15 }}>
        Employee Registration Form
      </Title>
      <Layout>
        <Content>
          <div
            className="site-layout-background"
            style={{ padding: "0 24px", minHeight: 360}}
          >
            <EmployeeFirstRegistrationForm />
            {/* <EmployeeRegistrationForm /> */}
          </div>
        </Content>
      </Layout>
      {/* <EmployeeRegistrationForm /> */}
    </>
  );
};

export default EmployeeRegistrationPage;
