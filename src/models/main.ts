/* eslint-disable camelcase */
import { createModel } from '@rematch/core';
import type { RootModel } from '.';
import type { MenuProps } from 'antd';
import { produce } from 'immer';
import {fetchFolder,IParams} from '@service/folder';

type IFile = {
  id: string;
  title: string
}
type MenuItem = Required<MenuProps>['items'][number];
export type MainState = {
  folder: MenuItem[];
  files: IFile[]
};

let initialState: MainState = {
  folder: [],
  files: [
    {
      id: 'file_1',
      title: '文章1'
    }
  ],
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
  },
  effects: dispatch => {
    return {
      async getFolder(params: IParams): Promise<any> {
        const res: any = await fetchFolder(params);
        console.info('res',res)
        res.data.forEach(d => {
          d.key = d.NotebookID;
          d.label = d.Notebookname;
        })
        dispatch.main.ADD_FOLDER(res.data)
      },
    };
  },
});
