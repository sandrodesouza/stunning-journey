import "./App.css";
import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { SiderMenu } from "./Components/SiderMenu";
import { RouterContent } from "./Components/RouterContent";
import { makeServer } from "./mock/server";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

const App = () => {
  return (
    <Router>
      <Layout>
        <SiderMenu />
        <Layout className="site-layout">
          <RouterContent />
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
