import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, Space } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Dispatch, store } from '@store';
import styles from './index.module.less';

type IFolderProps = {
  className?: string;
  style?: React.CSSProperties;
};
type IFolderState = {};

const Folder: React.FC<IFolderProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { files } = useSelector((state: RootState) => state.main);

  const handleFile = (d: { id: string }) => {
    console.info(d);
    console.info(location);
    navigate(`${location.pathname}/file/${d.id}`);
  };
  return (
    <div className={styles.folder}>
      <div className={styles.head}>
        <div className={styles.title}>
          主题{Math.floor(Math.random() * 100)}
        </div>
        <div className={styles.action}>
          <Space>
            <Button type="primary">创建</Button>
            <Button>删除</Button>
          </Space>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.fileList}>
          {files.map((d) => {
            return (
              <div
                onClick={() => handleFile(d)}
                className={styles.file}
                key={d.id}
              >
                {d.title}
              </div>
            );
          })}
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Folder;
