/* eslint-disable camelcase */
import { createModel } from '@rematch/core';
import type { RootModel } from '.';
import type { MenuProps } from 'antd';
import { produce } from 'immer';

type MenuItem = Required<MenuProps>['items'][number];
export type MainState = {
  folder: MenuItem[]
};

let initialState: MainState = {
  folder: [],
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
