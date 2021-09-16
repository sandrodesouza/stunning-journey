import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { TableSearch } from "../../Components/TableSearch";
import ApiCalls from "../../Services/ApiCalls";
import Validations from "../../Services/Validations";
import UserInfoDrawer from "./UserInfoDrawer";
import UserInfoInterface from "./UserInfoInterface";

const userInfoInit: UserInfoInterface = {};

export const Users: React.FC = () => {
  const [data, setdata] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [loading, setloading] = useState(false);
  const [userInfoVisible, setuserInfoVisible] = useState(false);
  const [userInfo, setuserInfo] = useState(userInfoInit);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setloading(true);
    ApiCalls.getUsers()
      .then((response) => {
        setdata(response.data);
        setfilteredData(response.data);
      })
      .finally(() => setloading(false));
  };

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
    if (
      Validations.isStringEmpty(value) &&
      Validations.isArrayEmpty(filteredData)
    ) {
      setfilteredData(data);
    } else {
      setfilteredData(filterData(data, value));
    }
  };

  const showUserInfo = (userInfo: UserInfoInterface) => {
    setuserInfo(userInfo);
    setuserInfoVisible(true);
  };
  const onCloseUserInfo = () => {
    setuserInfo({});
    setuserInfoVisible(false);
  };

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
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Button size="small" onClick={() => showUserInfo(record)}>
          Details
        </Button>
      ),
    },
  ];

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
      <UserInfoDrawer
        onCloseUserInfo={onCloseUserInfo}
        userInfoVisible={userInfoVisible}
        userInfo={userInfo}
      />
    </>
  );
};
