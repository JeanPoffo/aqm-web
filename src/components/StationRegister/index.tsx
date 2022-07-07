/* eslint-disable no-unused-vars */
import {
  GlobalOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import {
  Modal,
  Form,
  Input,
  Button,
  message,
} from 'antd';
import { useCallback } from 'react';
import api from '../../services/api';

interface FormStation {
  name: string,
  latitude: string,
  longitude: string,
}

interface LoginProps {
  visible: boolean,
  setVisible: (visible: boolean) => void,
  callback: () => void,
}

export default function StationRegister({ visible, setVisible, callback }: LoginProps) {
  const [form] = Form.useForm();

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const onFinish = useCallback(async ({ name, latitude, longitude }: FormStation) => {
    api.post('station', {
      name,
      latitude,
      longitude,
    }).then((_) => {
      message.success('Estação salva!');
      setVisible(false);
      callback();
      form.resetFields();
    }).catch((_) => {
      message.warning('Erro ao salvar a estação, verifique os dados informados!');
    });
  }, []);

  return (
    <Modal
      title="Estação"
      footer={null}
      visible={visible}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="form_station"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Por favor insira o nome!',
            },
          ]}
        >
          <Input
            prefix={<IdcardOutlined />}
            placeholder="Nome"
            datatype="number"
          />
        </Form.Item>
        <Form.Item
          name="latitude"
          rules={[
            {
              required: true,
              message: 'Por favor insira a latitude!',
            },
          ]}
        >
          <Input
            prefix={<GlobalOutlined />}
            placeholder="Latitude"
          />
        </Form.Item>
        <Form.Item
          name="longitude"
          rules={[
            {
              required: true,
              message: 'Por favor insira a longitude!',
            },
          ]}
        >
          <Input
            prefix={<GlobalOutlined />}
            placeholder="Longitude"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
