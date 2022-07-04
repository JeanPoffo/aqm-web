/* eslint-disable no-unused-vars */
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Modal,
  Form,
  Input,
  Button,
  message,
} from 'antd';
import { useCallback } from 'react';
import { useAuth } from '../../hook/auth';

interface FormLogin {
  login: string,
  password: string,
}

interface LoginProps {
  visible: boolean,
  setVisible: (visible: boolean) => void,
}

export default function Login({ visible, setVisible }: LoginProps) {
  const { signIn } = useAuth();

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const onFinish = useCallback(async (credentials: FormLogin) => {
    const loginSuccess = await signIn(credentials);

    if (loginSuccess) {
      setVisible(false);
    } else {
      message.warning('Login e/ou Senha Incorretos!');
    }
  }, []);

  return (
    <Modal title="Login" footer={null} visible={visible} onCancel={handleCancel}>
      <Form
        name="form_login"
        onFinish={onFinish}
      >
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: 'Por favor insira seu login!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Login"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor insira sua senha!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Logar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
