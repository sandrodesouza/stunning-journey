import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { TableSearch } from "../../Components/TableSearch";
import ApiCalls from "../../Services/ApiCalls";
import Validations from "../../Services/Validations";

export const Tasks: React.FC = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [pagination, setpagination] = useState({
    current: 1,
    total: 0,
  });
  const [filters, setfilters] = useState({});

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const processResponse = (response: any) => {
    setdata(response.data);
    setpagination({
      ...pagination,
      total: response.total_items,
    });
  };

  const fetchTasks = () => {
    setloading(true);
    ApiCalls.getTasks(pagination, filters)
      .then(processResponse)
      .finally(() => setloading(false));
  };

  const onSearch = (value: string) => {
    setpagination({
      ...pagination,
      current: 1,
    });
    setfilters({
      ...filters,
      title: !Validations.isStringEmpty(value) ? value : null,
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      ellipsis: true,
    },
    {
      title: "Title",
      dataIndex: "title",
      ellipsis: true,
      width: "70%",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      filters: [
        {
          text: "Completed",
          value: "true",
        },
        {
          text: "Not Completed",
          value: "false",
        },
      ],
      render: (completed: boolean) => (
        <Tag color={completed ? "geekblue" : "volcano"} key={"tag"}>
          {completed?.toString().toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "User",
      dataIndex: "user_id",
      ellipsis: true,
    },
  ];

  const handleTableChange = (pagination: any, filtersTable: any) => {
    // console.log("pagination", pagination);
    // console.log("filters", filtersTable);
    setfilters({ ...filters, ...filtersTable });
    setpagination(pagination);
  };

  return (
    <>
      <TableSearch title="Tasks" onSearch={onSearch} />
      <Table
        columns={columns}
        rowKey={(record: any) => record.id}
        dataSource={data}
        pagination={{ ...pagination, showSizeChanger: false }}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};
