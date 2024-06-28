import React from 'react'
import {
  Button,
  theme,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UnAuthorized from "../../assets/unauthorized.jpg";


const { Header, Content, Footer } = Layout;
const UnauthorizedPage = () => {
    const navigate = useNavigate()
    const {logout}= useAuth()
    const handleLogin= ()=>{
        logout();
        navigate("/login")
    }
  return (
    <div>
      <Layout>
        <Content style={{ background: "white",}}>
            <Button size='large' onClick={handleLogin} style={{float:"right", marginRight:"50px", marginBottom:"50px", marginTop:"50px"}}>
               Back To Login
            </Button>
          <div
            style={{ background: "white", display:"flex", justifyContent:"center", alignItems: "center",marginTop:"50px", marginLeft:"100px"}}
          >
            <img src={UnAuthorized} alt="unauthorized Image" width={"50%"}/>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default UnauthorizedPage