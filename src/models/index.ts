// 可以用rematch，很好接入

import { Models } from '@rematch/core';

import { main } from './main';


export interface RootModel extends Models<RootModel> {
  main: typeof main;
}

export const models: RootModel = {
  main
};
