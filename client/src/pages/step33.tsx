import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { EmployeeProfileInfo } from "../../../shared/types/employeeProfileModel";
import { data } from "../utils/data";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface Step3Props {
  profileData: Partial<EmployeeProfileInfo>;
  onChange: (values: Partial<EmployeeProfileInfo>) => void;
}

const Step3: React.FC<Step3Props> = ({ profileData, onChange }) => {
  const [form] = Form.useForm();
  const [address, setAddress] = useState<{
    [key: string]: {
      region: string | null;
      subcity: string | null;
      woreda: string | null;
    };
  }>({
    spouseInfo: { region: null, subcity: null, woreda: null },
    emergencyContact: { region: null, subcity: null, woreda: null },
  });
  const [maritalStatus, setMaritalStatus] = useState<string>("single");

  const handleAddressChange = (type: string, field: string, value: string) => {
    setAddress((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    Object.keys(address).forEach((type) => {
      const { region, subcity } = address[type];

      if (region) {
        const subcities = Object.keys(data[region]);
        const firstSubcity = subcities[0];
        handleAddressChange(type, "subcity", firstSubcity);
        form.setFieldsValue({ [type]: { address: { subcity: firstSubcity } } });
      }

      if (region && subcity) {
        const woredas = data[region][subcity];
        const firstWoreda = woredas[0];
        handleAddressChange(type, "woreda", firstWoreda);
        form.setFieldsValue({ [type]: { address: { woreda: firstWoreda } } });
      }
    });
  }, [address]);
  const handleMaritalStatusChange = (value: string) => {
    setMaritalStatus(value);
  };

  const handleFormChange = (
    changedValues: Partial<EmployeeProfileInfo>,
    allValues: EmployeeProfileInfo
  ) => {
    // Merge the changed values into the profileData
    onChange({ ...profileData, ...allValues });
    // const updatedProfileData = {
    //   ...profileData,
    //   ...allValues,
    // };
    // onChange(updatedProfileData);
  };

  return (
    <Form
      form={form}
      initialValues={profileData}
      onValuesChange={handleFormChange}
      layout="vertical"
    >
      {/* <Form.Item name={['address', 'city']} label="City">
        <Input />
      </Form.Item>
      <Form.Item name={['address', 'subcity']} label="Subcity">
        <Input />
      </Form.Item>
      <Form.Item name={['address', 'street']} label="Street">
        <Input />
      </Form.Item> */}
      <Form.Item
        label={
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            Emergency Contact Information
          </span>
        }
      >
        {/* Sub-form for Emergency Contact Information */}
        <>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="First Name"
                name={["emergencyContact", "info", "firstName"]}
                rules={[
                  { required: true, message: "Please enter the first name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Middle Name"
                name={["emergencyContact", "info", "middleName"]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Last Name"
                name={["emergencyContact", "info", "lastName"]}
                rules={[
                  { required: true, message: "Please enter the last name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Relationship"
                name={["emergencyContact", "info", "relationship"]}
                rules={[
                  { required: true, message: "Please select the relationship" },
                ]}
              >
                <Select>
                  <Option value="spouse">Spouse</Option>
                  <Option value="sibling">Sibling</Option>
                  <Option value="parent">Parent</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Phone Number"
                name={["emergencyContact", "info", "phoneNumber"]}
                rules={[
                  { required: true, message: "Please enter the phone number" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Email"
                name={["emergencyContact", "info", "email"]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                Emergency Contact Addres
              </span>
            }
          >
            {/* Sub-form for Address */}
            <>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Region"
                    name={["emergencyContact", "address", "region"]}
                  >
                    <Select
                      options={Object.keys(data).map((region) => ({
                        label: region,
                        value: region,
                      }))}
                      onChange={(value) =>
                        handleAddressChange("emergencyContact", "region", value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Zone/Subcity"
                    name={["emergencyContact", "address", "subcity"]}
                  >
                    <Select
                      options={
                        data &&
                        address["emergencyContact"].region &&
                        data[address["emergencyContact"].region]
                          ? Object.keys(
                              data[address["emergencyContact"].region]
                            ).map((subcity) => ({
                              label: subcity,
                              value: subcity,
                            }))
                          : []
                      }
                      onChange={(value) =>
                        handleAddressChange(
                          "emergencyContact",
                          "subcity",
                          value
                        )
                      }
                      value={address["emergencyContact"].subcity}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Woreda"
                    name={["emergencyContact", "address", "woreda"]}
                  >
                    <Select
                      options={
                        data &&
                        address["emergencyContact"].region &&
                        address["emergencyContact"].subcity &&
                        data[address["emergencyContact"].region][
                          address["emergencyContact"].subcity
                        ]
                          ? data[address["emergencyContact"].region][
                              address["emergencyContact"].subcity
                            ].map((woreda) => ({
                              label: woreda,
                              value: woreda,
                            }))
                          : []
                      }
                      value={address["emergencyContact"].woreda}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="House Number"
                    name={["emergencyContact", "address", "houseNumber"]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Leyu Bota"
                    name={["emergencyContact", "address", "leyuBota"]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </>
          </Form.Item>
        </>
      </Form.Item>

      <Form.Item
        label="Marital Status"
        name="maritalStatus"
        initialValue="single"
      >
        <Select onChange={handleMaritalStatusChange}>
          <Option value="married">Married</Option>
          <Option value="single">Single</Option>
          <Option value="divorced">Divorced</Option>
          <Option value="divorced">Widowed</Option>
        </Select>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.maritalStatus !== currentValues.maritalStatus
        }
      >
        {({ getFieldValue }) => {
          const currentStatus = getFieldValue("maritalStatus");

          return (
            <>
              {currentStatus === "married" && (
                <Form.Item label="Spouse Information" name="spouseInfo">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="First Name"
                        name={["spouseInfo", "firstName"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Middle Name"
                        name={["spouseInfo", "middleName"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Last Name"
                        name={["spouseInfo", "lastName"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      {/* <Form.Item
                        label="Date of Birth"
                        name={["spouseInfo", "dob"]}
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item> */}
                      <Form.Item
                        label="Date of Birth"
                        name={["spouseInfo", "dob"]}
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please select birth date",
                        //   },
                        // ]}
                      >
                        <DatePicker
                          format="DD/MM/YYYY"
                          onChange={(date, dateString) => {
                            console.log(date, dateString);
                          }}
                          disabledDate={(current) => {
                            // Disable future dates and dates less than 18 years ago
                            const eighteenYearsAgo = dayjs().subtract(
                              18,
                              "years"
                            );
                            return (
                              current &&
                              (current.isAfter(dayjs().endOf("day")) ||
                                current.isAfter(eighteenYearsAgo.endOf("day")))
                            );
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Phone Number"
                        name={["spouseInfo", "phoneNumber"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Address"
                    // name={["spouseInfo", "address", "currentAddress"]}
                  >
                    {/* Sub-form for Spouse Address */}
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          label="Region"
                          name={["spouseInfo", "address", "region"]}
                        >
                          <Select
                            options={Object.keys(data).map((region) => ({
                              label: region,
                              value: region,
                            }))}
                            onChange={(value) =>
                              handleAddressChange("spouseInfo", "region", value)
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Subcity"
                          name={["spouseInfo", "address", "subcity"]}
                        >
                          <Select
                            options={
                              address["spouseInfo"].region
                                ? Object.keys(
                                    data[address["spouseInfo"].region]
                                  ).map((subcity) => ({
                                    label: subcity,
                                    value: subcity,
                                  }))
                                : []
                            }
                            onChange={(value) =>
                              handleAddressChange(
                                "spouseInfo",
                                "subcity",
                                value
                              )
                            }
                            // onChange={handleSubcityChange}
                            value={address["spouseInfo"].subcity}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Woreda"
                          name={["spouseInfo", "address", "woreda"]}
                        >
                          <Select
                            options={
                              address["spouseInfo"].region &&
                              address["spouseInfo"].subcity
                                ? data[address["spouseInfo"].region][
                                    address["spouseInfo"].subcity
                                  ].map((woreda) => ({
                                    label: woreda,
                                    value: woreda,
                                  }))
                                : []
                            }
                            value={address["spouseInfo"].woreda}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form.Item>
              )}

              {currentStatus === "divorced" && (
                <Form.Item label="Divorced Information" name="divorcedInfo">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        label="Divorce Date"
                        name={["divorcedInfo", "divorceDate"]}
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    {/* ... (add other divorced fields) */}
                  </Row>
                </Form.Item>
              )}
            </>
          );
        }}
      </Form.Item>
    </Form>
  );
};

export default Step3;
