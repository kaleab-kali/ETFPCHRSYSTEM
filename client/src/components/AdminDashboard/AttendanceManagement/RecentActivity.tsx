import React, { useState } from "react";
import { Card, Avatar, Button, Row, Col, Badge } from "antd";
import { useRecentActivities } from "../../../services/queries/attendanceQueries";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
// import "./RecentActivityCard.css"; // Importing custom CSS for additional styles

const RecentActivityCard: React.FC = () => {
  const { data, error, isLoading } = useRecentActivities();
  const [visibleCount, setVisibleCount] = useState(3);

  const calculateTimeAgo = (time: string) => {
    const now = moment();
    const duration = moment.duration(now.diff(moment(time)));
    if (duration.asSeconds() < 60) {
      return `${Math.floor(duration.asSeconds())}s ago`;
    } else if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())}m ago`;
    } else if (duration.asHours() < 24) {
      return `${Math.floor(duration.asHours())}h ago`;
    } else {
      return `${Math.floor(duration.asDays())}d ago`;
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const handleShowLess = () => {
    setVisibleCount((prevCount) => Math.max(prevCount - 3, 3));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading recent activities</p>;

  return (
    <Card style={{ width: "300px" }}>
      <Meta title="Recent Activity" />
      {data.slice(0, visibleCount).map((activity: any, index: number) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <h4
            style={{ color: activity.action === "checkedIn" ? "green" : "red" }}
          >
            {activity.action === "checkedIn" ? "Checked In" : "Checked Out"}
          </h4>
          <Row align="middle" gutter={16}>
            <Col>
              <Badge
                dot
                status="processing"
                color={activity.action === "checkedIn" ? "green" : "red"}
              >
                <Avatar src={activity.employeeDetails.photo} />
              </Badge>
            </Col>
            <Col>
              <p>
                {activity.employeeDetails.firstName +
                  " " +
                  activity.employeeDetails.lastName}
              </p>
              <p style={{ color: "gray" }}>
                -{" "}
                {calculateTimeAgo(
                  activity.action === "checkedIn"
                    ? activity.recordedTime
                    : activity.checkOutTime
                )}
              </p>
            </Col>
          </Row>
        </div>
      ))}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        {visibleCount < data.length && (
          <Button type="link" onClick={handleShowMore}>
            Show More
          </Button>
        )}
        {visibleCount > 3 && (
          <Button type="link" onClick={handleShowLess}>
            Show Less
          </Button>
        )}
      </div>
    </Card>
  );
};

export default RecentActivityCard;
