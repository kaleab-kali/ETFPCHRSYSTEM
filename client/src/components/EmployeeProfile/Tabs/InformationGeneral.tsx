import { Card, Typography, Row, Col } from "antd";
import React from "react";
import GeneralInfo from "../GeneralInformation/GeneralInfo";
import CurrentAdd from "../GeneralInformation/CurrentAdd";
import EmergencyContactInfo from "../GeneralInformation/EmergencyContactInfo";
import BirthPlaceInfo from "../GeneralInformation/BirthPlaceInfo";
import MotherIfno from "../GeneralInformation/MotherInfo";
import MartialInfo from "../GeneralInformation/MartialInfo";
import { Content } from "antd/es/layout/layout";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";

const { Title, Text } = Typography;

interface AddressInformationProps {
  data: {
    region: string;
    subcity: string;
    woreda: string;
    housenumber: string;
    camp: string;
    street: string;
  };
  title: string;
}

interface InfoGeneral {
  selectedEmployee?: EmployeeData;
}
const InformationGeneral = ({ selectedEmployee }: InfoGeneral) => {
  //   const { birthday, department, gender, title, ethnicity, salary, status } = data;

  return (
    <>
      {/* <InfoCard /> */}
      <Content
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Card>
          <GeneralInfo selectedEmployee={selectedEmployee} />
        </Card>
        <Card>
          <CurrentAdd selectedEmployee={selectedEmployee} />
        </Card>
        <Card>
          <BirthPlaceInfo selectedEmployee={selectedEmployee} />
        </Card>
        <Card>
          <EmergencyContactInfo selectedEmployee={selectedEmployee} />
        </Card>
        <Card>
          <MotherIfno selectedEmployee={selectedEmployee} />
        </Card>
        <Card>
          <MartialInfo selectedEmployee={selectedEmployee} />
        </Card>
      </Content>
    </>
  );
};

export default InformationGeneral;