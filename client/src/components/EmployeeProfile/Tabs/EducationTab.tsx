import React from "react";
import InfoCard from "./InfoCard";
import EducationCard from "./EducationcardFixed";
import { EmployeeData } from "../../../../../shared/types/employeeTypes";
import { useUpdateEmployee } from "../../../services/mutations/employeeMutations";
// const education = [
//   {
//     degree: "Bachelor of Science",
//     fieldOfStudy: "Computer Science",
//     institution: "University of Example",
//     graduationYear: 2010,
//     // honors: 'Summa Cum Laude',
//   },
//   {
//     degree: "Master of Science",
//     fieldOfStudy: "Computer Science",
//     institution: "University of Example",
//     graduationYear: 2012,
//     honors: "best honors",
//   },
//   {
//     degree: "PhD",
//     fieldOfStudy: "Computer Science",
//     institution: "University of Example",
//     graduationYear: 2016,
//     thesisTitle: "An Example Thesis Title",
//   },
// ];
interface EductionDisplay {
  selectedEmployee?: EmployeeData;
}
const EducationTab = ({ selectedEmployee }: EductionDisplay) => {
  return (
    <EducationCard selectedEmployee={selectedEmployee} />
    // <InfoCard />
    // <div>hIIII</div>
  )
}

export default EducationTab;
// import React, { useEffect, useState } from "react";
// import { Row, Col, Typography } from "antd";
// import { EmployeeData, Education } from "../../../../../shared/types/employeeTypes";

// const { Title, Text } = Typography;

// const EducationTab = ({ selectedEmployee }: { selectedEmployee?: EmployeeData }) => {
//   const [education, setEducation] = useState<Education[]>([]);

//   useEffect(() => {
//     // Assuming education is an array of objects
//     const selectedEducation = (selectedEmployee?.education as { [key: string]: Education[] })?.[selectedEmployee?.educationLevel || ''] || [];
//     setEducation(selectedEducation);
//   }, [selectedEmployee]);

//   return (
//     <>
//       <Title style={{ fontSize: 24 }}>Education Information</Title>
//       {selectedEmployee?.educationLevel === "bachelor" ||
//       selectedEmployee?.educationLevel === "master" ||
//       selectedEmployee?.educationLevel === "phd" ? (
//         <Row gutter={[16, 16]}>
//           {education.map((edu, index) => (
//             <Col span={8} key={index}>
//               <Text>Graduation Year: {edu.graduationYear}</Text>
//               <Text>Field of Study: {edu.fieldOfStudy}</Text>
//               <Text>University Name: {edu.universityName}</Text>
//             </Col>
//           ))}
//         </Row>
//       ) : null}
//     </>
//   );
// };

// export default EducationTab;
