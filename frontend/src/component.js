import React from 'react';
import { Layout, Avatar, Menu } from 'antd';
import Results from './resultTable';
import JobQueue from './jobQueue';
import Dashboard from './dashboard';
import Title from 'antd/lib/typography/Title';
import { Route, Routes, Link } from 'react-router-dom';

const { Header, Footer, Sider } = Layout;

export function Component2() {
    return(
        <>
        <Layout>
        <Header style={{ padding: 10 }}>
          <Avatar style={{ float: 'right' }} src='./dp.png' />
          <Title style={{ color: 'white' }} level={3}>KA</Title>
        </Header>
        <Layout>
          <Sider>
            <Menu
              defaultSelectedKeys={['Dashboard']}
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
            <Content1 />
            <Footer style={{ textAlign: 'center' }}>Ant Design Layout example Created by KA</Footer>
          </Layout>
        </Layout>
      </Layout>
        </>
    );
}

function Content1(){
    return (
      <>
        <div>
          <Routes>
              <Route path = "/" element = {
                <Dashboard />
              }></Route>
              <Route path = "/jobqueue" element = {
                <JobQueue />
              }></Route>
              <Route path = "/results" element = {
                <Results />
              }></Route>
          </Routes>
        </div>
      </>
    );
  }