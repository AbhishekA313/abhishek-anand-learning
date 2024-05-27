import React from 'react';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Select, Upload, Button, notification } from 'antd';
import {API_URI} from "../Common/constants";

const { Option } = Select;

const CreateProduct = () => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    
    const openNotification = (message) => {
        api.open({
            message,
            duration: 5,
        });
    }

    const onFinish = async (values) => {
        values.product_image = values.product_image.file.originFileObj;
        try {
            const response = await axios.post(API_URI + '/create-product/add', values, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const responseData = response.data;
            openNotification(responseData.message);
        } catch(error) {
            console.log(error);
        }
    }

    return <>
        {contextHolder}
        <Form
            form={form}
            name="createProduct"
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
                <Select placeholder="Please Select">
                    <Option value="1">Yes</Option>
                    <Option value="2">No</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="product_name"
                label="Product Name"
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
                name="sku"
                label="Product SKU"
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
                name="availability"
                label="Availability"
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
                name="price"
                label="Price"
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
                name="inventory"
                label="Inventory"
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
                name="product_image"
                label="Product Image"
                rules={[
                    {
                        required: true,
                        message: 'This field is required.'
                    }
                ]}
            >
                <Upload>
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
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
                <Button type="primary" htmlType="submit">Add Product</Button>
            </Form.Item>
        </Form>
    </>
}

export default CreateProduct;