## 项目说明(金融团队使用)

> baseName = '/app/project'


- [x] react18
- [x] react-router-dom 6.x
- [x] redux  
- [x] TS 完全支持
- [x] webpack 开发环境局部热更新
- [x] webpack 生产环境
- [x] 支持less,css,less.module
- [x] 支持styled-component方式
- [x] 数据流rematchjs
- [x] antd支持按需打包
- [x] antd的主题可以定制
- [x] axios二次封装
- [X] ejs 和 html
- [X] 动态加载分割js
- [x] mock数据支持

## 安装

建议用 yarn 进行安装包

## 关于store（rematch）和 本脚手架 使用之前必看

- https://rematchjs.org/


## 关于antd modal参考我在template/main里面modal的写法

- 还在完善

## 启动与打包

packagge.json里面可以配置host和port

默认
```
  "_port": 8100,
  "_host": "dev.yuan.shuwen.com",

```

开发启动： `yarn start `

## 发布

测试环境
```
 npm run build-test

 npm run cship-test

```

预发环境
```
 npm run build-pre

 npm run cship-pre

```
预发环境
```
 npm run build-pro

 npm run cship-pro

```

- 可参见package.json
- 咨询 @子涧


## 提交说明

提交 commit 的类型，包括以下几种

- feat: 新功能
- fix: 修复问题
- docs: 修改文档
- style: 修改代码格式，不影响代码逻辑
- refactor: 重构代码，理论上不影响现有功能
- perf: 提升性能
- test: 增加修改测试用例
- chore: 修改工具相关（包括但不限于文档、代码生成等）
- deps: 升级依赖

## 提交规范

- 尽量在commit之前进行pull远端代码

```
 请先拉取代码，再提交
     
```


## 模块说明

 - cli 一般为webpack打包相关配置
 - src
     - assets  静态资源，图片，icon，svg等
     - common  一般为全局用的css和less样式
     - components  一般为通用组件
     - pages   包含所有的页面文件
     - model     数据模型
     - service   包含各页面的请求，一般以页面名字命名
     - shared    一般为公用的 方法和一些设计
     - typing    ts类型相关，全局属性
     - hooks     自定义hooks


## 发布说明

- 待补充
    
## 注意事项

- less 模块化，请用 xx.module.less 命名
- 一些全局性的类型，请在typing里面写，参考写法
- class名字不要用驼峰

```
import classNames from 'classnames';
import styles from './dialog.module.less';

export default class Dialog extends React.Component {
  render() {
    const cx = classNames({
      [styles.confirm]: !this.state.disabled,
      [styles.disabled]: this.state.disabled
    });

    return <div className={styles.root}>
      <a className={cx}>Confirm</a>
      ...
    </div>
  }
}
```
