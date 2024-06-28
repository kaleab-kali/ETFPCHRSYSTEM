// import React, { useState } from "react";
// import { Button } from "antd";
// import { PlusCircleOutlined } from "@ant-design/icons";
// import SupplierForm from "./AddressForm";
// import AddressForm from "./AddressForm";

// const AddAddress: React.FC = () => {
//   const [visible, setVisible] = useState(false);

//   const showModal = () => {
//     setVisible(true);
//   };

//   const handleCancel = () => {
//     setVisible(false);
//   };

//   return (
//     <>
//       <Button
//         type="primary"
//         // style={{ float: "right", }}
//         icon={<PlusCircleOutlined />}
//         onClick={showModal}
//       >
//         Add Region \ subcity \ woreda
//       </Button>
//       <AddressForm visible={visible} onCancel={handleCancel} />
//     </>
//   );
// };

// export default AddAddress;


// import React, { useState } from "react";
// import { Button } from "antd";
// import { PlusCircleOutlined } from "@ant-design/icons";
// import AddressForm from "./AddressForm";

// const AddAddress: React.FC= ({ addressType }) => {
//   const [visible, setVisible] = useState(false);

//   const showModal = () => {
//     setVisible(true);
//   };

//   const handleCancel = () => {
//     setVisible(false);
//   };

//   const getTitle = () => {
//     switch (addressType) {
//       case "Region":
//         return "Add Region";
//       case "Subcity":
//         return "Add Subcity";
//       case "Woreda":
//         return "Add Woreda";
//       default:
//         return "Add Address";
//     }
//   };

//   return (
//     <>
//       <Button
//         type="primary"
//         icon={<PlusCircleOutlined />}
//         onClick={showModal}
//       >
//         {getTitle()}
//       </Button>
//       <AddressForm visible={visible} onCancel={handleCancel} addressType={addressType} />
//     </>
//   );
// };

// export default AddAddress;
//stable version==================================================
// import React, { useState } from "react";
// import { Button } from "antd";
// import { PlusCircleOutlined } from "@ant-design/icons";
// import AddressForm from "./AddressForm";

// const AddAddress: React.FC<{ addressType: string }> = ({ addressType }) => {
//   const [visible, setVisible] = useState(false);

//   const showModal = () => {
//     setVisible(true);
//   };

//   const handleCancel = () => {
//     setVisible(false);
//   };

//   return (
//     <>
//       <Button
//         type="primary"
//         icon={<PlusCircleOutlined />}
//         onClick={showModal}
//       >
//         Add {addressType}
//       </Button>
//       <AddressForm visible={visible} onCancel={handleCancel}  />
//     </>
//   );
// };

// export default AddAddress;



import React, { useState } from "react";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddressForm from "./AddressForm";
import { RegionInfo, SubcityInfo, WoredaInfo } from "../../../../../shared/types/addressTypes";

interface AddAddressProps {
  addressType: string;
  initialValues?: RegionInfo | SubcityInfo | WoredaInfo;
}

const AddAddress: React.FC<AddAddressProps> = ({ addressType, initialValues }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      >
        Add {addressType}
      </Button>
      <AddressForm visible={visible} onCancel={handleCancel} addressType={addressType} initialValues={initialValues} />
    </>
  );
};

export default AddAddress;
