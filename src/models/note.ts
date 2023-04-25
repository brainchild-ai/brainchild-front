/* eslint-disable camelcase */
import { createModel } from '@rematch/core';
import type { RootModel } from '.';
import type { MenuProps } from 'antd';
import { produce } from 'immer';
import { fetchNoteDetail, INoteParams } from '@service/note';

export type NoteState = {
  file: {
    Content: string;
  };
};

let initialState: NoteState = {
  file: {
    Content: '',
  },
};

export const note = createModel<RootModel>()({
  name: 'note',
  state: initialState,
  reducers: {
    INIT_FILE: (state: NoteState, payload: any) => {
      state.file = payload;
    },
  },
  effects: (dispatch) => {
    return {
      async getNoteDetail(params: INoteParams): Promise<any> {
        const res: any = await fetchNoteDetail({
          token: '123456',
          ...params,
        });
        dispatch.note.INIT_FILE(res.data);
      },
    };
  },
});
