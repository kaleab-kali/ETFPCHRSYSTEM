// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Input, Select, Space, Table, Typography } from "antd";
// import "../../styles/EmployeeProfilePage.css";
// import {
//   useAllEmployees,
//   useDepartmentHeadEmployee,
//   useManagerEmployee,
// } from "../../services/queries/employeeQueries";
// import { useDeleteEmployee } from "../../services/mutations/employeeMutations";
// import { useAllDepartments } from "../../services/queries/departmentQueries";
// import { useAuth } from "../../context/AuthContext";
// import { ColumnsType } from "antd/es/table";
// import { DepartmentInfo } from "../../../../shared/types/departmentTypes";

// const { Title } = Typography;
// const { Option } = Select;
// interface Employee {
//   _id: string;
//   title: string;
//   firstName: string;
//   lastName: string;
//   position: string;
//   department: string;
// }

// const EmployeeProfilePage: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const deleteEmployeeMutation = useDeleteEmployee();
//   const departmentsQuery = useAllDepartments();

//   const handleDelete = (key: string) => {
//     deleteEmployeeMutation.mutate(key);
//   };

//   const employeesQuery = useAllEmployees();
//   const depHead = useDepartmentHeadEmployee(user?.employeeId || "");
//   const manager = useManagerEmployee(user?.employeeId || "");

//   const depData = departmentsQuery.data
//   ? departmentsQuery.data.map((queryResult: DepartmentInfo) => {
//       return {
//         departmentID: queryResult.departmentID,
//         departmentName: queryResult.departmentName,
//         departmentHead: queryResult.departmentHead,
//       };
//     })
//   : [];
//   console.log("departmentn data",depData);

//   const employees =
//     user?.role === "department head"
//       ? depHead
//       : user?.role === "manager"
//       ? manager
//       : employeesQuery;

//   const dataSource = employees.data || [];

//   const [data, setData] = useState<Employee[]>(dataSource);
//   const [searchText, setSearchText] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState<
//     string | undefined
//   >(undefined);

//   useEffect(() => {
//     setData(dataSource);
//   }, [dataSource]);

//   const handleDepartmentChange = (value: string) => {
//     setSelectedDepartment(value);
//   };

//   const handleSearch = (value: string) => {
//     setSearchText(value);
//   };

//   const filteredData = data.filter((employee) => {
//     return (
//       (!selectedDepartment || employee.department === selectedDepartment) &&
//       (employee.firstName?.toLowerCase().includes(searchText?.toLowerCase()) ||
//         employee.lastName?.toLowerCase().includes(searchText?.toLowerCase()))
//     );
//   });

//   const columns: ColumnsType = [
//     {
//       title: "ID",
//       dataIndex: "empId",
//       key: "_id",
//       sorter: (a: Employee, b: Employee) => a._id.localeCompare(b._id),
//     },
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//       sorter: (a: Employee, b: Employee) => a.title.localeCompare(b.title),
//     },
//     {
//       title: "First Name",
//       dataIndex: "firstName",
//       key: "firstName",
//       sorter: (a: Employee, b: Employee) =>
//         a.firstName.localeCompare(b.firstName),
//     },
//     {
//       title: "Last Name",
//       dataIndex: "lastName",
//       key: "lastName",
//       sorter: (a: Employee, b: Employee) =>
//         a.lastName.localeCompare(b.lastName),
//     },
//     {
//       title: "Position",
//       dataIndex: "position",
//       key: "position",
//       sorter: (a: Employee, b: Employee) =>
//         a.position.localeCompare(b.position),
//     },
//     {
//       title: "Department",
//       dataIndex: "department",
//       key: "department",
//       filters: [
//         { text: "PoliceComission", value: "PoliceComission" },
//         { text: "Transport", value: "Transport" },
//         { text: "Finance", value: "Finance" },
//         // Add other departments here
//       ],
//       onFilter: (value: any, record: any) => {
//         return record.department === value;
//       },
//       sorter: (a: Employee, b: Employee) =>
//         a.department.localeCompare(b.department),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text: any, record: Employee) => (
//         <Space>
//           <Button
//             onClick={() => navigate(`/employee/view/${record._id}`)}
//             style={{ color: "blue", borderColor: "blue" }}
//           >
//             View
//           </Button>
//           {(user?.role === "staff" || user?.role === "hrmanager") && (
//             <Button danger onClick={() => handleDelete(record._id)}>
//               Delete
//             </Button>
//           )}
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Title level={4} style={{ padding: "10px 30px" }}>
//         Employee List
//       </Title>
//       <div className="metricsCard">
//         <Space></Space>
//       </div>
//       <div className="tableBlock">
//         <Space style={{ marginBottom: 16 }}>
//         <Select placeholder="Select a department" onChange={handleDepartmentChange} style={{width: 200}} allowClear>
//               {depData.map((department) => (
//                 <Option key={department.departmentID} value={department.departmentName}>
//                   {department.departmentName}
//                 </Option>
//               ))}
//             </Select>
//           <Input
//             placeholder="Search by name"
//             value={searchText}
//             onChange={(e) => handleSearch(e.target.value)}
//             style={{ width: 200 }}
//           />
//         </Space>
//         <Table columns={columns} dataSource={filteredData} />
//       </div>
//     </>
//   );
// };

// export default EmployeeProfilePage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, Space, Table, Typography, Modal } from "antd";
import "../../styles/EmployeeProfilePage.css";
import {
  useAllEmployees,
  useDepartmentHeadEmployee,
  useManagerEmployee,
} from "../../services/queries/employeeQueries";
import { useDeleteEmployee } from "../../services/mutations/employeeMutations";
import { useAllDepartments } from "../../services/queries/departmentQueries";
import { useAuth } from "../../context/AuthContext";
import { ColumnsType } from "antd/es/table";
import { DepartmentInfo } from "../../../../shared/types/departmentTypes";

const { Title } = Typography;
const { Option } = Select;
interface Employee {
  _id: string;
  title: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  status: string;
}

const EmployeeProfilePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );

  const { user } = useAuth();
  const navigate = useNavigate();

  const deleteEmployeeMutation = useDeleteEmployee();
  const departmentsQuery = useAllDepartments();

  const handleDelete = (employeeId: string) => {
    console.warn("Delete employee:", employeeId);
    setSelectedEmployeeId(employeeId);
    setIsModalVisible(true);
  };

  // const handleDelete = (key: string) => {
  //   deleteEmployeeMutation.mutate(key);
  // };

  const handleConfirmDelete = () => {
    const deactiveEmployee = {
      id: selectedEmployeeId ?? "",
      status: "inactive",
      reason: deleteReason,
    };
    
    if (selectedEmployeeId && deleteReason) {
      deleteEmployeeMutation.mutate(deactiveEmployee);
    }

    setIsModalVisible(false);
    setDeleteReason("");
    setSelectedEmployeeId(null);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setDeleteReason("");
    setSelectedEmployeeId(null);
  };

  const employeesQuery = useAllEmployees();
  const depHead = useDepartmentHeadEmployee(user?.employeeId || "");
  const manager = useManagerEmployee(user?.employeeId || "");

  const depData = departmentsQuery.data
    ? departmentsQuery.data.map((queryResult: DepartmentInfo) => {
        return {
          departmentID: queryResult.departmentID,
          departmentName: queryResult.departmentName,
          departmentHead: queryResult.departmentHead,
        };
      })
    : [];
  console.log("departmentn data", depData);

  const employees =
    user?.role === "department head"
      ? depHead
      : user?.role === "manager"
      ? manager
      : employeesQuery;

  const dataSource = employees.data || [];

  const [data, setData] = useState<Employee[]>(dataSource);
  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<
    string | undefined
  >(undefined);

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  useEffect(() => {
    if (Array.isArray(dataSource)) {
      setData(dataSource);
    } else {
      console.warn("dataSource is not an array:", dataSource);
      setData([]);
    }
  }, [dataSource]);

  useEffect(() => {
    console.log("Data:", data);
  }, [data]);

  const filteredData = Array.isArray(data)
    ? data.filter((employee) => {
        return (
          (!selectedDepartment || employee.department === selectedDepartment) &&
          (employee.firstName
            ?.toLowerCase()
            .includes(searchText?.toLowerCase()) ||
            employee.lastName
              ?.toLowerCase()
              .includes(searchText?.toLowerCase()))
        );
      })
    : [];

  const columns: ColumnsType = [
    {
      title: "ID",
      dataIndex: "empId",
      key: "_id",
      sorter: (a: Employee, b: Employee) => a._id.localeCompare(b._id),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Employee, b: Employee) => a.title.localeCompare(b.title),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a: Employee, b: Employee) =>
        a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a: Employee, b: Employee) =>
        a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      sorter: (a: Employee, b: Employee) =>
        a.position.localeCompare(b.position),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      filters: [
        { text: "PoliceComission", value: "PoliceComission" },
        { text: "Transport", value: "Transport" },
        { text: "Finance", value: "Finance" },
       
      ],
      onFilter: (value: any, record: any) => {
        return record.department === value;
      },
      sorter: (a: Employee, b: Employee) =>
        a.department.localeCompare(b.department),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: Employee) => (
        <Space>
          <Button
            onClick={() => navigate(`/employee/view/${record._id}`)}
            style={{ color: "blue", borderColor: "blue" }}
          >
            View
          </Button>
          {(user?.role === "staff" || user?.role === "hrmanager") && (
            <Button danger onClick={() => handleDelete(record._id)}>
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Title level={4} style={{ padding: "10px 30px" }}>
        Employee List
      </Title>
      <div className="metricsCard">
        <Space></Space>
      </div>
      <div className="tableBlock">
        <Space style={{ marginBottom: 16 }}>
          <Select
            placeholder="Select a department"
            onChange={handleDepartmentChange}
            style={{ width: 200 }}
            allowClear
          >
            {depData.map((department) => (
              <Option
                key={department.departmentID}
                value={department.departmentName}
              >
                {department.departmentName}
              </Option>
            ))}
          </Select>
          <Input
            placeholder="Search by name"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200 }}
          />
        </Space>
        <Table columns={columns} dataSource={filteredData} />
      </div>
      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okButtonProps={{ disabled: !deleteReason }} 
      >
        <p>Please select a reason for deletion:</p>
        <Select
          placeholder="Select a reason"
          value={deleteReason}
          onChange={(value) => setDeleteReason(value)}
          style={{ width: "100%" }}
        >
          <Option value="Resigned">Resigned</Option>
          <Option value="Terminated">Terminated</Option>
          <Option value="Contract Ended">Contract Ended</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Modal>
      ;
    </>
  );
};

export default EmployeeProfilePage;
