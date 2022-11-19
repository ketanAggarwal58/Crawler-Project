import './jobqueue.css';
import React, { useState } from 'react';
import {PlusOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, SearchOutlined} from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space,  Avatar, Card, Skeleton, Switch, Menu } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { Route, Routes, Link } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
const { Meta } = Card;
const { Option } = Select;
const {Content, Header, Footer, Sider} = Layout;

function JobQueue() {
    const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };
    return(
        <Layout>
        <Header style={{ padding: 10 }}>
          <Avatar style={{ float: 'right' }} src='./dp.png' />
          <Title style={{ color: 'white' }} level={3}>KA</Title>
        </Header>
        <Layout>
          <Sider>
            <Menu
              defaultSelectedKeys={['Job-Queue']}
              mode="inline"
            >
            <Menu.Item key='Dashboard'>
            <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key='Job-Queue'>
            <Link to="/jobqueue">Job Queue</Link>
            </Menu.Item>
            <Menu.Item key='Results Table'>
            <Link to="/results">Results Table</Link>
            </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Job Queue</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                <Row gutter={16}>
                <Col span={12}>
                    <Title level ={4}>Create New Job</Title>
                <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                    New Job
                </Button>
                <Drawer
                    title="Create a new Job"
                    width={720}
                    onClose={onClose}
                    open={open}
                    bodyStyle={{
                    paddingBottom: 80,
                    }}
                    extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onClose} type="primary">
                        Submit
                        </Button>
                    </Space>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                        <Form.Item
                            name="Job_name"
                            label="Job Name"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter user name',
                            },
                            ]}
                        >
                            <Input placeholder="Please enter user name" />
                        </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Form.Item
                            name="Job_url"
                            label="Job Url"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter url',
                            },
                            ]}
                        >
                            <Input
                            style={{
                                width: '100%',
                            }}
                            addonBefore="https://"
                            // addonAfter=".com"
                            placeholder="Please enter url"
                            />
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                        <Form.Item
                            name="owner"
                            label="Job Status"
                            rules={[
                            {
                                required: true,
                                message: 'Please select an owner',
                            },
                            ]}
                        >
                            <Select defaultValue={"in_progress"}>
                            <Option value="in_progress">in_progress</Option>
                            <Option value="enqueued">enqueued</Option>
                            <Option value="completed">completed</Option>
                            <Option value="failed">failed</Option>
                            </Select>
                        </Form.Item>
                        </Col>
                        </Row>
                    </Form>
                </Drawer>
                </Col>
                <Col span={12}>
                    <Title level ={4}>Search By Status</Title>
                    <Form layout="vertical" hideRequiredMark>
                    <Form.Item
                            name="Job Search"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter user name',
                            },
                            ]}
                        >
                                <Select defaultValue={"in_progress"}>
                                <Option value="in_progress">in_progress</Option>
                                <Option value="enqueued">enqueued</Option>
                                <Option value="completed">completed</Option>
                                <Option value="failed">failed</Option>
                                </Select>
                                <Button type="primary" icon={<SearchOutlined />} style={{ margin: '5px 0'}}>Search</Button>
                        </Form.Item>
                    </Form>
                    <Switch checked={!loading} onChange={onChange} />

        <Card
            style={{
            width: 540,
            marginTop: 16,
            }}
            loading={loading}
        >
            <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Card title"
            description="This is the description"
            />
        </Card>
                </Col>
                </Row>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design Layout example Created by KA</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
}

export default JobQueue;