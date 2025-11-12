import { useContext } from 'react';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
} from '@ant-design/icons';

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  console.log(">>> check auth: ", auth);

  const items = [
    {
      label: <Link to="/">Home Page</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    ...(auth.isAuthenticated
      ? [
          {
            label: <Link to="/user">Users</Link>,
            key: 'user',
            icon: <UserOutlined />,
          },
        ]
      : []),
    {
      label: `Welcome ${auth?.user?.email}`,
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: auth.isAuthenticated
        ? [
            {
              label: 'Đăng xuất',
              key: 'logout',
              icon: <LogoutOutlined />,
              onClick: () => {
                localStorage.removeItem('access_token');
                setAuth({
                  isAuthenticated: false,
                  user: { email: '', name: '' },
                });
                navigate('/');
              },
            },
          ]
        : [
            {
              label: <Link to="/login">Đăng nhập</Link>,
              key: 'login',
              icon: <LoginOutlined />,
            },
          ],
    },
  ];

  return <Menu mode="horizontal" items={items} />;
};

export default Header;
