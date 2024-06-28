import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Layout,
  Typography,
  message,
} from "antd";
import Trip from "../../assets/Trip.gif";
import { useCreateLeave } from "../../services/mutations/leaveMutation";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "../../context/AuthContext";
import { useAllCalendars } from "../../services/queries/calendarQueries";

const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const leaveTypes = ["sick", "annual", "maternity", "paternity", "unpaid"];

const LeaveRequestForm: React.FC = () => {
  const { user } = useAuth();
  const [days, setDays] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const createLeaveMutation = useCreateLeave();
  const { data: holidaysData, error: holidaysError } = useAllCalendars();

  const holidays = holidaysData
    ? holidaysData.map((holiday: any) => dayjs(holiday.date))
    : [];

  useEffect(() => {
    if (holidaysError) {
      console.error("Failed to fetch holidays:", holidaysError);
    }
  }, [holidaysError]);

  const onFinish = async (values: any) => {
    const formattedValues = {
      ...values,
      from: values.from.format("YYYY-MM-DD"),
      to: values.to.format("YYYY-MM-DD"),
      status: "pending",
      days,
    };
    console.log("Received values of form: ", formattedValues);

    try {
      const allvalues = { ...formattedValues, employeeId: user?.employeeId };
      console.log("Received values of form: ", allvalues);
      createLeaveMutation.mutate(allvalues);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    if (allValues.from && allValues.to) {
      const totalDays = calculateLeaveDays(allValues.from, allValues.to);
      setDays(totalDays);
    }
  };

  const calculateLeaveDays = (startDate: Dayjs, endDate: Dayjs): number => {
    let count = 0;
    let currentDate = startDate;

    while (
      currentDate.isBefore(endDate) ||
      currentDate.isSame(endDate, "day")
    ) {
      const isWeekend = currentDate.day() === 0 || currentDate.day() === 6;
      const isHoliday = holidays.some((holiday:any) =>
        holiday.isSame(currentDate, "day")
      );

      if (!isWeekend && !isHoliday) {
        count++;
      }
      currentDate = currentDate.add(1, "day");
    }

    return count;
  };

  const disabledFromDate = (current: Dayjs): boolean => {
    return (
      current.isBefore(dayjs().startOf("day")) ||
      (toDate !== null && current.isAfter(toDate, "day"))
    );
  };

  const disabledToDate = (current: Dayjs): boolean => {
    return (
      current.isBefore(dayjs().startOf("day")) ||
      (fromDate !== null && current.isBefore(fromDate, "day"))
    );
  };

  return (
    <Layout>
      <Title
        level={4}
        style={{
          padding: "10px 30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Leave Application Form
      </Title>

      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "30px",
        }}
      >
        <Form
          style={{
            background: "#fff",
            padding: "40px",
            height: "540px",
          }}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="From"
                name="from"
                rules={[
                  { required: true, message: "Please select start date!" },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  disabledDate={disabledFromDate}
                  onChange={(date) => setFromDate(date)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="To"
                name="to"
                rules={[{ required: true, message: "Please select end date!" }]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  disabledDate={disabledToDate}
                  onChange={(date) => setToDate(date)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Leave Type"
                name="leaveType"
                rules={[
                  { required: true, message: "Please select leave type!" },
                ]}
              >
                <Select>
                  {leaveTypes.map((type, index) => (
                    <Option key={index} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Days">
                <Input value={days ? days.toString() : ""} disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Reason"
                name="reason"
                rules={[
                  { required: true, message: "Please input your reason!" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: "left" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div>
          <img
            src={Trip}
            alt="trip"
            width="400px"
            height="540px"
            style={{
              borderTopRightRadius: "30px",
              borderBottomRightRadius: "30px",
              marginTop: "4px",
            }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default LeaveRequestForm;
