import { get, post } from '@shared/http';

// 获取用户信息
export function loginUser(params: { user: string; password: string }) {
  return post('/api/0.1/login', params);
}

