import { Col, Row, Typography, Card } from "antd";
// import Title from 'antd/es/typography/Title'
import React from "react";

const { Text, Title } = Typography;

interface AddressInformationProps {
  data?: {
    region: string;
    subcity: string;
    woreda: string;
    housenumber: string;
    camp: string;
    street: string;
  };
  title: string;
}

const InfoCard: React.FC<AddressInformationProps> = ({ data, title }) => {
  // const {
  //    region,subcity,woreda,housenumber,camp,street
  //   } = data;

  return (
    <>
      <Card title={<Title level={4}> {title}</Title>}>
        <Row gutter={16}>
          {/* First Column */}
          <Col span={8}>
            <Text
              type="secondary"
              style={{ marginTop: "0", marginBottom: "15px" }}
            >
              Title
            </Text>
            <Title level={5} style={{ marginTop: "0px" }}>
              doctor
            </Title>
          </Col>

          {/* Second Column */}
          <Col span={8}>
            <Text
              type="secondary"
              style={{ marginTop: "0", marginBottom: "15px" }}
            >
              Department
            </Text>
            <Title level={5} style={{ marginTop: "0px" }}>
              software
            </Title>
          </Col>

          {/* Third Column */}
          <Col span={8}>
            <Text
              type="secondary"
              style={{ marginTop: "0", marginBottom: "15px" }}
            >
              Gender
            </Text>
            <Title level={5} style={{ marginTop: "0px" }}>
              male
            </Title>
          </Col>
        </Row>
        {/* second row */}
        <Row gutter={16}>
          {/* First Column */}
          <Col span={8}>
            <Text
              type="secondary"
              style={{ marginTop: "0", marginBottom: "15px" }}
            >
              Birthday
            </Text>
            <Title level={5} style={{ marginTop: "0px" }}>
              birthday 15 16
            </Title>
          </Col>

          {/* Second Column */}
          <Col span={8}>
            <Text
              type="secondary"
              style={{ marginTop: "0", marginBottom: "15px" }}
            >
              Salary
            </Text>
            <Title level={5} style={{ marginTop: "0px" }}>
              65465
            </Title>
          </Col>

          {/* Third Column */}
          <Col span={8}>
            <Text
              type="secondary"
              style={{ marginTop: "0", marginBottom: "15px" }}
            >
              Ethnicity
            </Text>
            <Title level={5} style={{ marginTop: "0px" }}>
              Addis Ababa
            </Title>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default InfoCard;
