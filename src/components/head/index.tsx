import React, { useEffect, useMemo } from 'react';
import {
  RobotOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Popover, Space, Tooltip } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useModal } from '@components/modal';
import styles from './index.module.less';
import AddFloderModal from './addFloderModal'

type IHeadProps = {
  className?: string;
  style?: React.CSSProperties;
};
type IHeadState = {};

const Head: React.FC<IHeadProps> = () => {
  const navigate = useNavigate();
  const modal = useModal();


  const addFolder = () => {
    //
  }
  const handleAddFolder = () => {
    modal.show(
      {
        content: (
          <AddFloderModal onOk={addFolder}/>
        ),
      },
      {
        title: '新增目录',
        width: 500,
      },
    );
  }
  return (
    <div className={styles.head}>
      <div className={styles.left}>脑洞星河Brainchild</div>
      <div className={styles.right}>
        <Space size={[24, 24]}>
          <RobotOutlined
            style={{ fontSize: 24 }}
            onClick={() => navigate('/gpt')}
          />
          <Tooltip title="添加新的目录">
            <PlusCircleOutlined
              style={{ fontSize: 24 }}
              onClick={handleAddFolder}
            />
          </Tooltip>
          <Avatar icon={<UserOutlined />} />
        </Space>
      </div>
    </div>
  );
};

export default Head;
