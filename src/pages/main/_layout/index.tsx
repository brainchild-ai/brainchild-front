import React, { useEffect, useMemo } from 'react';
import {
  RobotOutlined,
  PlusCircleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  DeleteOutlined,
  FolderOpenOutlined
} from '@ant-design/icons';
import { Avatar, Space, Menu } from 'antd';
import styles from './index.module.less';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch,RootState } from '@store';
import { cloneDeep } from 'lodash-es';
import Header from '@components/head';

type ILayoutProps = {
  className?: string;
  style?: React.CSSProperties;
};
type ILayoutState = {};

const Layout: React.FC<ILayoutProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const { folder } = useSelector((state: RootState) => state.main);

  useEffect(() => {
    dispatch.main.getFolder({
      token: '123456',
      page: 1,
      Limit: 20,
    });
  }, []);

   const myfolder = useMemo(() => {
    const _folder = cloneDeep(folder)
    _folder.forEach((d:any) => {
      d.icon = <FolderOpenOutlined />
    })
    return _folder;
   },[folder])

  const handleFolder = (item: any) => {
    if (item.key === 'recycle') {
      navigate(`/main/${item.key}`);
    } else {
      navigate(`/main/folder/${item.key}`);
    }
  };

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <div className={styles.sider}>
          <Menu
            mode="inline"
            selectedKeys={['todo']}
            onClick={handleFolder}
            items={myfolder}
          />
          <Menu
            mode="inline"
            selectedKeys={['todo']}
            onClick={handleFolder}
            items={[
              {
                key: 'recycle',
                icon: <DeleteOutlined />,
                label: '回收站',
              },
            ]}
          />
        </div>
        <div className={styles.body}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
