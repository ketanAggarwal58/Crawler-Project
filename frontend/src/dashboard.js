import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Menu, Icon, Breadcrumb, Button } from 'antd';
import ReactDOM from 'react-dom';
import Title from 'antd/lib/typography/Title';
import { Column } from '@ant-design/plots';

const {Content} = Layout;

const Columns = () => {
    const data = [
      {
        type: 'a',
        sales: 38,
      },
      {
        type: 'b',
        sales: 52,
      },
      {
        type: 'c',
        sales: 61,
      },
      {
        type: 'd',
        sales: 145,
      },
      {
        type: 'e',
        sales: 48,
      },
      {
        type: 'f',
        sales: 68,
      },
      {
        type: 'g',
        sales: 38,
      },
      {
        type: 'h',
        sales: 38,
      },
    ];
    const config = {
      data,
      xField: 'type',
      yField: 'sales',
      label: {
        position: 'middle',
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: 'ab',
        },
        sales: {
          alias: 'cd',
        },
      },
    };
    return <Column 
    width={50} 
    height={400}
    {...config} />;
  };

function Dashboard() {
    return(
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
            {/* code */}
            <Columns />
          </div>
        </Content>
    );
}

export default Dashboard;