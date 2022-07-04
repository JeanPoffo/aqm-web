import {
  ReactNode,
  useMemo,
  useState,
} from 'react';
import {
  BarChartOutlined,
  ApiOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hook/auth';

import Login from '../Login';

import logo from '../../assets/logo.png';

const { Header, Content, Sider } = Layout;

interface Properties {
  children: ReactNode,
}

export default function Dashboard({ children }: Properties) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigation = useNavigate();

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const selectedIndex = useMemo((): string[] => {
    switch (location.pathname) {
      case '/station':
        return ['2'];
      default:
        return ['1'];
    }
  }, []);

  const loginButton = useMemo(() => (
    <>
      {user === null ? 'Não Logado' : user.name}
      <UserOutlined style={{ fontSize: '23px' }} />
    </>
  ), [user]);

  const loginMenu = useMemo(() => (
    <Menu
      items={[
        user === null
          ? {
            label: 'Login',
            key: '1',
            onClick: () => setShowLogin(true),
          }
          : {
            label: 'Sair',
            key: '1',
            onClick: () => signOut(),
          },
      ]}
    />
  ), [user]);

  const sideMenu = useMemo(() => (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedIndex}
      items={[
        {
          key: 1,
          icon: <BarChartOutlined style={{ fontSize: '23px' }} />,
          label: 'Dashboard',
          style: { height: '60px', fontSize: '16px' },
          onClick: () => navigation({ pathname: '/' }),
        },
        user && {
          key: 2,
          icon: <ApiOutlined style={{ fontSize: '23px' }} />,
          label: 'Estações',
          style: { height: '60px', fontSize: '16px' },
          onClick: () => navigation({ pathname: '/station' }),
        },
      ]}
    />
  ), [user]);

  return (
    <Layout style={{ height: '100%' }}>
      <Login
        visible={showLogin}
        setVisible={setShowLogin}
      />
      <Sider
        breakpoint="lg"
        theme="dark"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          zIndex: 3,
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          height: '50px',
          margin: '5px',
        }}
        >
          <img src={logo} alt="Logo" />
        </div>
        {sideMenu}
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{
          position: 'fixed',
          zIndex: 2,
          width: '100%',
          color: '#fff',
          textAlign: 'end',
        }}
        >
          <div style={{ marginRight: 190 }}>
            <Dropdown overlay={loginMenu} placement="bottom">
              <Button style={{ height: '100%' }}>
                <Space>
                  {loginButton}
                </Space>
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content style={{
          padding: '20px 20px',
          marginTop: '64px',
        }}
        >
          {children}
        </Content>

      </Layout>
    </Layout>
  );
}
