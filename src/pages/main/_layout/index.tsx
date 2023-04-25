import React, { useEffect, useMemo } from 'react';
import {
  RobotOutlined,
  PlusCircleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  DeleteOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import { Avatar, Space, Menu } from 'antd';
import styles from './index.module.less';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@store';
import { cloneDeep } from 'lodash-es';
import Header from '@components/head';

type ILayoutProps = {
  className?: string;
  style?: React.CSSProperties;
};
type ILayoutState = {};

const Layout: React.FC<ILayoutProps> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch<Dispatch>();
  const { folder, selectNote } = useSelector((state: RootState) => state.main);

  useEffect(() => {
    dispatch.main.getFolder({
      page: 1,
      Limit: 20,
    });
  }, []);


  useEffect(() => {
    if (params.folderId && params.folderId !== 'recycle') {
      dispatch.main.SET_SELECTNOTE({
        folderId: params.folderId,
        fileId: params.fileId,
      });
      dispatch.main.getFolderDetail({
        NotebookID: params.folderId,
      });
    }
  }, [params.folderId]);


  const myfolder = useMemo(() => {
    const _folder = cloneDeep(folder);
    _folder.forEach((d: any) => {
      d.icon = <FolderOpenOutlined />;
      d.notelist = d.Notelist;
      delete d.NotebookID;
      delete d.Notebookname;
      delete d.Notelist;
    });
    return _folder;
  }, [folder]);

  const handleFolder = (item: any) => {
    dispatch.main.getFolderDetail({
      NotebookID: item.key,
    });
    if (item.key === 'recycle') {
      navigate(`/main/${item.key}`);
      dispatch.main.SET_SELECTNOTE({
        folderId: 'recycle',
        fileId: null,
      });
    } else {
      navigate(`/main/folder/${item.key}`);
      dispatch.main.SET_SELECTNOTE({
        folderId: item.key,
        fileId: null,
      });
    }
  };

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <div className={styles.sider}>
          <Menu
            mode="inline"
            selectedKeys={selectNote.folderId ? [selectNote.folderId] : []}
            onClick={handleFolder}
            items={myfolder}
          />
          <Menu
            mode="inline"
            selectedKeys={selectNote.folderId ? [selectNote.folderId] : []}
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
