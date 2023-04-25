import React, { useEffect, useMemo } from 'react';
import {
  RobotOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './index.module.less';

type IHeadProps = {
  className?: string;
  style?: React.CSSProperties;
};
type IHeadState = {};

const Head: React.FC<IHeadProps> = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.head}>
      <div className={styles.left}>脑洞星河Brainchild</div>
      <div className={styles.right}>
        <Space size={[24, 24]}>
          <RobotOutlined
            style={{ fontSize: 24 }}
            onClick={() => navigate('/gpt')}
          />
          <PlusCircleOutlined style={{ fontSize: 24 }} />
          <Avatar icon={<UserOutlined />} />
        </Space>
      </div>
    </div>
  );
};

export default Head;
