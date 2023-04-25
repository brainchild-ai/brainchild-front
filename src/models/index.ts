// 可以用rematch，很好接入

import { Models } from '@rematch/core';

import { main } from './main';
import { note } from './note';


export interface RootModel extends Models<RootModel> {
  main: typeof main;
  note: typeof note;
}

export const models: RootModel = {
  main,
  note
};
