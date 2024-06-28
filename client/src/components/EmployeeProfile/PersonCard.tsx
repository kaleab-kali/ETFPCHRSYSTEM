import React, { useState } from 'react';
import { Card, Avatar, Typography, Button, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EmployeeData } from '../../../../shared/types/employeeTypes';
import { useFindEmployeeByEmpId } from '../../services/queries/employeeQueries';

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
}

const PersonCard: React.FC<Person> = ({ empId, firstName, lastName, position, status, address, photo, avatar, role, manager }) => {
  const [isEditing, setIsEditing] = useState(false);

  const findByEmployeeId = useFindEmployeeByEmpId(manager);
  console.log(findByEmployeeId.data);
  

  console.log("phtoto: " + photo)
  const handleAvatarClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Card
    style={{ width: 250 , height:500, flexShrink: 0, position:"sticky", top:"195px"}}
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
            style={{marginTop:"20px"}}
          />
          {/* <Image src={`http://localhost:8000/uploads/${photo}` } alt="Employee"
            onClick={handleAvatarClick}
            style={{marginTop:"20px"}}/> */}
          {isEditing && <Button shape="circle" icon={<EditOutlined />} />}
          <Title level={4}>{firstName + " " + lastName}</Title>
          <Text type="secondary">{position}</Text>
          <Text type="secondary">{empId}</Text>
        </div>
      }
    >
      <Text type="secondary" style={{marginTop:"0", marginBottom:"15px"}}>Status</Text>
      <Title level={5} style={{marginTop:"0px"}}>{status}</Title>

      <Text type="secondary" style={{marginTop:"0", marginBottom:"15px"}}>Manager</Text>
      <Title level={5} style={{marginTop:"0px"}}>{findByEmployeeId.data?.firstName + " " + findByEmployeeId.data?.lastName}</Title>
     
    </Card>
  );
};

export default PersonCard;