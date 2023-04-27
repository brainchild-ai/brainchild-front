import React from 'react';
import { LockOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './index.module.less';
import loginPng from '@assets/login.png'
import {loginUser} from '@service/user';

type ILoginProps = {
  className?: string;
  style?: React.CSSProperties;
};

const Login: React.FC<ILoginProps> = () => {
  const navigate = useNavigate();
  const onFinish = async(values: any) => {
    console.log('Success:', values);
    const res:any = await loginUser(values)
    console.info(res)
    if(res.code === 0 && res.token) {
      // 放入全局
       window.__token = res.token;
       navigate('/main');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);

  };
  return (
    <div className={styles.login}>
      <div className={styles.head}>
        <span className={styles.logo}>脑洞星河Brainchild</span>
      </div>
      <div className={styles.content}>
        <div className={styles.loginForm}>
          <div className={styles.left}>
            <div className={styles.title}>登录</div>
            <Form
              name="normal_login"
              style={{width: 300}}
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="user"
                rules={[
                  { required: true, message: '请输入用户名' },
                ]}
              >
                <Input
                  prefix={<UserOutlined  />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: '请输入密码!' },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{width: '100%'}}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
            <Button type="link" icon={<WechatOutlined />}>微信登录</Button>
          </div>
          <div className={styles.right}><img src={loginPng} /></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
