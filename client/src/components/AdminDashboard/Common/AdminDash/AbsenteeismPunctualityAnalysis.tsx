import React from "react";
import { Row, Col, Card } from "antd";
import Chart from "react-apexcharts";

interface EmployeeData {
  employee: string;
  daysAbsent: number;
  punctualityScore?: number; // Make it optional as it's not present in the punctualityData
  latePercentage?: number; // Add latePercentage property
}
interface PunctualityData {
  [x: string]: any;
  employee: string;
  latePercentage: number;
}


interface AbsenteeismPunctualityAnalysisProps {
  absenteeismData: EmployeeData[];
  punctualityData: PunctualityData[];
}
const AbsenteeismPunctualityAnalysis: React.FC<
  AbsenteeismPunctualityAnalysisProps
> = ({ absenteeismData, punctualityData }) => {
    const punctualitySeriesData = punctualityData.map((data) => ({
      employee: data.employee,
      punctualityScore:
        typeof data.punctualityScore === "number" ? data.punctualityScore : 0,
    }));
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Absenteeism Analysis">
            <Chart
              options={{
                chart: {
                  type: "bar",
                },
                xaxis: {
                  categories: absenteeismData.map((data) => data.employee),
                },
              }}
              series={[
                {
                  name: "Days Absent",
                  data: absenteeismData.map((data) => data.daysAbsent),
                },
              ]}
              type="bar"
              width="400"
              height="300"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Punctuality Analysis">
            <Chart
              options={{
                chart: {
                  type: "line",
                },
                xaxis: {
                  categories: punctualitySeriesData.map(
                    (data) => data.employee
                  ),
                },
              }}
              series={[
                {
                  name: "Punctuality Score",
                  data: punctualitySeriesData.map(
                    (data) => data.punctualityScore
                  ),
                },
              ]}
              type="line"
              width="400"
              height="300"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AbsenteeismPunctualityAnalysis;
