import * as React from "react";
import { Layout, PageHeader } from "antd";
import Tasks from "../Pages/Tasks";
import Users from "../Pages/Users";
import { Home } from "../Pages/Home";
import { Switch, Route } from "react-router-dom";
const { Content } = Layout;

export const RouterContent: React.FC = () => {
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Stunning Journey"
        subTitle="React application that consumes the previous API"
      />
      <Content
        className="site-layout-background"
        style={{
          margin: "0px 16px 16px 16px",
          padding: 24,
          minHeight: 280,
        }}
      >
        <Switch>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Content>
    </>
  );
};
