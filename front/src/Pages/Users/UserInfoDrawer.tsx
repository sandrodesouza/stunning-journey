import { Descriptions, Drawer } from "antd";
import UserInfoInterface from "./UserInfoInterface";

interface UserInfoDrawerInterface {
  onCloseUserInfo: any;
  userInfoVisible: boolean;
  userInfo: UserInfoInterface;
}

const UserInfoDrawer: React.FC<UserInfoDrawerInterface> = ({
  onCloseUserInfo,
  userInfoVisible,
  userInfo,
}) => {
  return (
    <Drawer
      width={500}
      title="User Info"
      placement="right"
      onClose={onCloseUserInfo}
      visible={userInfoVisible}
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Id">{userInfo.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{userInfo.name}</Descriptions.Item>
        <Descriptions.Item label="UserName">
          {userInfo.username}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{userInfo.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{userInfo.phone}</Descriptions.Item>
        <Descriptions.Item label="Website">
          {userInfo.website}
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          <Descriptions column={1}>
            <Descriptions.Item label="Street">
              {userInfo.address?.street}
            </Descriptions.Item>
            <Descriptions.Item label="Suite">
              {userInfo.address?.suite}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {userInfo.address?.city}
            </Descriptions.Item>
            <Descriptions.Item label="Zipcode">
              {userInfo.address?.zipcode}
            </Descriptions.Item>
            <Descriptions.Item label="Geo">
              {userInfo.address?.geo?.lat}, {userInfo.address?.geo?.lng}
            </Descriptions.Item>
          </Descriptions>
        </Descriptions.Item>
        <Descriptions.Item label="Company">
          <Descriptions column={1}>
            <Descriptions.Item label="Name">
              {userInfo.company?.name}
            </Descriptions.Item>
            <Descriptions.Item label="CatchPhrase">
              {userInfo.company?.catchPhrase}
            </Descriptions.Item>
            <Descriptions.Item label="BS">
              {userInfo.company?.bs}
            </Descriptions.Item>
          </Descriptions>
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default UserInfoDrawer;
