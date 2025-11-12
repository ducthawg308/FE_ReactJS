import { Button, Form, Input, Card, notification, Typography } from 'antd';
import { createUserApi } from '../util/api';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { name, email, password } = values;
    const res = await createUserApi(name, email, password);

    if (res) {
      notification.success({
        message: 'Create user',
        description: 'Success',
      });
      navigate('/login');
    } else {
      notification.error({
        message: 'Create user',
        description: 'Error',
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
        background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
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
          Register Account
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '2rem' }}>
          Please fill in your details to create an account
        </Text>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Enter name" size="large" />
          </Form.Item>

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
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
