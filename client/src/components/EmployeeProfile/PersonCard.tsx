import React, { useState } from 'react';
import { Card, Avatar, Typography, Button, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EmployeeData } from '../../../../shared/types/employeeTypes';
import { useFindEmployeeByEmpId } from '../../services/queries/employeeQueries';
import CommissionerGeneral from "../../assets/CommissionerGeneral.jpg";
import DeputyCommissioner from "../../assets/DeputyCommissioner.jpg";
import AssistantCommissioner from "../../assets/AssistantCommissioner.jpg";
import Commander from "../../assets/Commander.jpg";
import DeputyCommander from "../../assets/DeputyCommander.jpg";
import ChiefInspector from "../../assets/ChiefInspector.jpg";
import Inspector from "../../assets/Inspector.jpg";
import DeputyInspector from "../../assets/DeputyInspector.jpg";
import AssistantInspector from "../../assets/AssistantInspector.jpg";
import ChiefSergeant from "../../assets/ChiefSergeant.jpg";
import Sergeant from "../../assets/Sergeant.jpg";
import DeputySergeant from "../../assets/DeputySergeant.jpg";
import AssistantSergeant from "../../assets/AssistantSergeant.jpg";
const { Title, Text } = Typography;

interface Person {
  empId:string;
  firstName: string;
  lastName: string;
  position: string;
  status: string;
  email: string;
  number: string;
  address: EmployeeData;
  photo: string;
  avatar: string;
  role: string;
  manager?: string
  title: string;
}

const PersonCard: React.FC<Person> = ({ empId, firstName, lastName, position, status, address, photo, avatar, role, manager,title }) => {
  const [isEditing, setIsEditing] = useState(false);

  const findByEmployeeId = useFindEmployeeByEmpId(manager);
  console.log(findByEmployeeId.data);
  

  console.log("phtoto: " + photo)
  const handleAvatarClick = () => {
    setIsEditing(!isEditing);
  };

  const getImageSrc = (title: string) => {
    switch (title) {
      case "Commissioner General":
        return CommissionerGeneral;
      case "Deputy Commissioner":
        return DeputyCommissioner;
      case "Assistant Commissioner":
        return AssistantCommissioner;
      case "Commander":
        return Commander;
      case "Deputy Commander":
        return DeputyCommander;
      case "Chief Inspector":
        return ChiefInspector;
      case "Inspector":
        return Inspector;
      case "Deputy Inspector":
        return DeputyInspector;
      case "Assistant Inspector":
        return AssistantInspector;
      case "Chief Sergeant":
        return ChiefSergeant;
      case "Sergeant":
        return Sergeant;
      case "Deputy Sergeant":
        return DeputySergeant;
      case "Assistant Sergeant":
        return AssistantSergeant;
      default:
        return ""; // You can provide a default image or return an empty string
    }
  };


  return (
    <Card
      style={{
        width: 250,
        height: 500,
        flexShrink: 0,
        position: "sticky",
        top: "195px",
      }}
      title={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            size={94}
            src={`http://localhost:8000/${photo}`}
            alt="Employee"
            onClick={handleAvatarClick}
            style={{ marginTop: "20px" }}
          />
          {/* <Image src={`http://localhost:8000/uploads/${photo}` } alt="Employee"
            onClick={handleAvatarClick}
            style={{marginTop:"20px"}}/> */}
          {isEditing && <Button shape="circle" icon={<EditOutlined />} />}
          <Title style={{ fontSize: 16 }}>
            {title}{" "}</Title>
          <Title style={{ margin:"-20px" }}>
            {title && (
              <img
                src={getImageSrc(title)}
                alt={title}
                style={{ width: 25, height: 25, marginLeft: 8 }}
              />
            )}
          </Title>
          <Title level={4}>{firstName + " " + lastName}</Title>
          <Text type="secondary">{position}</Text>
          <Text type="secondary">{empId}</Text>
        </div>
      }
    >
      <Text type="secondary" style={{ marginTop: "0", marginBottom: "15px" }}>
        Status
      </Text>
      <Title level={5} style={{ marginTop: "0px" }}>
        {status}
      </Title>

      <Text type="secondary" style={{ marginTop: "0", marginBottom: "15px" }}>
        Manager
      </Text>
      <Title level={5} style={{ marginTop: "0px" }}>
        {findByEmployeeId.data?.firstName +
          " " +
          findByEmployeeId.data?.lastName}
      </Title>
    </Card>
  );
};

export default PersonCard;
