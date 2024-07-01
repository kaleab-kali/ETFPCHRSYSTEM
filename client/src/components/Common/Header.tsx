import React, { useEffect, useState } from "react";
import {
  Layout,
  Input,
  Avatar,
  Dropdown,
  Menu,
  Badge,
  Typography,
  Select,
  Modal,
  List,
  notification,
  Col,
  Row,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  BellOutlined,
  SettingOutlined,
  ProfileOutlined,
  LogoutOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../services/queries/notificationQueries";
import { useEmployeeProfile } from "../../services/queries/employeeProfileQueries";
import Highlighter from "react-highlight-words";
import "./Header.css"; // Import custom CSS file for additional styles
import Title from "antd/es/typography/Title";
import { HiCalendar } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const { Header: AntdHeader } = Layout;
const { Search } = Input;
const { Text } = Typography;
const { Option } = Select;

interface SearchResult {
  keyword: string;
  path: string;
  description: string;
}

const searchIndex: SearchResult[] = [
  { keyword: "profile", path: "/profile", description: "User profile page" },
  { keyword: "messages", path: "/messages", description: "User messages" },
  {
    keyword: "settings",
    path: "/settings",
    description: "Application settings",
  },
  // Add other keywords, paths, and descriptions here
];

const Header: React.FC = () => {
  const { t, i18n} = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { user, logout } = useAuth();
  const getNotification = useNotification(user?.ObjId);
  const employeeNotifications = getNotification.data;
  const unreadCount = employeeNotifications?.notifications.filter(
    (notification: { isRead: boolean }) => !notification.isRead
  ).length;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  // const {user}= useAuth()
  const employee = useEmployeeProfile();
  const profile = employee.data;
  const navigate = useNavigate();

  const showLogoutConfirm = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    handleLogout();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    logout();
    console.log("Logging out...");
  };

  useEffect(() => {
    console.log("Notifications:", employeeNotifications);
    const notifLength = employeeNotifications?.notifications.length;
    if (notifLength > 0) {
      const latestNotification =
        employeeNotifications.notifications[notifLength - 1];
      console.log("Latest Notification:", latestNotification);

      if (!latestNotification.isRead) {
        api.info({
          message: "New Notification",
          description: latestNotification.message,
          onClick: () => {
            if (user?.type==="hrstaffs") {
              navigate("/profile");
            }else{
              navigate("/messages");
            }
          },
          placement: "topRight", // Ensure the correct placement value
        });
      }
    }
  }, [unreadCount, api]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value.trim().length > 0) {
      const results: SearchResult[] = searchIndex.filter((item) =>
        item.keyword.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectSearchResult = (path: string) => {
    setSearchResults([]);
    navigate(path);
  };

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    console.log("Selected language:", value);
  };

  const ProfileMenu = (
    
    <Menu>
      {/* <Title level={5} style={{margin:0,}}>{user?.role}</Title> */}
      <Menu.Item key="profile" icon={<ProfileOutlined />}>
        {user?.role === "employee" ||
        user?.role === "manager" ||
        user?.role === "department head" ? (
          <>
            <NavLink to={`/employee/view/${user.ObjId}`}>Profile</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profile">Profile</NavLink>
          </>
        )}
      </Menu.Item>
      {user?.role === "employee" ||
      user?.role === "manager" ||
      user?.role === "department head" ? (
        <>
          <Menu.Item
            key="7"
            icon={<BellOutlined />}
            onClick={() => navigate("/messages")}
          >
            Messages
          </Menu.Item>
        </>
      ) : (
        <>
          {/* <Menu.Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item> */}
        </>
      )}
      <Menu.Item icon={<IoCalendarOutline size={15} />} key="calendar">
          <NavLink to="/calendar">Calendar</NavLink>
        </Menu.Item>

      <Menu.Divider />
      <Menu.Item key="5" icon={<LogoutOutlined />} onClick={showLogoutConfirm}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const notificationMenu = (
    <Menu className="notification-menu">
      {employeeNotifications?.notifications
        .slice(0, 3)
        .map((notification: any, index: any) => (
          <Menu.Item
            key={index}
            className="notification-item"
            onClick={() => {if (user?.type === "hrstaffs") {
              navigate("/profile");
            } else {
              navigate("/messages");
            }}}
          >
            {notification.message.length > 50
              ? `${notification.message.substring(0, 50)}...`
              : notification.message}
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <>
      {contextHolder}
      <AntdHeader
        style={{
          backgroundColor: "#fff",
          padding: "0 20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#1890ff",
          }}
        >
          <img
            src="/fpp.jpg"
            alt="Company Logo"
            style={{
              height: "40px",
              marginRight: "10px",
              borderRadius: "20px",
            }}
          />
          {t('organizationName')}
          {/* PHRMS */}
        </div>
        <div style={{ position: "relative", marginTop: "30px" }}>
          <Search
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
            enterButton={<SearchOutlined />}
            style={{ width: 300 }}
          />
          {searchValue.length > 0 && searchResults.length > 0 && (
            <List
              bordered
              style={{
                position: "absolute",
                top: "40px",
                width: "300px",
                maxHeight: "300px",
                overflowY: "auto",
                zIndex: 10,
                backgroundColor: "#fff",
              }}
              dataSource={searchResults}
              renderItem={(item: SearchResult) => (
                <List.Item
                  key={item.path}
                  onClick={() => handleSelectSearchResult(item.path)}
                  style={{ cursor: "pointer" }}
                >
                  <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchValue]}
                    autoEscape
                    textToHighlight={item.description}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Dropdown overlay={notificationMenu} trigger={["click"]}>
            <Badge
              count={unreadCount}
              size="small"
              style={{
                backgroundColor: "#f5222d",
                marginRight: "22px",
                marginTop: "3px",
                cursor: "pointer",
              }}
            >
              <BellOutlined style={{ fontSize: 20 }} />
            </Badge>
          </Dropdown>
          <Select
            defaultValue="en"
            style={{ width: 100, marginRight: 20 }}
            onChange={handleLanguageChange}
          >
            <Option value="en">English</Option>
            <Option value="am">Amharic</Option>
            <Option value="fr">somalia</Option>
          </Select>
          <Dropdown overlay={ProfileMenu} trigger={["click"]}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                marginLeft:"10px"
              }}
            >
              <Text strong style={{ marginRight: 10 }}>
                {profile?.firstName || "Loading..."}
                </Text>
                <br />{"\n"}
                <Text style={{ marginRight:10}}>

                {profile?.role || ""}
              </Text>
              <Avatar
                src={
                  profile?.photo
                    ? `http://localhost:8000/${profile.photo}`
                    : undefined
                }
                icon={!profile?.photo ? <UserOutlined /> : undefined}
              />
            </div>
          </Dropdown>
        </div>
        <Modal
          title="Confirm Logout"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you sure you want to log out?</p>
        </Modal>
      </AntdHeader>
    </>
  );
};

export default Header;
