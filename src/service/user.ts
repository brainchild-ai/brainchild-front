import { get } from '@shared/http';


// 获取用户信息
export function fetchUserInfo() {
  return get('/api/user/info',{})
}
