import React, { useState, useEffect } from "react";
import {
  Calendar,
  Modal,
  Button,
  Form,
  Input,
  Badge,
  ConfigProvider,
} from "antd";
import dayjs from "dayjs";
import "./css.css";
import VideoCalendar from "../../assets/Calendar.gif";
import { IoCalendarNumberOutline, IoDownloadOutline } from "react-icons/io5";
import { useAllCalendars } from "../../services/queries/calendarQueries";
import { useCreateHoliday } from "../../services/mutations/calendarMutation";
import { useAuth } from "../../context/AuthContext";

interface Holiday {
  date: string;
  description: string;
}

const CalendarComponent: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const getCalendar = useAllCalendars();
  const createCalendar = useCreateHoliday();
  const {user}=useAuth()
  useEffect(() => {
    if (getCalendar.data) {
      setHolidays(getCalendar.data);
    }
  }, [getCalendar.data]);

  const handleDateClick = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    const formattedDate = date.format("YYYY-MM-DD");
    const holiday = holidays.find((h) => h.date === formattedDate);
    if(user?.role==="admin"){
    if (holiday) {
      Modal.info({
        title: "Holiday Details",
        content: (
          <div>
            <p>Date: {holiday.date}</p>
            <p>Description: {holiday.description}</p>
          </div>
        ),
      });
    } else {
      setVisible(true);
    }
  }
  };

  const handleAddHoliday = async (values: { description: string }) => {
    try {
      if (!selectedDate) {
        throw new Error("Please select a date.");
      }

      const sendHoliday: Holiday = {
        date: selectedDate.format("YYYY-MM-DD"),
        description: values.description,
      };
      createCalendar.mutate(sendHoliday);

      if (createCalendar.error) {
        throw new Error("Failed to add holiday");
      }

      setHolidays((prev) => [...prev, sendHoliday]);
      setVisible(false);
    } catch (error) {
      console.error("Error adding holiday:", error);
    }
  };

  const dateCellRender = (date: dayjs.Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const holiday = holidays.find((h) => h.date === formattedDate);
    if (holiday) {
      return (
        <div className="holiday" style={{ backgroundColor: "lightblue" }}>
          {holiday.description}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <h1>PHR Calendar</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "start",
          }}
        >
          <h3 style={{ color: "gray" }}>Calendar</h3>
          <ConfigProvider
            theme={{
              components: {
                Badge: {
                  statusSize: 12,
                },
              },
            }}
          >
            <Badge
              style={{ marginBottom: "10px" }}
              color="lightgreen"
              text="Holiday"
              size="default"
            />
            <Badge
              style={{ marginBottom: "10px" }}
              color="orange"
              text="Important"
              size="default"
            />
            <Badge
              style={{ marginBottom: "10px" }}
              color="purple"
              text="Festival"
              size="default"
            />
          </ConfigProvider>
        </div>
        <div>
          <img src={VideoCalendar} alt="gif of calendar" />
        </div>
      </div>
      <Calendar
        onSelect={(date) => handleDateClick(dayjs(date))}
        dateCellRender={dateCellRender}
      />
      <Modal
        title="Add Holiday"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={false}
      >
        <Form onFinish={handleAddHoliday}>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input />
          </Form.Item>
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>
          <Button key="add" type="primary" htmlType="submit">
            Add
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
