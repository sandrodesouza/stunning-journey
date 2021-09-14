import { Input } from "antd";
const { Search } = Input;
import { Row, Col } from "antd";
import { Typography } from "antd";
const { Title } = Typography;

interface TableSearchProps {
  onSearch: any;
  title: string;
}

export const TableSearch: React.FC<TableSearchProps> = ({
  onSearch,
  title,
}) => {
  return (
    <Row>
      <Col span={16}>
        <Title level={4}>{title}</Title>
      </Col>
      <Col span={8}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          allowClear
        />
      </Col>
    </Row>
  );
};
