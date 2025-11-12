import { Button, Form, Input, Card, notification } from 'antd';
import { loginApi } from '../util/api';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../components/context/auth.context';

const LoginPage = () => {
  const navigate = useNavigate();
  const {setAuth} = useContext(AuthContext);
  const onFinish = async (values) => {
    const {email, password} = values;
    const res = await loginApi(email, password);
    
    if(res && res.EC === 0){
        localStorage.setItem("access_token", res.access_token)
        notification.success({
            message: "Login user",
            description: "Success"
        });
        setAuth({
          isAuthenticated: true,
          user: {
              email: res?.user?.email ?? "",
              name: res?.user?.name ?? "",
          }
        })
        navigate("/");
    }else{
        notification.error({
            message: "Login user",
            description: res?.EM ?? "error", 
        })
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f6fa',
      }}
    >
      <Card
        title="Login"
        bordered={false}
        style={{
          width: 400,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: 12,
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
          layout='vertical'
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
