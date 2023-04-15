import React from 'react';
import {
  RobotOutlined,
  PlusCircleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Avatar, Space ,Menu,} from 'antd';
import styles from './index.module.less';

type ILayoutProps = {
  className?: string;
  style?: React.CSSProperties;
};
type ILayoutState = {};

const Layout: React.FC<ILayoutProps> = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.head}>
        <div className={styles.left}>脑洞星河Brainchild</div>
        <div className={styles.right}>
          <Space size={[24, 24]}>
            <RobotOutlined
              style={{ fontSize: 24}}
            />
            <PlusCircleOutlined
              style={{ fontSize: 24}}
            />
            <Avatar icon={<UserOutlined />} />
          </Space>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.sider}>
        <Menu
          mode="inline"
          selectedKeys={['todo']}
          items={[
            {
              key: 'todo',
              icon: <FileTextOutlined />,
              label: 'TODO',
            }
          ]}
        />
        <Menu
          mode="inline"
          selectedKeys={['todo']}
          items={[

            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: '任务1',
            },
            {
              key: '3',
              icon: <VideoCameraOutlined />,
              label: '任务2',
            },

          ]}
        />
        <Menu
          mode="inline"
          selectedKeys={['todo']}
          items={[
            {
              key: 'delete',
              icon: <DeleteOutlined />,
              label: '回收站',
            },
          ]}
        />
        </div>
        <div className={styles.body}>我是正文</div>
      </div>
    </div>
  );
};

export default Layout;
