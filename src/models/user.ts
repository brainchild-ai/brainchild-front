/* eslint-disable camelcase */
import { createModel } from '@rematch/core';
import type { RootModel } from '.';
import type { MenuProps } from 'antd';
import { produce } from 'immer';

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
      payload: MenuItem
    ) => {
      state.folder  = []
    },
  },
  effects: dispatch => {
    return {

    };
  },
});
