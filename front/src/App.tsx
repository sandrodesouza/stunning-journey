import "./App.css";
import { Layout } from "antd";
import { PageHeader } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { SiderMenu } from "./Components/SiderMenu";
import { RouterContent } from "./Components/RouterContent";

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
