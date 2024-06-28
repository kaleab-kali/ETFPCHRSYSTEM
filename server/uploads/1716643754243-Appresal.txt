import React, { useState } from 'react';
import { Alert, Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';

import axios from 'axios';
import { Option } from 'antd/es/mentions';

const ApraisalForm = () => {
    const [added, setAdded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('');

    const [educationLevel, setApraisalRequest] = useState("");

    const onFinish = async (values:any) => {

        console.log(' apraisal to be added  :', values);
       
    } 
    const onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
    };
 


    if (successMessage) {
        return <Alert message={successMessage} type="success" showIcon closable onClose={() => setSuccessMessage('')} />
    }
    return (
        <div className='my-4 pt-4'>
            <span className='text-slate-700 text-2xl px-4 pt-44'>Apraisal Reguest </span>
            <hr className='h-2 w-full bg-blue-500 rounded-b-lg mb-5' />
            <div className='-ml-28  flex justify-center'>

                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='  flex flex-col  font-bold text-center shadow-lg p-8 mt-10 px-10 justify-center w-full'
                >


                    <Form.Item
                        label="ID "
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Your id!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input employee name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Current Level">
                    <Select onChange={(value) => setApraisalRequest(value)} placeholder="select your apraisal level">
                      <Option value="sagin">Sagin</Option>
                      <Option value="maingeneral">Main sagin</Option>
                      <Option value="general">General</Option>
                      <Option value="vicegeneral">Vice General</Option>
                      <Option value="colonel">Colonel</Option>
                      <Option value="vicecolonel">Vice colonel</Option>
                    </Select>
                  </Form.Item>
                   
                    <Form.Item label="Select Apraisal Level">
                    <Select onChange={(value) => setApraisalRequest(value)} placeholder="select apraisal level">
                      <Option value="sagin">Sagin</Option>
                      <Option value="maingeneral">Main sagin</Option>
                      <Option value="general">General</Option>
                      <Option value="vicegeneral">Vice General</Option>
                      <Option value="colonel">Colonel</Option>
                      <Option value="vicecolonel">Vice colonel</Option>
                    </Select>
                  </Form.Item>

                 <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button className='w-full bg-blue-600 text-blue-200 hover:text-slate-100' htmlType="submit">
                            Request Apraisal
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}




export default ApraisalForm;