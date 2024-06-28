// import React from 'react';
// import LeaveCard from './LeaveCard'; // Update the path based on your file structure
// import { EmployeeData } from "../../../../../shared/types/employeeTypes";
// import { LeaveInfo } from "../../../../../shared/types/leaveTypes";

// const LeaveHistoryTab: React.FC = () => {
//   // Dummy data for testing
//   const dummyLeaveData: LeaveInfo[] = [
//     {
//       employeeId: '123',
//       from: new Date('2024-01-01'),
//       to: new Date('2024-01-09'),
//       leaveType: 'Vacation',
//       reason: 'Holiday',
//       status: 'approved',
//       employee: {
//         firstName: 'John',
//         email: 'john@example.com',
//         gender: 'Male',
//         department: 'IT',
//       },
//       leaveFlag: undefined
//     },
//     {
//       employeeId: '456',
//       from: new Date('2024-02-01'),
//       to: new Date('2024-02-05'),
//       leaveType: 'Sick Leave',
//       reason: 'Flu',
//       status: 'pending',
//       employee: {
//         firstName: 'Jane',
//         email: 'jane@example.com',
//         gender: 'Female',
//         department: 'HR',
//       },
//     },
//     {
//       employeeId: '789',
//       from: new Date('2024-03-01'),
//       to: new Date('2024-03-05'),
//       leaveType: 'Maternity Leave',
//       reason: 'Expecting a baby',
//       status: 'rejected',
//       employee: {
//         firstName: 'Alex',
//         email: 'alex@example.com',
//         gender: 'Male',
//         department: 'Finance',
//       },
//     },
//     {
//       employeeId: '101',
//       from: new Date('2024-04-01'),
//       to: new Date('2024-04-05'),
//       leaveType: 'Business Trip',
//       reason: 'Client meetings',
//       status: 'approved',
//       employee: {
//         firstName: 'Emily',
//         email: 'emily@example.com',
//         gender: 'Female',
//         department: 'Marketing',
//       },
//     },
//     {
//       employeeId: '202',
//       from: new Date('2024-05-01'),
//       to: new Date('2024-05-05'),
//       leaveType: 'Personal Leave',
//       reason: 'Family event',
//       status: 'pending',
//       employee: {
//         firstName: 'Mark',
//         email: 'mark@example.com',
//         gender: 'Male',
//         department: 'Sales',
//       },
//     },
//   ];

//   return (
//     <div>
//       {dummyLeaveData.map((leaveInfo, index) => (
//         <div key={index} style={{ marginBottom: '10px' }}>
//           <LeaveCard leaveInfo={leaveInfo} />
//         </div>
//       ))}
//     </div>
//   );
// };


// export default LeaveHistoryTab;
import React from 'react'

const LeaveHistoryTab = () => {
  return (
    <div>LeaveHistoryTab</div>
  )
}

export default LeaveHistoryTab