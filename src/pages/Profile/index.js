import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Products from "./Products";
import UserBids from "./UserBids";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Bids" key="2">
          <UserBids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="flec flec-col w-1/3">
            <h1 className="text-primary text-xl flex justify-between">
              {" "}
              PERSONAL INFO
            </h1>
            <span className="text-primary text-xl flex justify-between">
              Name :<span className="text-xl">{user.name}</span>
            </span>
            <span className="text-primary text-xl flex justify-between">
              Email :<span className="text-xl">{user.email}</span>
            </span>
            <span className="text-primary text-xl flex justify-between">
              Created at :{""}
              <span className="text-xl">
                {moment(user.createdAt).format("MMM, DD, YYYY")}
              </span>
            </span>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
