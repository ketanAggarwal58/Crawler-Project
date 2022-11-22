import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Breadcrumb, Menu, Avatar, Space, Table, Skeleton } from 'antd';
import { Route, Routes, Link } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
const {Content, Header, Footer, Sider} = Layout;

function Results() {
  const url = "http://localhost:8000/data";
  const [results, setResults] = useState(null);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'id',
      render: (number) => <p>{number}</p>,
    },
    {
      title: 'Brand Name',
      dataIndex: 'BrandName',
      key: 'name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Product Title',
      dataIndex: 'productTitle',
      key: 'address',
    },
    {
      title: 'Image URL',
      key: 'url',
      dataIndex: 'url',
      render: (text) => (
        <Space size="middle">
          <p>{text}</p>
        </Space>
      ),
    },
  ];

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
    // Authorization: apiKey,
  };

  useEffect(() => {
    try{
      axios.get(url, headers)
        .then(response => {
          console.log(response.status)
          setResults(
            response.data.map(row => ({
              ID: row.id,
              BrandName: row.brand,
              productTitle: row.title,
              url: row.image
            }))
            )
        })
      }catch(err){
        console.log("Error: "+err);
      }
    }, 
    [url]
  );

  if(results){
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
            <Table columns={columns} dataSource={results} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Layout example Created by KA</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }else{
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
          <Space
          direction="vertical"
          size="middle"
          style={{
            display: 'flex',
          }}
        >
          <Title level={4}>Scraped Data</Title>
          <Skeleton active />
          </Space>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design Layout example Created by KA</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
  }
}

export default Results;