
import React from "react";
import { Table, Select, Button, Skeleton } from "antd";
import { useAllCandidateAppraisal } from "../../services/queries/appraisaQueries";
import { Appraisal } from "../../../../shared/types/appraisalTypes";
import { useCreateAppraisal } from "../../services/mutations/appraisalMutation";

interface AppraisalCandidates {
  key: string;
  employeeId: string;
  name: string;
  currentLevel: string;
  desiredLevel: string;
  yearsOfWork: number;
  position: string;
  lastPromotionDate: string;
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
    dataIndex: "employeeId" as keyof AppraisalCandidates,
    key: "employeeId",
  },
  {
    title: "Full Name",
    dataIndex: "name" as keyof AppraisalCandidates,
    key: "name",
    sorter: (a: AppraisalCandidates, b: AppraisalCandidates) =>
      a.name.localeCompare(b.name),
  },
  {
    title: "Current Level",
    dataIndex: "currentLevel" as keyof AppraisalCandidates,
    key: "currentLevel",
  },
  {
    title: "Desired Level",
    dataIndex: "desiredLevel" as keyof AppraisalCandidates,
    key: "desiredLevel",
  },
  {
    title: "Years of Work",
    dataIndex: "yearsOfWork" as keyof AppraisalCandidates,
    key: "yearsOfWork",
  },
  {
    title: "Position",
    dataIndex: "position" as keyof AppraisalCandidates,
    key: "position",
  },
  // {
  //   title: "Last Promotion Date",
  //   dataIndex: "previousPromotionDate" as keyof AppraisalCandidates,
  //   key: "previousPromotionDate",
  // },
];

const AppraisalHistory: React.FC = () => {
  const appraisalQuery = useAllCandidateAppraisal();
  
  const {data:dataAppraisal, refetch} = appraisalQuery || []; // Ensure it's initialized as an empty array if undefined
  console.log("appraisal", dataAppraisal);
  const updateAppraisalMutuation = useCreateAppraisal();
  
  const [selectedLevel, setSelectedLevel] = React.useState<string | null>(null);
  const [data, setData] = React.useState<AppraisalCandidates[]>([]); // Initialize as empty array

  React.useEffect(() => {
    if (dataAppraisal) {
      // Map the received data to the format of AppraisalCandidates
      const formattedData = dataAppraisal.map(
        (appraisal: Appraisal, index: number) => ({
          key: `${index}`,
          employeeId: appraisal.employeeId || "",
          name: appraisal.fullName || "",
          currentLevel: appraisal.currentLevel || "",
          desiredLevel: appraisal.desiredLevel || "",
          yearsOfWork: appraisal.yearsOfWork || 0,
          position: appraisal.positionOfWork || "",
          lastPromotionDate: appraisal.previousPromotionDate
            ? appraisal.previousPromotionDate.toISOString()
            : "",
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
  const handleButtonClick = () => {
    updateAppraisalMutuation.mutate({});
    // refetch()
  };
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
              employee[column.dataIndex as keyof AppraisalCandidates]
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
      <Button onClick={handleButtonClick} style={{ marginLeft: 20 }} >
        Display List
      </Button>
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default AppraisalHistory;
