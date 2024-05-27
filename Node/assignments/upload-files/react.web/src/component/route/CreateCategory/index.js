import React from 'react';
import { Form, Input, Select, Button, notification } from 'antd';
import {API_URI} from "../Common/constants";

const { Option } = Select;

const CreateCategory = () => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    
    const openNotification = (message) => {
        api.open({
            message,
            duration: 5,
        });
    }

    const onFinish = async (values) => {
        try {
            const response = await fetch(API_URI + '/create-category/add', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    Accepts: "application/json",
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            })
            const responseData = await response.json();
            openNotification(responseData.message);
        } catch(error) {
            console.log(error);
        }
    }

    return <>
        {contextHolder}
        <Form
            form={form}
            name="createCategory"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="category_name"
                label="Category Name"
                rules={[
                    {
                        required: true,
                        message: 'This field is required.'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="include_in_menu"
                label="Include In Menu"
                rules={[
                    {
                        required: true,
                        message: 'This field is required.'
                    }
                ]}
            >
                <Select placeholder="Please Select">
                    <Option value="1">Yes</Option>
                    <Option value="2">No</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="is_active"
                label="Is Active"
                rules={[
                    {
                        required: true,
                        message: 'This field is required.'
                    }
                ]}
            >
                <Select placeholder="Please Select">
                    <Option value="1">Yes</Option>
                    <Option value="2">No</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">Create Category</Button>
            </Form.Item>
        </Form>
    </>
}

export default CreateCategory;