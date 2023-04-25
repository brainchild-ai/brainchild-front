/* eslint-disable camelcase */
import { createModel } from '@rematch/core';
import type { RootModel } from '.';
import type { MenuProps } from 'antd';
import { produce } from 'immer';
import {fetchFolder,IParams,fetchFolderDetail,IDetailParams} from '@service/folder';

type IFile = {
  id: string;
  title: string
}
type MenuItem = Required<MenuProps>['items'][number];
export type MainState = {
  folder: MenuItem[];
  folderDetail: T.FolderDetail;
  selectNote: {
    folderId?:string;
    fileId?: string;
  }
};

let initialState: MainState = {
  folder: [],
  folderDetail:{
    NotebookID: '1',
    NotebookName: '笔记1',
    Notelist: [],
  },
  selectNote: {
    folderId: null,
    fileId: null,
  }
};

export const main = createModel<RootModel>()({
  name: 'main',
  state: initialState,
  reducers: {
    ADD_FOLDER: (
      state: MainState,
      payload: MenuItem[],
    ) => {
      state.folder = payload;
    },
    SET_SELECTNOTE: ( state: MainState,
      payload: MainState['selectNote']) => {
        state.selectNote = {
          ...state.selectNote,
          ...payload,
        }
    },
    UPDATE_FOLDER_DETAIL: (
      state: MainState,
      payload: T.FolderDetail,
    ) => {
      state.folderDetail = payload;
    },
  },
  effects: dispatch => {
    return {
      async getFolder(params: IParams): Promise<any> {
        const res: any = await fetchFolder(params);
        res.data.forEach(d => {
          d.key = d.NotebookID;
          d.label = d.Notebookname;
        })
        dispatch.main.ADD_FOLDER(res.data)
      },
      async getFolderDetail(params: IDetailParams): Promise<any> {
        const res: any = await fetchFolderDetail({
          token: '123456',
          ...params,
        });
        dispatch.main.UPDATE_FOLDER_DETAIL(res.data)
      },
    };
  },
});
