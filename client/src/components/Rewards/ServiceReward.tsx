import React, { useRef, useState } from "react";
import { Table, Avatar, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType, ColumnType, TablePaginationConfig } from "antd/lib/table";
import Highlighter from "react-highlight-words";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import { saveAs } from "file-saver";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import { FilterValue, TableCurrentDataSource } from "antd/lib/table/interface";
import { InputRef } from "antd/lib/input";
// import TableCurrentDataSource from "antd/lib/table";
// import { TableCurrentDataSource } from "antd/es/table/interface";

interface Employee {
  id: number;
  profile: string;
  name: string;
  served: number;
  department: string;
  reward: string;
}

const initialData: Employee[] = [
  {
    id: 1,
    profile: "https://via.placeholder.com/40",
    name: "John Doe",
    served: 5,
    department: "Engineering",
    reward: "Employee of the Month",
  },
  {
    id: 2,
    profile: "https://via.placeholder.com/40",
    name: "Jane Smith",
    served: 3,
    department: "Marketing",
    reward: "Top Salesperson",
  },
  // Add more employee data here
];

const EmployeeTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filteredData, setFilteredData] = useState<Employee[]>(initialData);
  const searchInput = useRef<InputRef>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: keyof Employee
  ): ColumnType<Employee> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters!)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<Employee> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      ...getColumnSearchProps("id"),
    },
    {
      title: "Profile + Name",
      key: "profile",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={record.profile} />
          <span style={{ marginLeft: 8 }}>{record.name}</span>
        </div>
      ),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Served (in years)",
      dataIndex: "served",
      key: "served",
      sorter: (a, b) => a.served - b.served,
      ...getColumnSearchProps("served"),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      filters: [
        { text: "Engineering", value: "Engineering" },
        { text: "Marketing", value: "Marketing" },
        // Add more filters as needed
      ],
      onFilter: (value, record) => record.department.includes(value as string),
      ...getColumnSearchProps("department"),
    },
    {
      title: "Reward",
      dataIndex: "reward",
      key: "reward",
      ...getColumnSearchProps("reward"),
    },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [["Id", "Name", "Served", "Department", "Reward"]],
      body: filteredData.map((item) => [
        item.id,
        item.name,
        item.served,
        item.department,
        item.reward,
      ]),
    });
    doc.save("employee_data.pdf");
  };

  const csvData = filteredData.map((item) => ({
    Id: item.id,
    Name: item.name,
    Served: item.served,
    Department: item.department,
    Reward: item.reward,
  }));

  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null | undefined>,
    sorter: any,
    extra: TableCurrentDataSource<Employee>
  ) => {
    if (extra.currentDataSource) {
      setFilteredData(extra.currentDataSource);
    }
  };

  return (
    <div>
      <h1 style={{ padding: "0 24px" }}>Reward List Based On Service</h1>
      <div style={{ padding: "24px" }}>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={handlePrint}>Print</Button>
          <Button onClick={handleDownloadPDF}>Download PDF</Button>
          <CSVLink data={csvData} filename="employee_data.csv">
            <Button>Download CSV</Button>
          </CSVLink>
        </Space>
        <div ref={componentRef}>
          <Table
            columns={columns}
            dataSource={initialData}
            rowKey="id"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
