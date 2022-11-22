import './jobqueue.css';
import React, { useState, useEffect } from 'react';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space,  Avatar, Card, Menu, Skeleton, Alert } from 'antd';
import axios from 'axios';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
const { Meta } = Card;
const { Option } = Select;
const {Content, Header, Footer, Sider} = Layout;

function JobQueue() {

    const getInitialState = () => {
        const value = "in_progress";
        return value;
      };

    const [jobName, setJobName] = useState("");
    const [jobURL, setJobURL] = useState("");
    const [jobStatus, setJobStatus] = useState(getInitialState);
    const [jobSearch, setJobSearch] = useState(getInitialState);
    const [queue, setQueue] = useState(null);

    const getUrl = "http://localhost:8000/data/queue";

    useEffect(() => {
        try{
          axios.get(getUrl, headers)
            .then(response => {
              console.log(response.status)
              setQueue(response.data)
            })
        }catch(err){
            console.log("Error: "+err);
          }
        },
        [getUrl]
      );

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost(jobStatus, jobName, jobURL);
     };
     
     const addPost = (status, name, url) => {
        axios.post("http://localhost:8000/data/queue", {
            status: status,
            name: name,
            url: 'https://'+url
        }).then(res => {
            if(res.status === 201){
                // <Alert message="Success Text" type="success" />
                console.log("posting Data", res)
            }
        }).catch(error => console.log("Error: "+error));
     };
    
    console.log(jobSearch);
    const url = 'http://localhost:8000/data/queue/' + jobSearch;
    const [queueDetails, setQueueDetails] = useState(null);

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
        // Authorization: apiKey,
    };

    const handleChangeStatus = (e) => {
        setJobStatus(e.target.value);
      };

    const handleSearch = (e) => {
        setJobSearch(e.target.value);
    }

    const doSearch = (e) => {
        console.log(jobSearch);
        search(url, headers);
    }

    const search = (url, headers) => {
        try{
            axios.get(url, headers)
                .then(response => {
                console.log(response.status)
                setQueueDetails(response.data)
            });
        }catch(err){
            console.log("Error: "+err);
        }
    };
        


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

    if(queueDetails){
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
                            <Space
                        direction="vertical"
                        size="middle"
                        style={{
                            display: 'flex',
                        }}
                        >
                        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                            New Job
                        </Button>
                        <Title level={4}>All Entries in Queue</Title>
                        {queue.map(queueDetail => 
                                    <Card
                                        style={{
                                        width: 540,
                                        marginTop: 16,
                                        }}
                                        loading={!loading}
                                    >
                                        <Meta
                                        title={queueDetail.job_name}
                                        description={
                                            "Url: "+ queueDetail.job_url
                                        }
                                        />
                                    </Card>
                                )}
                            </Space>
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
                                <Button onClick={ handleSubmit} type="primary">
                                Submit
                                </Button>
                            </Space>
                            }
                        >
                            <Form layout="vertical" hideRequiredMark >
                            <Row gutter={16}>
                                <Col span={12}>
                                <Form.Item
                                    name="Job_name"
                                    label="Job Name"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please enter job name',
                                    },
                                    ]}
                                >
                                    <Input onChange={(e) => { setJobName(e.target.value) }} placeholder="Please enter job name" />
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

                                    onChange={(e) => {setJobURL(e.target.value)}}
                                    addonBefore="https://"
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
                                    <Select defaultValue={"in_progress"} onChange ={(value) => setJobStatus(value)}>
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
                                            message: 'Please enter Job Status',
                                        },
                                    ]}
                                >
                                        <Select defaultValue={"in_progress"} onChange={(value) => setJobSearch(value)} >
                                            <Option value="in_progress">in_progress</Option>
                                            <Option value="enqueued">enqueued</Option>
                                            <Option value="completed">completed</Option>
                                            <Option value="failed">failed</Option>
                                        </Select>
                                        <Button onClick={doSearch} type="primary" icon={<SearchOutlined />} style={{ margin: '5px 0'}}>Search</Button>
                                </Form.Item>
                            </Form>

                            {
                                
                                queueDetails.map(queueDetail => 
                                    <Card
                                        style={{
                                        width: 540,
                                        marginTop: 16,
                                        }}
                                        loading={!loading}
                                    >
                                        <Meta
                                        title={queueDetail.job_name}
                                        description={
                                            "Url: "+ queueDetail.job_url
                                        }
                                        />
                                    </Card>
                                )
                            }
                        </Col>
                        </Row>
                    </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design Layout example Created by KA</Footer>
                </Layout>
                </Layout>
            </Layout>
            );
    }else{
        if(queue){
            return (
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
                            <Space
                        direction="vertical"
                        size="middle"
                        style={{
                            display: 'flex',
                        }}
                        >
                        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                            New Job
                        </Button>
                        <Title level={4}>All Entries in Queue</Title>
                        {queue.map(queueDetail => 
                                    <Card
                                        style={{
                                        width: 540,
                                        marginTop: 16,
                                        }}
                                        loading={!loading}
                                    >
                                        <Meta
                                        title={queueDetail.job_name}
                                        description={
                                            "Url: "+ queueDetail.job_url
                                        }
                                        />
                                    </Card>
                                )}
                        </Space>
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
                                <Button onClick={ handleSubmit } type="primary">
                                Submit
                                </Button>
                            </Space>
                            }
                        >
                            <Form layout="vertical" hideRequiredMark >
                            <Row gutter={16}>
                                <Col span={12}>
                                <Form.Item
                                    name="Job_name"
                                    label="Job Name"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please enter job name',
                                    },
                                    ]}
                                >
                                    <Input onChange={(e) => { setJobName(e.target.value) }} placeholder="Please enter job name" />
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

                                    onChange={(e) => {setJobURL(e.target.value)}}
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
                                    <Select defaultValue={"in_progress"} onChange={(value) => setJobStatus(value)}>
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
                                        message: 'Please enter Job Status',
                                    },
                                    ]}
                                >
                                        <Select defaultValue={"in_progress"} onChange = {(value) => {setJobSearch(value)}}>
                                        <Option value="in_progress">in_progress</Option>
                                        <Option value="enqueued">enqueued</Option>
                                        <Option value="completed">completed</Option>
                                        <Option value="failed">failed</Option>
                                        </Select>
                                        <Button onClick={ doSearch } type="primary" icon={<SearchOutlined />} style={{ margin: '5px 0'}}>Search</Button>
                                </Form.Item>
                            </Form>
                                    <Card
                                        style={{
                                        width: 540,
                                        marginTop: 16,
                                        }}
                                        loading={loading}
                                    >
                                        <Meta
                                        title="JOB Name"
                                        description="JOB URL"
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
        }else{
            return (
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
                            <Space
                        direction="vertical"
                        size="middle"
                        style={{
                            display: 'flex',
                        }}
                        >
                        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                            New Job
                        </Button>
                        <Title level={4}>All Entries in Queue</Title>
                        <Skeleton active />
                        </Space>
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
                                <Button onClick={ handleSubmit } type="primary">
                                Submit
                                </Button>
                            </Space>
                            }
                        >
                            <Form layout="vertical" hideRequiredMark >
                            <Row gutter={16}>
                                <Col span={12}>
                                <Form.Item
                                    name="Job_name"
                                    label="Job Name"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please enter job name',
                                    },
                                    ]}
                                >
                                    <Input onChange={(e) => { setJobName(e.target.value) }} placeholder="Please enter job name" />
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

                                    onChange={(e) => {setJobURL(e.target.value)}}
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
                                    <Select defaultValue={"in_progress"} onChange={(e) => {setJobStatus(e.target.value)}}>
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
                                        message: 'Please enter Job Status',
                                    },
                                    ]}
                                >
                                        <Select defaultValue={"in_progress"} onChange = {(value) => {setJobSearch(value)}}>
                                        <Option value="in_progress">in_progress</Option>
                                        <Option value="enqueued">enqueued</Option>
                                        <Option value="completed">completed</Option>
                                        <Option value="failed">failed</Option>
                                        </Select>
                                        <Button onClick={ doSearch } type="primary" icon={<SearchOutlined />} style={{ margin: '5px 0'}}>Search</Button>
                                </Form.Item>
                            </Form>
                                    <Card
                                        style={{
                                        width: 540,
                                        marginTop: 16,
                                        }}
                                        loading={loading}
                                    >
                                        <Meta
                                        title="JOB Name"
                                        description="JOB URL"
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
    }
}

export default JobQueue;