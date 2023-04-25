import React, { lazy, Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import { ModalProvider } from '@components/modal';

dayjs.locale('zh-cn');

const Login = lazy(() => import('@pages/login'));
const MainLayout = lazy(() => import('@pages/main/_layout'));
import Index from '@pages/main/index'
import Recycle from '@pages/main/recycle'
import FolderLayout from '@pages/main/folder/_layout'
import FolderFile from '@pages/main/folder/file'

const GPT = lazy(() => import('@pages/gpt'));

import '@common/base.css';
import 'antd/dist/reset.css';

type IAppProps = {
  className?: string;
  style?: React.CSSProperties;
};

const GetAllRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/main/*',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: 'folder/:folderId/*',
          element: <FolderLayout />,
          children: [
            {
              path: 'file/:fileId',
              element: <FolderFile />,
            },
          ]
        },
        {
          path: 'recycle',
          element: <Recycle />,
        },
      ],
    },
    {
      path: '/gpt',
      element: <GPT />,
    },
  ]);
  return routes;
};
const App: React.FC<IAppProps> = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <ModalProvider>
        <Suspense fallback={<div>加载中...</div>}>
          <BrowserRouter>
            <GetAllRoutes />
          </BrowserRouter>
        </Suspense>
      </ModalProvider>
    </ConfigProvider>
  );
};

export default App;
