import React, { useState } from 'react';
import { Layout, Breadcrumb, Menu, Avatar, Space, Table } from 'antd';
import { Route, Routes, Link } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
const {Content, Header, Footer, Sider} = Layout;

const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'id',
      render: (number) => <a>{number}</a>,
    },
    {
      title: 'Brand Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Product Title',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Image URL',
      key: 'url',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

function Results() {
    return(
        <Layout>
        <Header style={{ padding: 10 }}>
          <Avatar style={{ float: 'right' }} src='./dp.png' />
          <Title style={{ color: 'white' }} level={3}>KA</Title>
        </Header>
        <Layout>
          <Sider>
            <Menu
              defaultSelectedKeys={['Results-Table']}
              mode="inline"
            >
            <Menu.Item key='Dashboard'>
            <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key='Job-Queue'>
            <Link to="/jobqueue">Job Queue</Link>
            </Menu.Item>
            <Menu.Item key='Results-Table'>
            <Link to="/results">Results Table</Link>
            </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Result Table</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
            {/* code */}
            <Title level={4}>Scraped Data</Title>
            <Table columns={columns} dataSource={data} />;
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Layout example Created by KA</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
}

export default Results;