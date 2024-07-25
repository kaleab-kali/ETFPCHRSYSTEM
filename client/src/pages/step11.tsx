import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Select, DatePicker, Radio, Upload, Button } from "antd";
import { EmployeeProfileInfo } from "../../../shared/types/employeeProfileModel";
import { data } from "../utils/data";
import { PositionInfo } from "../../../shared/types/positionTypes";
import { DepartmentInfo } from "../../../shared/types/departmentTypes";
import { TitleInfo } from "../../../shared/types/titlesTypes";
import { useAllPositions } from "../services/queries/positionQueries";
import { useAllDepartments } from "../services/queries/departmentQueries";
import { useAllTitles } from "../services/queries/titleQueries";
import { UploadChangeParam } from "antd/lib/upload";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface Step1Props {
  profileData: Partial<EmployeeProfileInfo>;
  onChange: (values: Partial<EmployeeProfileInfo>) => void;
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

const Step1: React.FC<Step1Props> = ({ profileData, onChange }) => {
  const {t} = useTranslation();
  const [form] = Form.useForm();
  const [region, setRegion] = useState<string | null>(null);
  const [subcity, setSubcity] = useState<string | null>(null);
  const [woreda, setWoreda] = useState<string | null>(null);
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(null);

  const positionDataQueries = useAllPositions();
  const departmentDataQueries = useAllDepartments();
  const titleDataQueries = useAllTitles();

  const positionSource = positionDataQueries.data
    ? positionDataQueries.data.map((queryResult: PositionInfo) => {
        return {
          posName: queryResult.posName,
        };
      })
    : [];
  console.log("Department Data:", departmentDataQueries.data);
  const departmentSource = departmentDataQueries.data
    ? departmentDataQueries.data.map((queryResult: DepartmentInfo) => {
        return {
          depName: queryResult.departmentName,
        };
      })
    : [];
  console.log("Department Source:", departmentSource);
  console.log("Title Data:", titleDataQueries.data);
  const titleSource = titleDataQueries.data
    ? titleDataQueries.data.map((queryResult: TitleInfo) => {
        return {
          titleName: queryResult.titleName,
        };
      })
    : [];

  const handleFormChange = (changedValues: any, allValues: any) => {
    onChange({ ...profileData, ...allValues });
  };

  const validateName = (
    _rule: any,
    value: string,
    callback: (error?: string) => void
  ) => {
    // Regular expression to check for numbers or unknown characters
    const nameRegex = /^[a-zA-Z\s]*$/;
    // Check if the length of the name is less than 3 characters
    if (value && (value.length < 3 || !nameRegex.test(value))) {
      callback(
        "Please enter a valid name with at least 3 characters and no numbers or special characters."
      );
    } else {
      callback();
    }
  };
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
  // const handleDatePickerChange = (
  //   date: moment.Moment | null,
  //   dateString: string
  // ) => {
  //   form.setFieldsValue({ birthday: date }); // Set the moment object directly
  // };
  const handleDatePickerChange = (
    date: dayjs.Dayjs | null,
    dateString: string | string[]
  ) => {
    setToDate(date);
    form.setFieldsValue({ birthday: date });
  };
  

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={profileData}
      onValuesChange={handleFormChange}
    >
      <Row gutter={16}>
        <Col span={8}>
          {/* <Col  xs={24} sm={12} md={8} lg={6}> */}
          <Form.Item
            label={t('title')}
            name="title"
            rules={[{ required: true, message: "Please select a title" }]}
          >
            {/* <Select>
              {titleSource.map((title) => (
                <Option key={title.titleName} value={title.titleName}>
                  {title.titleName}
                </Option>
              ))}
            </Select> */}
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
            label={t('firstName')}
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
            label={t('middleName')}
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
            label={t('lastName')}
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
          {/* <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker format="DD/MM/YYYY" onChange={handleDatePickerChange} />
          </Form.Item> */}
          <Form.Item
            label={t('birthday')}
            name="birthday"
            rules={[{ required: true, message: "Please select birth date" }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              onChange={(date, dateString) => {
                console.log(date, dateString);
              }}
              disabledDate={(current) => {
                // Disable future dates and dates less than 18 years ago
                const eighteenYearsAgo = dayjs().subtract(18, "years");
                return (
                  current &&
                  (current.isAfter(dayjs().endOf("day")) ||
                    current.isAfter(eighteenYearsAgo.endOf("day")))
                );
              }}
            />
          </Form.Item>
          {/* <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              onChange={(date) => {
                const formattedDate = date
                  ? dayjs(date).format("D/M/YYYY")
                  : null;
                form.setFieldsValue({ birthday: formattedDate });
              }}
            />
          </Form.Item> */}

          {/* <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: "Please select your birthday" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              onChange={() => handleDatePickerChange}
            />
          </Form.Item> */}
        </Col>
        <Col span={8}>
          <Form.Item
            label="employmentDate"
            name="employmentDate"
            rules={[
              { required: true, message: "Please select employment date" },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              onChange={(date, dateString) => {
                console.log(date, dateString);
              }}
              disabledDate={(current) => {
                // Disable future dates
                return current && current.isAfter(dayjs().endOf("day"));
              }}
            />
          </Form.Item>
          {/* <Form.Item
            label="Employment Date"
            name="employmentDate"
            // rules={[{ required: true, message: "Please select employment date" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              onChange={() => handleDatePickerChange}
            />
          </Form.Item> */}
        </Col>
      </Row>
      {/* Third Row */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label={t('position')}
            name="position"
            rules={[{ required: true, message: "Please select your position" }]}
          >
            <Select placeholder="Select a position">
              {positionSource.map((position) => (
                <Option key={position.posName} value={position.posName}>
                  {position.posName}
                </Option>
              ))}

              {/* {positions.map((position) => (
                <Option
                  key={position}
                  value={position.toLowerCase().replace(" ", "")}
                >
                  {position}
                </Option>
              ))} */}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('department')}
            name="department"
            rules={[
              { required: true, message: "Please select your department" },
            ]}
          >
            <Select placeholder="Select a department">
              {departmentSource.map((department) => (
                <Option key={department.depName} value={department.depName}>
                  {department.depName}
                </Option>
              ))}
              {/* {departments.map((department) => (
                <Option
                  key={department}
                  value={department.toLowerCase().replace(" ", "")}
                >
                  {department}
                </Option>
              ))} */}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('ethnicity')}
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
      {/* fourth row */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="photo"
            label="Photo"
            valuePropName="fileList"
            getValueFromEvent={(e: any) =>
              Array.isArray(e) ? e : e && e.fileList
            }
            rules={[{ required: true, message: "Please upload a photo" }]}
          >
            <Upload name="photo" listType="picture" beforeUpload={() => false}>
              <Button>Upload Photo</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t('gender')}
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
      {/* fitfth row */}

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={t('phoneNumber')}
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

        <Col span={12}>
          <Form.Item
            label={t('email')}
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* address row */}
      <Form.Item
        label={
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            {t('currentAddress')}
          </span>
        }
        // name="currentAddress"
      >
        <>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={t('region')} name={["currentAddress", "region"]}>
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
                label={t('subcity')}
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
              <Form.Item label={t('woreda')} name={["currentAddress", "woreda"]}>
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
                label={t('houseNumber')}
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
    </Form>
  );
};

export default Step1;
