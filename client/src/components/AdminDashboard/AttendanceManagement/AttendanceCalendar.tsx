import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { Calendar, Col, Radio, Row, Select, Tooltip, Typography } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";
import { useAllCalendars } from "../../../services/queries/calendarQueries";

dayjs.extend(dayLocaleData);

interface Holiday {
  date: string;
  description: string;
}

const AttendanceCalendar: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const getCalendar = useAllCalendars();

  useEffect(() => {
    if (getCalendar.data) {
      setHolidays(getCalendar.data);
    }
  }, [getCalendar.data]);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const dateCellRender = (date: dayjs.Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const holiday = holidays.find((h) => h.date === formattedDate);
    if (holiday) {
      return (
        <Tooltip title={holiday.description} color="yellow" >
          <div
            style={{
              backgroundColor: "#FFD700",
              borderRadius: "5px",
              color: "white",
              textAlign: "center",
              padding: "4px 0",
            }}
          >
            {/* "{date.date()}" */}
          </div>
        </Tooltip>
      );
    } else {
      return "";
    }
  };

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid #d9d9d9`,
    borderRadius: "10px",
    padding: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  };

  return (
    <div style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        dateCellRender={dateCellRender}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }
          return (
            <div style={{ padding: 8 }}>
              <Typography.Title
                style={{ display: "flex", justifyContent: "center" }}
                level={4}
              >
                Calendar
              </Typography.Title>
              <Row gutter={8}>
                <Col>
                  <Radio.Group
                    size="small"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default AttendanceCalendar;
