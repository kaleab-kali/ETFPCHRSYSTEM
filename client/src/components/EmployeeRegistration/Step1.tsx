// Step1.tsx
import React, { useEffect, useState } from "react";
import { Form, Select, Input, Radio, DatePicker, Button, Row, Col, Upload } from "antd";
import { FormInstance } from "antd/lib/form";

import moment from "moment";
import { data } from "../../utils/data";
import { RcFile } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;

interface Step1Props {
  form: FormInstance<any>;
  nextStep: () => void;
  formData: any;
  handleFormData: (data: any) => void;
}
  const positions = [
    "Warden",
    "Deputy Warden",
    "Correctional Officer",
    "Probation Officer",
  ];
  const departments = [
    "Security",
    "Health Services",
    "Food Services",
    "Rehabilitation",
  ];


const Step1: React.FC<Step1Props> = ({ form, nextStep,formData, handleFormData }) => {
  const [region, setRegion] = useState<string | null>(null);
  const [subcity, setSubcity] = useState<string | null>(null);
  const [woreda, setWoreda] = useState<string | null>(null);

  const validateName = (_rule: any, value: string, callback: (error?: string) => void) => {
    // Regular expression to check for numbers or unknown characters
    const nameRegex = /^[a-zA-Z\s]*$/;
    // Check if the length of the name is less than 3 characters
    if (value && (value.length < 3 || !nameRegex.test(value))) {
      callback('Please enter a valid name with at least 3 characters and no numbers or special characters.');
    } else {
      callback();
    }
  };

  // Reset subcity and woreda when region changes
  useEffect(() => {
    if (region) {
      const subcities = Object.keys(data[region]);
      const firstSubcity = subcities[0];
      setSubcity(firstSubcity);
      form.setFieldsValue({ currentAddress: { subcity: firstSubcity } });

      const woredas = data[region][firstSubcity];
      const firstWoreda = woredas[0];
      setWoreda(firstWoreda);
      form.setFieldsValue({
        currentAddress: { woreda: firstWoreda },
      });
    }
  }, [region]);

  // Reset woreda when subcity changes
  useEffect(() => {
    if (region && subcity) {
      const woredas = data[region][subcity];
      const firstWoreda = woredas[0];
      setWoreda(firstWoreda);
      form.setFieldsValue({ currentAddress: { woreda: firstWoreda } });
    }
  }, [subcity]);

  const handleRegionChange = (value: string) => {
    setRegion(value);
  };

  const handleSubcityChange = (value: string) => {
    setSubcity(value);
  };
  const handleDatePickerChange = (
    date: moment.Moment | null,
    dateString: string
  ) => {
    form.setFieldsValue({ birthday: date }); // Set the moment object directly
  };
   const handlePhotoChange = (info: { file: RcFile }) => {
     const file = info.file;
     handleFormData({ ...formData, file }); // Pass the file along with other form data
   };

   

  return (
    <>
      {/* first row */}
      <Row gutter={16}>
        <Col span={8}>
          {/* <Col  xs={24} sm={12} md={8} lg={6}> */}
          <Form.Item
            label="የማዕረግ መጠሪያ"
            name="title"
            rules={[{ required: true, message: "Please select a title" }]}
          >
            <Select>
              <Option value="ato">Ato</Option>
              <Option value="doctor">Doctor</Option>
              <Option value="Constable">ኮንስታብል</Option>
              <Option value="Assistant Sergeant">ረዳት ሳጅን</Option>
              <Option value="Deputy Sergeant">ምክትል ሳጅን</Option>
              <Option value="Sergeant">ሳጅን</Option>
              <Option value="Chief Sergeant">ዋና ሳጅን</Option>
              <Option value="Assistant Inspector">ረዳት ኢንስፔክተር</Option>
              <Option value="Deputy Inspector">ምክትል ኢንስፔክተር</Option>
              <Option value="Inspector">ኢንስፔክተር</Option>
              <Option value="Chief Inspector">ዋና ኢንስፔክተር</Option>
              <Option value="DeputyCommander">ምክትል ኮማንደር</Option>
              <Option value="Commander">ኮማንደር</Option>
              <Option value="Assistant Commissioner">ረዳት ኮሚሽነር</Option>
              <Option value="Deputy Commissioner">ምክትል ኮሚሽነር</Option>
              <Option value="Commissioner General">ኮሚሽነር ጀነራል</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* <Col  xs={24} sm={12} md={8} lg={6}> */}
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name" },
              { validator: validateName },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Middle Name"
            name="middleName"
            rules={[{ validator: validateName }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      {/* second Row */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please enter your last name" },
              { validator: validateName },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: "Please select your birthday" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              onChange={() => handleDatePickerChange}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Employment Date"
            name="employmentDate"
            // rules={[{ required: true, message: "Please select employment date" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              onChange={() => handleDatePickerChange}
            />
          </Form.Item>
        </Col>
      </Row>
      {/* Third Row */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Please select your position" }]}
          >
            <Select placeholder="Select a position">
              {positions.map((position) => (
                <Option
                  key={position}
                  value={position.toLowerCase().replace(" ", "")}
                >
                  {position}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Department"
            name="department"
            rules={[
              { required: true, message: "Please select your department" },
            ]}
          >
            <Select placeholder="Select a department">
              {departments.map((department) => (
                <Option
                  key={department}
                  value={department.toLowerCase().replace(" ", "")}
                >
                  {department}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Ethnicity"
            name="ethnicity"
            rules={[
              {
                required: true,
                message: "Please enter your ethnicity",
              },
            ]}
          >
            <Select placeholder="Select Ethnicity">
              <Option value="Afar">Afar</Option>
              <Option value="Amhara">Amhara</Option>
              <Option value="Gurage">Gurage</Option>
              <Option value="Harari">Harari</Option>
              <Option value="Oromo">Oromo</Option>
              <Option value="Tigray">Tgray</Option>
              <Option value="Sidama">Sidama</Option>
              <Option value="snnp">SNNP</Option>
              <Option value="Somalie">Somalie</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Photo"
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={(e) => [e.file]}
            rules={[{ required: true, message: "Please upload your photo" }]}
          >
            <Upload
              beforeUpload={(file) => {
                handlePhotoChange({ file });
                return false; // Prevent default behavior (auto-upload)
              }}
              showUploadList={false}
              action="http://localhost:8000/uploads" //  the server endpoint for file upload
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
            ]}
          >
            <Input.Group compact>
              {/* Ethiopian country code */}
              <Form.Item
                name={["phoneNumber", "prefix"]}
                initialValue="+251"
                noStyle
              >
                <Input style={{ width: "20%" }} readOnly />
              </Form.Item>
              {/* Phone number input */}
              <Form.Item
                name={["phoneNumber", "number"]}
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                  {
                    pattern: /^[0-9]{9}$/,
                    message: "Phone number must be exactly 9 digits",
                  },
                ]}
              >
                <Input style={{ width: "80%" }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            Current Address
          </span>
        }
        // name="currentAddress"
      >
        <>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Region" name={["currentAddress", "region"]}>
                <Select
                  options={Object.keys(data)?.map((region) => ({
                    label: region,
                    value: region,
                  }))}
                  onChange={handleRegionChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Zone/Subcity"
                name={["currentAddress", "subcity"]}
              >
                <Select
                  options={
                    region
                      ? Object.keys(data[region])?.map((subcity) => ({
                          label: subcity,
                          value: subcity,
                        }))
                      : []
                  }
                  onChange={handleSubcityChange}
                  value={subcity}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Woreda" name={["currentAddress", "woreda"]}>
                <Select
                  options={
                    region && subcity
                      ? data[region][subcity]?.map((woreda) => ({
                          label: woreda,
                          value: woreda,
                        }))
                      : []
                  }
                  value={woreda}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="House Number"
                name={["currentAddress", "houseNumber"]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Leyu Bota"
                name={["currentAddress", "leyuBota"]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Camp" name={["currentAddress", "camp"]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </>
        {/* Sub-form for Current Address */}
      </Form.Item>

      <Button
        type="primary"
        onClick={nextStep}
        style={{ background: "#1890ff", borderColor: "#1890ff" }}
      >
        Next
      </Button>
    </>
  );
};

export default Step1;