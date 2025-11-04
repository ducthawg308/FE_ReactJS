import { Button, Form, Input, Card, notification } from 'antd';
import { createUserApi } from '../util/api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const {name, email, password} = values;
    const res = await createUserApi(name, email, password);
    if(res){
      notification.success({
        message: "Create user",
        description: "Success"
      });
      navigate("/login");
    }else{
      notification.error({
        message: "Create user",
        description: "error"    
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
        title="Register Account"
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

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
