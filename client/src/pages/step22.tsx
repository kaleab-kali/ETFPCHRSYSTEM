import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Row,
  Col,
  AutoComplete,
} from "antd";
import { EmployeeProfileInfo } from "../../../shared/types/employeeProfileModel";
import { data } from "../utils/data";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";

type EthiopiaData = {
  [region: string]: {
    [subcity: string]: string[];
  };
};
const ethiopiaData = {
  "Addis Ababa": {
    "Kolfe Keranio": ["Woreda 1", "Woreda 2"],
    "Nifas Silk-Lafto": ["Woreda 3", "Woreda 4"],
    // other subcities...
  },
  Amhara: {
    "Bahir Dar": ["Woreda 5", "Woreda 6"],
    Gondar: ["Woreda 7", "Woreda 8"],
    // other subcities...
  },
  // other regions...
};
interface Step2Props {
  profileData: Partial<EmployeeProfileInfo>;
  onChange: (values: Partial<EmployeeProfileInfo>) => void;
}

const Step2: React.FC<Step2Props> = ({ profileData, onChange }) => {
  const [form] = Form.useForm();
  const [region, setRegion] = useState<string | null>(null);
  const [subcity, setSubcity] = useState<string | null>(null);
  const [woreda, setWoreda] = useState<string | null>(null);

  // Reset subcity and woreda when region changes
  useEffect(() => {
    if (region) {
      const subcities = Object.keys(data[region]);
      const firstSubcity = subcities[0];
      setSubcity(firstSubcity);
      form.setFieldsValue({ birthplaceInfo: { subcity: firstSubcity } });

      const woredas = data[region][firstSubcity];
      const firstWoreda = woredas[0];
      setWoreda(firstWoreda);
      form.setFieldsValue({
        birthplaceInfo: { woreda: firstWoreda },
      });
    }
  }, [region]);

  useEffect(() => {
    if (region && subcity) {
      const woredas = data[region][subcity];
      const firstWoreda = woredas[0];
      setWoreda(firstWoreda);
      form.setFieldsValue({ birthplaceInfo: { woreda: firstWoreda } });
    }
  }, [subcity]);

  const handleRegionChange = (value: string) => {
    setRegion(value);
  };

  const handleSubcityChange = (value: string) => {
    setSubcity(value);
  };

  const handleFormChange = (
    changedValues: Partial<EmployeeProfileInfo>,
    allValues: EmployeeProfileInfo
  ) => {
    console.log("Changed Values:", changedValues);
    console.log("All Form Data:", allValues);

    onChange({ ...profileData, ...allValues });
  };

  console.log("All profile Data:", profileData);

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        ...profileData,
        educationalInfo: profileData.education || [],
      }}
      onValuesChange={handleFormChange}
      style={{ padding: "24px", background: "#fff", borderRadius: "30px" }}
    >
      <Form.Item
        label="Salary"
        name="salary"
        rules={[{ required: true, message: "Please enter the salary" }]}
      >
        <Input />
      </Form.Item>
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key}>
                <Row gutter={16} align="middle">
                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      name={[name, "educationLevel"]}
                      label="Education Level"
                      rules={[
                        { required: true, message: "Missing education level" },
                      ]}
                    >
                      <Select
                        options={[
                          { label: "10th Grade", value: "10th Grade" },
                          { label: "12th Grade", value: "12th Grade" },
                          { label: "Diploma", value: "Diploma" },
                          {
                            label: "Bachelor's Degree",
                            value: "Bachelor's Degree",
                          },
                          {
                            label: "Master's Degree",
                            value: "Master's Degree",
                          },
                          { label: "PhD", value: "PhD" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      {...restField}
                      name={[name, "institution"]}
                      label="Institution"
                      rules={[
                        { required: true, message: "Missing institution" },
                      ]}
                    >
                      <Select
                        options={[
                          { label: "AAU", value: "AAU" },
                          { label: "AASTU", value: "AASTU" },
                          { label: "Admas University", value: "admas" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "fieldofstudy"]}
                      label="Field of Study"
                      rules={[
                        { required: true, message: "Missing field of study" },
                      ]}
                    >
                      <Input
                        disabled={
                          form.getFieldValue([
                            "education",
                            name,
                            "educationLevel",
                          ]) === "10th Grade" ||
                          form.getFieldValue([
                            "education",
                            name,
                            "educationLevel",
                          ]) === "12th Grade"
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "graduationYear"]}
                      label="Graduation Year"
                      rules={[
                        { required: true, message: "Missing graduation year" },
                        {
                          validator: (_, value) =>
                            !value ||
                            isNaN(value) ||
                            value < 1900 ||
                            value > new Date().getFullYear()
                              ? Promise.reject(
                                  new Error("Enter a valid graduation year")
                                )
                              : Promise.resolve(),
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Button
                      type="dashed"
                      onClick={() => remove(name)}
                      block
                      style={{ borderColor: "red" }}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Education
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item
        label={
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            Birthplace Information
          </span>
        }
      >
        {/* Sub-form for Birthplace Information */}
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Region" name={["birthplaceInfo", "region"]}>
                <Select
                  options={Object.keys(data).map((region) => ({
                    label: region,
                    value: region,
                  }))}
                  onChange={handleRegionChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Zone/Subcity"
                name={["birthplaceInfo", "subcity"]}
              >
                <Select
                  options={
                    region
                      ? Object.keys(data[region]).map((subcity) => ({
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
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Woreda" name={["birthplaceInfo", "woreda"]}>
                <Select
                  options={
                    region && subcity
                      ? data[region][subcity].map((woreda) => ({
                          label: woreda,
                          value: woreda,
                        }))
                      : []
                  }
                  value={woreda}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="House Number"
                name={["birthplaceInfo", "houseNumber"]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Leyu Bota"
                name={["birthplaceInfo", "leyuBota"]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </>
      </Form.Item>

      <Title level={4}>Mother's Information</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Mother's First Name"
            name={["motherInformation", "firstName"]}
            rules={[
              {
                required: true,
                message: "Please enter your mother's first name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Mother's Middle Name"
            name={["motherInformation", "middleName"]}
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter your mother's middle name",
            //   },
            // ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Mother's Last Name"
            name={["motherInformation", "lastName"]}
            rules={[
              {
                required: true,
                message: "Please enter your mother's last name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          {/* Input Group for Phone Number */}
          <Form.Item
            label="Mother's Phone Number"
            name={["motherInformation", "phoneNumber"]}
            rules={[
              {
                required: true,
                message: "Please enter your mother's phone number",
              },
            ]}
          >
            <Input.Group compact>
              {/* Ethiopian country code */}
              <Form.Item
                name={["motherInformation", "phoneNumber", "prefix"]}
                noStyle
                initialValue="+251"
              >
                <Input style={{ width: "20%" }} readOnly />
              </Form.Item>
              {/* Phone number input */}
              <Form.Item
                name={["motherInformation", "phoneNumber", "number"]}
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                  // {
                  //   pattern: /^[0-9]{9}$/,
                  //   message: "Phone number must be exactly 9 digits",
                  // },
                ]}
              >
                <Input style={{ width: "80%" }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Step2;
