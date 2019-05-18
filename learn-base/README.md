# learn-vue

## 项目开发环境

- 开发工具 [vscode@1.33.0](https://code.visualstudio.com/)

  - 需要安装的 vscode 插件:
  - [Vetur@Pine Wu](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
  - [ESLint@Dirk Baeumer](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Sass@Robin Bentley](https://marketplace.visualstudio.com/items?itemName=robinbentley.sass-indented)
  - [Prettier - Code formatter@Esben Petersen](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [EditorConfig for VS Code@EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

- vue 开发需要的浏览器插件 [vue-devtools](https://github.com/vuejs/vue-devtools)
- `nodejs : v10.15.0`
- `npm : 6.7.0`
- `vue-cli: 3.5.5`

## 项目基本结构(待补充)

```bash
.
├── README.md
├── babel.config.js
├── .browserslistrc
├── .editorconfig
├── .eslintrc.js
├── .eslintignore
├── .gitignore
├── package.json
├── babel.config.js
├── postcss.config.js
├── prettier.config.js
├── .prettierignore
├── public
├── src
│   ├── App.vue
│   ├── api # api请求
│   ├── common # 公共组件
│   │   ├── global # 全局组件放入这个文件夹内
│   │   └── componentRegister.js # 全局组件自动注册
│   ├── plugins # 自定义插件
│   ├── mixins # 放入mixin
│   ├── assets # 静态资源
│   │   ├── css
│   │   ├── font # 字体文件
│   │   └── images
│   ├── components # 组件
│   ├── config  # config配置
│   │   └── index.js
│   ├── directive # 指令
│   │   └── index.js
│   ├── filters # 过滤器
│   │   └── index.js
│   ├── libs  # 工具类
│   │   └── tools.js
│   ├── main.js  # 项目主入口
│   ├── router # 路由
│   │   ├── index.js # router 入口
│   │   ├── project.js
│   │   └── routes.js
│   ├── store # store
│   │   ├── actions
│   │   │   └── index.js
│   │   ├── constant  # mutations type 文件
│   │   │   └── types.js
│   │   ├── getters
│   │   │   └── index.js
│   │   ├── index.js # vuex 入口
│   │   ├── modules # vuex 模块化
│   │   │   └── test
│   │   ├── mutations
│   │   │   └── index.js
│   │   ├── plugin  # 自定义 vuex 插件
│   │   └── state
│   │       └── index.js
│   └── views
│       └── Demo.vue
└── vue.config.js  # vue 配置文件
```

## 项目开始

- 项目环境配置`.env`文件

```bash
# .env : 开发测试fetch api的url
API_URL= 'https://api.domain.dev'
```

- 进入项目根目录安装依赖

```bash
npm install
```

- 运行开发命令

```bash
npm run serve
```

- 上线打包命令

```bash
npm run build
```

- Lints 语法检查

```bash
npm run lint
```

- 分析打包后文件大小

```bash
npm run analyzer
```

- 本地打包测试服务

```bash
npm run server
```

## vue 相关资料

- [vuejs 官网](https://vuejs.org/)
- [vuejs@cli 脚手架](https://cli.vuejs.org)
- [vuejs@router 路由](https://router.vuejs.org/)
- [vuejs@vuex 状态管理](https://vuex.vuejs.org/)
