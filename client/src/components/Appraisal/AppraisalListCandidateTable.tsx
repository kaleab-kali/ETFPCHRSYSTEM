import React from "react";
import { Table, Select, Button, Skeleton } from "antd";
import { useAllAppraisal } from "../../services/queries/appraisaQueries";
import { Appraisal, Appraisal2 } from "../../../../shared/types/appraisalTypes";
// import { useCreateAppraisal } from "../../services/mutations/appraisalMutation";
// import  {useAllAppraisal}
import moment from "moment";

interface Appraisal3 {
  key: string;
  employeeId?: string;
  name: string;
  currentLevel: string;
  nextLevel: string;
  position: string;
  promotionDate: string;
  scores: {
    education: number;
    service: number;
    attitude: number;
    behaviour: number;
    workEfficiency: number;
    disciplinary: number;
  };
  totalScore: number;
  status: string;
  employee?: {
    fullName?: string;
    position: string;
    promotionDate: Date;
  };
}


const { Option } = Select;

const levels = [
  "Constable",
  "Assistant Sergeant",
  "Deputy Sergeant",
  "Sergeant",
  "Chief Sergeant",
  "Assistant Inspector",
  "Deputy Inspector",
  "Inspector",
  "Chief Inspector",
  "DeputyCommander",
  "Commander",
  "Assistant Commissioner",
  "Deputy Commissioner",
  "Commissioner General",
];

const columns = [
  {
    title: "Employee ID",
    dataIndex: "employeeId" as keyof Appraisal2,
    key: "employeeId",
  },
  {
    title: "Full Name",
    dataIndex: "name" as unknown as keyof Appraisal2,
    key: "fullName",
    sorter: (a: Appraisal3, b: Appraisal3) =>
      a.name.localeCompare(b.name),
  },
  {
    title: "Current Level",
    dataIndex: "currentLevel" as keyof Appraisal2,
    key: "currentLevel",
  },
  {
    title: "Next Level",
    dataIndex: "nextLevel" as keyof Appraisal2,
    key: "nextLevel",
  },
  {
    title: "Promotion Date",
    dataIndex: "promotionDate" as keyof Appraisal2,
    key: "promotionDate",
  },
  {
    title: "Position",
    dataIndex: "position" as unknown as keyof Appraisal2,
    key: "position",
  },
  // {
  //   title: "Last Promotion Date",
  //   dataIndex: "previousPromotionDate" as keyof Appraisal2,
  //   key: "previousPromotionDate",
  // },
];

const AppraisalTable: React.FC = () => {
  const appraisalQuery = useAllAppraisal();
  const dataAppraisal = appraisalQuery.data || []; // Ensure it's initialized as an empty array if undefined
  console.log("appraisal", dataAppraisal);
  // const updateAppraisalMutuation = useCreateAppraisal();
        // updateAppraisalMutuation.mutate({});

  const [selectedLevel, setSelectedLevel] = React.useState<string | null>(null);
  const [data, setData] = React.useState<Appraisal3[]>([]); // Initialize as empty array

  React.useEffect(() => {
    if (dataAppraisal) {
      // Map the received data to the format of Appraisal2
      const formattedData = dataAppraisal.map(
        (appraisal: Appraisal2, index: number) => ({
          key: `${index}`,
          employeeId: appraisal.employeeId || "",
          name: appraisal.employee?.fullName || "",
          currentLevel: appraisal.currentLevel || "",
          nextLevel: appraisal.nextLevel || "",
          position: appraisal.employee?.position || "",
          promotionDate: appraisal.employee?.promotionDate
            ? moment(appraisal.employee.promotionDate).format("YYYY-MM-DD")
            : "", // Convert to Date object
          scores: {
            education: 0, // Provide default values for scores
            service: 0,
            attitude: 0,
            behaviour: 0,
            workEfficiency: 0,
            disciplinary: 0,
          },
          totalScore: 0, // Provide default value for totalScore
          status: "", // Provide default value for status
        })
      );

      setData(formattedData);
    }
        // updateAppraisalMutuation.mutate({});

  }, [dataAppraisal]);
if (!appraisalQuery.data) {
  return (
    <div style={{ marginTop: "50px" }}>
      <Skeleton active paragraph={{ rows: 6 }} />
    </div>
  );
} 
  const handleButtonClick=()=>{
        // updateAppraisalMutuation.mutate({});

  }
  const handleChange = (value: string) => {
    setSelectedLevel(value);
  };

  const filteredData = selectedLevel
    ? selectedLevel === "All"
      ? data
      : data.filter(
          (employee) =>
            levels.indexOf(employee.currentLevel) + 1 ===
            levels.indexOf(selectedLevel)
        )
    : data;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(
        "<html><head><title>Print</title></head><body>"
      );
      printWindow.document.write("<h1>Appraisal Table</h1>");
      printWindow.document.write('<table border="1">');
      printWindow.document.write("<thead><tr>");
      columns.forEach((column) => {
        printWindow.document.write(`<th>${column.title}</th>`);
      });
      printWindow.document.write("</tr></thead>");
      printWindow.document.write("<tbody>");
      filteredData.forEach((employee) => {
        printWindow.document.write("<tr>");
        columns.forEach((column) => {
          printWindow.document.write(
            `<td>${
              employee[column.dataIndex as keyof Appraisal3]
            }</td>`
          );
        });
        printWindow.document.write("</tr>");
      });
      printWindow.document.write("</tbody></table></body></html>");
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error("Failed to open print window");
    }
  };

  return (
    <div>
      <Select
        style={{ width: 200 }}
        placeholder="Select a level"
        onChange={handleChange}
      >
        <Option key="All" value="All">
          All
        </Option>
        {levels.map(
          (level, index) =>
            index !== 0 && (
              <Option key={level} value={level}>
                {level}
              </Option>
            )
        )}
      </Select>
      <Button style={{ marginLeft: 20 }} onClick={handlePrint}>
        Print
      </Button>
      {/* <Button onClick={handleButtonClick} style={{ marginLeft: 20 }} >
        Update
      </Button> */}
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default AppraisalTable;
