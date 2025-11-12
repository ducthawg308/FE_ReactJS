import { Button, Form, Input, Card, notification, Typography } from 'antd';
import { loginApi } from '../util/api';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../components/context/auth.context';

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await loginApi(email, password);

    if (res && res.EC === 0) {
      localStorage.setItem('access_token', res.access_token);
      notification.success({
        message: 'Login user',
        description: 'Success',
      });
      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.user?.email ?? '',
          name: res?.user?.name ?? '',
        },
      });
      navigate('/');
    } else {
      notification.error({
        message: 'Login user',
        description: res?.EM ?? 'Error',
      });
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        padding: '1rem',
      }}
    >
      <Card
        bordered={false}
        style={{
          width: 400,
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          backgroundColor: '#ffffffee',
          backdropFilter: 'blur(8px)',
          padding: '2rem',
        }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Login
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '2rem' }}>
          Please enter your credentials to continue
        </Text>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Enter email" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" style={{ borderRadius: 8 }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
