import React, { useState } from 'react';
import { Empty, RadioChangeEvent } from 'antd';
import { Button, Space } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Dispatch, store } from '@store';
import classnames from 'classnames';
import styles from './index.module.less';

type IFolderProps = {
  className?: string;
  style?: React.CSSProperties;
};
type IFolderState = {};

const Folder: React.FC<IFolderProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const { folderDetail, selectNote } = useSelector(
    (state: RootState) => state.main,
  );

  const handleFile = (d: T.NoteList) => {
    dispatch.main.SET_SELECTNOTE({
      fileId: d.NoteId,
    });
    navigate(`/main/folder/${folderDetail.NotebookID}/file/${d.NoteId}`);
  };
  return (
    <div className={styles.folder}>
      <div className={styles.head}>
        <div className={styles.title}>{folderDetail.NotebookName}</div>
        <div className={styles.action}>
          <Space>
            <Button type="primary">创建</Button>
            <Button>删除</Button>
          </Space>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.fileList}>
          {folderDetail.Notelist.length > 0 ? (
            folderDetail.Notelist.map((d) => {
              return (
                <div
                  onClick={() => handleFile(d)}
                  className={classnames(styles.file, {
                    [styles.active]: d.NoteId === selectNote.fileId,
                  })}
                  key={d.NoteId}
                >
                  {d.NoteName}
                </div>
              );
            })
          ) : (
            <Empty />
          )}
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Folder;
