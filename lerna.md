
## lerna介绍

lerna是GitHub上面开源的一款js代码库管理软件， 用来对一系列相互耦合比较大、又相互独立的js git库进行管理。解决各个库之间修改混乱、难以跟踪的问题。lerna可以优化这种情形下的工作流。

### 开始

#### 1. 全局安装lerna

```bash
npm install lerna -g
```

#### 2. 初始化lerna工程

```bash
mkdir lerna-demo
cd d:/lerna-demo
lerna init
```

执行成功后，目录下将会生成这样的目录结构。 

```bash
 - packages(目录)
 - lerna.json(配置文件)
 - package.json(工程描述文件)
```

### 3. 添加package

默认情况下，package是放在packages目录下的。

```bash
// 进入packages目录
cd d:/lerna-demo/packages
// 创建一个packge目录
mkdir module-1
// 进入module-1 package目录
cd module-1
// 初始化一个package
npm init -y
```

行完毕，工程下的目录结构如下

```bash
--packages
    --module-1
        package.json
--lerna.json
--package.json

```

### 4. 添加依赖

```bash
lerna add vue --scope module-1
```

### 5. 安装依赖

```bash
lerna bootstrap
```

这个指令会执行以下操作：

* 在每个 package 下面执行 npm install 。
* 根据各个 package 下 package.json 里面的 dependencies 和 devDependencies 配置，使用 symlink 在各个 package 的 node_modules 下面建立引用关系。
* 在每个 package 下执行 npm run prepublish 。
* 在每个 package 下执行 npm run prepare 。

### 6. 发布

在发布的时候，就需要git 工具的配合了。所以在发布之前，请确认此时该lerna工程是否已经连接到git的远程仓库。你可以执行下面的命令进行查看。

```bash
git remote -v
// print log
origin  git@github.com:LittleBreak/lerna-best-practices.git (fetch)
origin  git@github.com:LittleBreak/lerna-best-practices.git (push)
```

执行下一命令，你就可以根据cmd中的提示，一步步的发布packges了。

```bash
lerna publish
```

```bash
# force publish all packages
lerna publish --force-publish=*
```

```bash
lerna publish --repo-version 1.0.1
```

实际上在执行该条命令的时候，lerna会做很多的工作。

```bash
 -  Run the equivalent of  `lerna updated`  to determine which packages need to be published.
 -  If necessary, increment the  `version`  key in  `lerna.json`.
 -  Update the  `package.json`  of all updated packages to their new versions.
 -  Update all dependencies of the updated packages with the new versions, specified with a  [caret (^)](https://docs.npmjs.com/files/package.json#dependencies).
 -  Create a new git commit and tag for the new version.
 -  Publish updated packages to npm.
 ```

### 管理模式

使用lerna管理项目时，可以选择两种模式。

### 1. 固定模式(Fixed mode)

默认的为固定模式，当使用lerna init命令初始化项目时，就默认为固定模式.固定模式中，packages下的所有包共用一个版本号(version)，会自动将所有的包绑定到一个版本号上(该版本号也就是lerna.json中的version字段)，所以任意一个包发生了更新，这个共用的版本号就会发生改变。

### 2. 独立模式(Independent mode)

独立模式允许每一个包有一个独立的版本号，在使用lerna publish命令时，可以为每个包单独制定具体的操作，同时可以只更新某一个包的版本号。此种模式时，lerna.json中的version字段指定为`independent`即可。

### 遇到的问题

#### 1. symlink 的问题

看我们前面提到的lerna bootstrap执行的操作，使用 symlink 在各个 package 的 node_modules 下面建立引用关系。

如果我们的package中有webpack，那么其中的loader很有可能会出问题。

 假设 `package` 下面有一个包 `pkg1` ，依赖 `package` 下面的另一个包 `pkg2` 。运行 `lerna bootstrap` 之后， `pkg1/node_modules` 下就会出现 `pkg2` 的 `symlink` 。

我们遇到的问题是在 `pkg2` 中有一个TS文件，`export` 出去。`pkg1` 中去引入，但是发现总是没有命中真实的`loader`。
如果使用 `webpack` 系列工具来编译运行 `pkg1` ，由于 `webpack loader` 判断路径默认是按照真实路径来的，所以 `pkg2` 对应到的路径是 `[project root]/packagepkg2` ，而不是 `[project root]/package/pkg1/node_modules/pkg2` 。

这样一来，如果需要 `pkg2` 中的源码过 `pkg1` 的 `loader` （比如 pkg2 中的 TS 通过 pkg1 的 ts-loader），就需要特殊配置。这和不涉及 `symlink` 的真实场景存在较大差异。

同时，很多配置（比如 postcssrc 、 babelrc 、 eslintrc 等）是以 resolve 到的文件去解析的。
比如要用 babel 编译 pkg2 下面的 `[project root]/package/pkg2/src/Report.ts` 源码，会按照如下目录顺序查找 babelrc 配置：

```bash
[project root]/package/pkg2/src/
[project root]/package/pkg2/
[project root]/package/
[project root]/
```

而此时很可能希望能在 `[project root]/package/pkg1/` 目录下寻找配置。
所以此时其实很希望 `webpack loader` 基于 symlink 的路径去解析判断 `include / exclude` 等配置，而不是按照真实文件的路径。

所以需要配置 `webpack` 的 `resolve.symlinks` 来解决这个问题，具体参见[官方文档](https://webpack.js.org/configuration/resolve/#resolve-symlinks)。
