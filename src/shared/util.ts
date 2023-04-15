import { customAlphabet } from 'nanoid';
import { get as _get } from 'lodash';

export const ROUTER_BASE_URL = '/app/project';

// 随机id，有前缀
export const getId = (type: string) => {
  const nanoid = customAlphabet('1234567890abcdefghijkzwyuv', 8);
  return type + '_' + nanoid();
};

// 随机整数[mix,max]
export function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function decimal(n = undefined, digit = 0) {
  // 用来检查一个数值是否为有限的，也可以用来检查是不是数字
  if (!Number.isFinite(n)) {
    return n;
  }
  // 用一个极小值代替来弥补5不进位的问题
  const minimum = 0.0000000000001;
  if (Math.sign(n) === 1 || Math.sign(n) === 0) {
    return Number((n + minimum).toFixed(digit));
  }
  return Number((n - minimum).toFixed(digit));
}
