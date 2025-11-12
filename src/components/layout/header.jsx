import { useContext, useState } from 'react';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Header = () => {
  const navigate = useNavigate();
  const {auth, setAuth} = useContext(AuthContext)
  console.log(">>> check auth: ", auth)

  const items = [
    {
      label: <Link to="/">Home Page</Link>,
      key: 'home',
      icon: <MailOutlined />,
    },

    ...(auth.isAuthenticated ? [{
      label: <Link to="/user">Users</Link>,
      key: 'user',
      icon: <MailOutlined />,
    },] : []),
    {
      label: `Welcome ${auth?.user?.email}`,
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: auth.isAuthenticated
        ? [
            {
              label: "Đăng xuất",
              key: "logout",
              onClick: () => {
                localStorage.removeItem("access_token");
                setAuth({
                  isAuthenticated: false,
                  user: { email: "", name: "" },
                });
                navigate("/");
              },
            },
          ]
        : [
            {
              label: <Link to="/login">Đăng nhập</Link>,
              key: "login",
            },
          ],
    }
  ];

  return (
    <Menu
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
