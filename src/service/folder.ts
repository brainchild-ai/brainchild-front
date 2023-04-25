import { get,post } from '@shared/http';

// 获取用户信息

export type IParams = {
  token?: string;
  page: number;
  Limit: number;
}
export function fetchFolder(params: IParams) {
  return post('/api/0.1/get_directory', params);
}


// 单个目录的详情
export type IDetailParams = {
  token?: string;
  NotebookID: string
}
export function fetchFolderDetail(params: IDetailParams) {
  return post('/api/0.1/directory_detail', params);
}


// 创建目录
export type ICreateParams = {
  token?: string;
  Notebookname: string;
}
export function fetchCreateFolder(params: ICreateParams) {
  return post('/api/0.1/create_directory', params);
}

