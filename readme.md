
## 介绍

该工程是使用lerna技术组织一个UI组件库

## 如何创建一个组件库

首先安装 Vue 官方提供的工具 [vue-cli 3.x](([https://github.com/vuejs/vue-cli](https://cli.vuejs.org/)))

``` bash
$ npm install -g @vue/cli
```

使用vue cli 3命令创建项目:

``` bash
$ vue create egova-demo-web
```

按提示信息创建

最后执行如下命令:

``` bash
$ vue add @egova/egova-starter-template
```

## 开始

1. 安装 lerna

```bash
npm install lerna -g
```

2. 安装依赖

```bash
lerna bootstrap
```

3. 安装依赖

```bash
// 在所有的package.json下都会安装view
lerna add iview -D  
// 只会在@egova/ui-image-upload下安装view
lerna add iview -D --scope @egova/ui-image-upload 
```

4. 编译组件

```bash
// 在所有的packages下都执行npm run dist
lerna run dist
// 只会在 @egova/ui-image-upload 下执行npm run dist
lerna run dist --scope @egova/ui-image-upload
```

5. 发布组件

> 请确保你已经有https://www.npmjs.com/的帐号，同时在@egova组织下

* 设置仓库地址为npm官方仓库地址(国内大部分都使用阿里淘宝镜像，如果没改publish会失败)
npm config set registry https://registry.npmjs.org/

* 登陆npm,用户名密码邮箱需要全部匹配

```bash
npm login
Username: xxxxx
Password:
Email: (this IS public) xxx@gmail.com
Logged in as xxxxx on https://registry.npmjs.org/.
```

* 登陆完可以publish了,执行以下命令
```
lerna publish
 ```