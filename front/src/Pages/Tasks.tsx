import { Empty } from "antd";

export interface Props {
  /** The user's name */
  name?: string;
  /** Should the name be rendered in bold */
  priority?: boolean;
}

export const Tasks: React.FC<Props> = (props) => {
  return <Empty description={"Tasks"} />;
};
