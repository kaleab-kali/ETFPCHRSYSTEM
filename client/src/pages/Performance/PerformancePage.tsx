import React from "react";
import EmployeeRegistrationForm from "../../components/EmployeeRegistration/EmployeeRegistrationForm";
import Title from "antd/lib/typography/Title";
import { Layout } from "antd";
import EvaluationForm from "../../components/Performance/EvaluationForm";
const { Content } = Layout;

const PerformancePage = () => {
  return (
    <>
      <Title level={4} style={{ padding: "10px 30px", marginBottom: "0", marginTop: 15 }}>
        Employee Evaluation Form
      </Title>
      <Layout>
        <Content>
          <div
            className="site-layout-background"
            style={{ padding: "0 24px", minHeight: 360}}
          >
          <EvaluationForm />
          </div>
        </Content>
      </Layout>
      {/* <EmployeeRegistrationForm /> */}
    </>
  );
};

export default PerformancePage;
