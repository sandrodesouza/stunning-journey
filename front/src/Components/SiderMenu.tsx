import * as React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  HomeOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;
import { Link } from "react-router-dom";

export const SiderMenu: React.FC = () => {
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        left: 0,
      }}
    >
      <Menu theme="dark" mode="inline">
        <Menu.Item key="0" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UnorderedListOutlined />}>
          <Link to="/tasks">Tasks</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
