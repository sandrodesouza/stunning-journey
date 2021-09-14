import { useEffect, useState } from "react";
import { Table } from "antd";
import { TableSearch } from "../Components/TableSearch";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    ellipsis: true,
  },
  {
    title: "Name",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    ellipsis: true,
  },
  {
    title: "Company",
    dataIndex: "company",
    render: (company: any) => company.name,
    ellipsis: true,
  },
  {
    title: "City",
    dataIndex: "address",
    render: (address: any) => address.city,
    ellipsis: true,
  },
];

export const Users: React.FC = () => {
  const [data, setdata] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setloading(true);
    fetch("https://fakeapi.com/api/users")
      .then((response) => response.json())
      .then((response) => {
        setdata(response.data);
        setfilteredData(response.data);
        setloading(false);
      });
  };

  const isStringEmpty = (value: string) => !value || typeof value != "string";
  const isArrayEmpty = (arr: any) => Array.isArray(arr) && !arr.length;

  const filterData = (data: any, value: string) => {
    const lowerCaseValue = value.toLowerCase();
    return data.filter(
      (e: any) =>
        e?.username?.toLowerCase().includes(lowerCaseValue) ||
        e?.name?.toLowerCase().includes(lowerCaseValue) ||
        e?.email?.toLowerCase().includes(lowerCaseValue) ||
        e?.company?.name?.toLowerCase().includes(lowerCaseValue) ||
        e?.address?.city?.toLowerCase().includes(lowerCaseValue)
    );
  };

  const onSearch = (value: string) => {
    if (isStringEmpty(value) && isArrayEmpty(filteredData)) {
      setfilteredData(data);
    } else {
      setfilteredData(filterData(data, value));
    }
  };

  return (
    <>
      <TableSearch title="Users" onSearch={onSearch} />
      <Table
        columns={columns}
        rowKey={(record: any) => record.id}
        dataSource={filteredData}
        pagination={false}
        loading={loading}
      />
    </>
  );
};
