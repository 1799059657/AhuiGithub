### 简介



现在我们将开始进行 Node.js 第一课的学习。本节中，我们将对 Node.js 进行简单的介绍，对 Node.js 的特点及适用场景进行讲述。通过本节的讲解，我们将会完成对 NPM、Node.js 全局对象、Node.js REPL、Node.js 调试的学习。另外我们还将使用 Node.js 创建一个简单的应用。

#### 1.知识点

- Node.js 概述、特点及适用场景
- NPM
- Node.js REPL
- Node.js 全局对象
- Node.js 调试

#### 2.Node.js 概述

Node.js 是一个能够在服务器端运行 JavaScript 的开放源代码、跨平台 JavaScript 运行环境。Node.js 由 Node.js 基金会持有和维护，并与 Linux 基金会有合作关系。Node.js 采用 Google 开发的 V8 运行代码，使用事件驱动、非阻塞和异步输入输出模型等技术来提高性能，可优化应用程序的传输量和规模。这些技术通常用于数据密集的即时应用程序。

Node.js 大部分基本模块都用 JavaScript 语言编写。在 Node.js 出现之前，JavaScript 通常作为客户端程序设计语言使用，以 JavaScript 写出的程序常在用户的浏览器上运行。Node.js 的出现使 JavaScript 也能用于服务端编程。Node.js 含有一系列内置模块，使得程序可以脱离 Apache HTTP Server 或 IIS，作为独立服务器运行。

注：定义来自维基百科。

#### 3.Node.js 特点

1. 它是一个 JavaScript 运行环境。
2. 依赖于 Chrome V8 引擎进行代码解释。
3. 事件驱动：在 Node.js 中，客户端请求建立连接，提交数据等行为，会触发相应的事件。Node.js 在一个时刻，只能执行一个事件回调函数，但是在执行一个事件回调函数的中途，可以转而处理其他事件，然后返回继续执行原事件的回调函数。
4. 非阻塞 I/O：Node.js 中采用了非阻塞型 I/O 机制，在执行了访问数据库的代码之后，将立即转而执行其后面的代码，把数据库返回结果的处理代码放在回调函数中，从而提高了程序的执行效率。
5. 轻量可伸缩，适用于实时数据交互应用。
6. 单线程：好处是减少内存开销，不用像多线程编程那样处处在意状态同步的问题。缺点是错误会引起整个应用的退出。

#### 4.Node.js 适用场景

我们从 Node.js 的特点中可以知道 Node.js 擅长处理 I/O，不善于计算（单线程的缺点），因此 Node.js 适用于：当应用程序需要处理大量并发的 I/O，而在向客户端发出响应之前，应用程序内部并不需要进行非常复杂的处理的时候，Node.js 也非常适合与 Web socket 配合，开发长连接的实时交互应用程序。比如：聊天室，博客系统，考试系统等。

#### 5.NPM 介绍

NPM 是随同 Node.js 一起安装的包管理工具,它是一个命令行实用程序，类似的实用工具还有yarn。因此当我们安装好 Node.js 的时候，也安装好了 NPM。NPM 是一个命令行工具，用于从 NPM Registry(npm注册表位于http://npmjs.org) 中下载、安装 Node.js 程序，同时解决依赖问题。

在终端中查看系统 Node.js 版本:

```js
node - v;
```

查看系统中 NPM 版本：

```js
npm - v;
```

常用指令介绍

npm 安装 Node.js 模块语法格式如下：

```
$ npm install <Module Name>
```

npm 的包安装分为本地安装（local）、全局安装（global）两种，从敲的命令行来看，差别只是有没有-g而已，比如

```
npm install express          # 本地安装
npm install express -g   # 全局安装
```

常用的参数还有 -D  -S ，分别改写package.json文件的devDependencies和dependencies节，一个表示开发时的依赖，另一个表示运行时依赖。-S 和 --save相同效果, -D  --save-dev,  -S  --save



我们可以使用以下命令来卸载 Node.js 模块。

```
$ npm uninstall express
```

卸载后，你可以到 /node_modules/ 目录下查看包是否还存在，或者使用以下命令查看：

```
$ npm ls
```

我们可以使用以下命令更新模块：

```
$ npm update express
```

使用以下来搜索模块：

```
$ npm search express
```

创建模块，package.json 文件是必不可少的。我们可以使用 NPM 生成 package.json 文件，生成的文件包含了基本的结果。

```
$ npm init
```

查看包的版本

```
npm view express versions
```

安装指定版本的包

```
npm install express@x.y.z
```

> 使用 Npm 发布一个包的时候，往往要遵循 x.y.z 的规则，发布的第一个版本一般为 1.0.0。z 补丁号。修改某个功能的 Bug 时，z 值 +1 变成 1.0.1；y 小版本号。增加一个新功能，且不影响已有功能，y 值 +1 变成 1.1.0；x 大版本号。引入新的变化，破坏向后兼容，x 值 +1 变成 2.0.0。
>
> package.json 中包版本 ~ 与 ^ 说明
>
> package.json 中会记录很多包的版本号，前面大多出现 ^ 和 ~ 符号，表示某个包的版本号取值范围，包的版本号在这个范围之内都是可以的。
>
> ```
>   "devDependencies": {
>    "axios": "^0.15.3",
>    "babel-eslint": "^6.1.2",
>     "babel-plugin-dva-hmr": "^0.3.2",
>    "babel-plugin-import": "^1.1.1",
>    "draftjs-to-html": "^0.7.0",
>    "eslint": "^3.17.1",
>    "eslint-config-airbnb": "^9.0.1",
>    "eslint-plugin-import": "^1.16.0",
>    "eslint-plugin-jsx-a11y": "^1.4.2",
>   "eslint-plugin-react": "^5.1.1",
>     "less-vars-to-js": "^1.1.2",
>    "path-to-regexp": "^1.7.0",
>   "rc-tween-one": "^1.0.0",
>     "redbox-react": "^1.2.10",
>     "roadhog": "0.6.0-beta.6"
>   },
> ```
>
> 假定某个包的版本是 1.4.0
>
> - ~1.4.0
>   表示：>=1.4.0 && < 1.5.0
>   说明：小版本不变，补丁号可以取最大值。
> - ^1.4.0
>   表示：>=1.4.0 && < 2.0.0
>   说明：大版本号不变，小版本号可以取最大值。

#### 6.创建并发布一个包

1.创建一个目录，如Node1,在目录中编写一个js文件，如censor.js

```
var words = ['死','坏','废材'];
var customWords = []

function censor(inStr){
    for(let index in words){
        inStr = inStr.replace(words[index],'***');
    }
    for(let index in customWords){
        inStr = inStr.replace(customWords[index],'***')
    }
    return inStr;
}

function addCensoredWord(word){
    customWords.push(word);
}
function getCensoredWords(){
    return words.concat(customWords);
}

exports.censor = censor;
exports.addCensoredWord = addCensoredWord;
exports.getCensoredWords = getCensoredWords;
```

2.在当前目录编写包说明文件package.json

```
{
    "author": "su",
    "name": "censorify",  //这个名字可以修改，因为仓库上已经有了
    "version": "0.1.1",
    "description": "Censors words out of text",
    "main": "censortext",
    "dependencies": {},
    "engines":{
        "node":"*"
    }
}
```

3.使用npm pack打包你的目录

```
npm pack
```

此时会得到一个censorify-0.1.1.tgz文件

4.你可以将打包的模块发布到npm注册表 http://npmjs.org，供他人使用。

- 1）将你的项目发布到公共目录，如gitee

  > 参考步骤：
  >
  > a)先登录gitee网站,创建一个公开的仓库censorword，复制创建路径如:https://gitee.com/null_378_9330/censorword.git
  >
  > b)在你的本地创建一个目录，右键 git bash,在窗口中将远程仓库克隆下来
  >
  > $ git clone https://gitee.com/null_378_9330/censorword.git
  >
  > c)复制你前面编写的js和json文件到你克隆下来的本地目录 censorword，
  >
  > ​    cd censorword 接着操作下面步骤
  >
  > d) $ git add .   //将2个文件添加到暂存区
  >
  > e) $ git commit -m 'first commit'   //提交到本地仓库
  >
  > f) $ git push      //上传到远程仓库

​    2）刚才是演示了上传内容到公共仓库，其实还需要修改package.json文件，添加仓库信息，修改如下，接着重新使用git add,git commit ,git push将之提交到仓库。

```
{
    "author": "su",
    "name": "censorifywe",
    "version": "0.1.1",
    "description": "Censors words out of text",
    "main": "censortext",
    "repository": {
        "type": "git",
        "url":  "https://gitee.com/null_378_9330/censorword.git"
    },
    "keywords": ["censor", "words"],
    "dependencies": {},
    "engines":{
        "node":"*"
    }
}
```

3) 在 https://npmjs.org/signup 创建一个帐户

4）从控制台使用命令发布该模块(发布前确保你的本机配置仓库地址是registry.npmjs.org),如果不是，请使用

​     npm config set registry http://registry.npmjs.org     //设置本地仓库

```
npm publish
```

#### 7.模块的使用

##### 1.使用本地封装的包

创建一个文件目录testdir，在此testdir目录中测试我们前面使用npm pack封装好的本地包,创建一个子目录mymodule,将封装好的包文件censorify-0.1.1.tgz复制到此目录

1)在testdir中初始化当前项目，对于提问，一直回车即可

```
npm init
```

此命令会生成 package.json文件

2）安装censorify本地包

```
npm install ./mymodule/censorify-0.1.1.tgz
```

成功后，将会在testdir目录中生成node_modules，并将相应源代码文件目录复制在此目录下。同时修改package.json文件中的dependencies节内容，内容如下 :

```
 "dependencies": {
    "censorifycc": "file:mymodules/censorifycc-0.1.1.tgz"
  }
```

3）编写测试文件test.js

```
const {censor} = require('censorifycc')
console.log(censor('我爱废材'))
```

4) 使用Dos命令 执行此test.js

```
node test.js
```

以上是本地包的安装方法，我们注册到npm仓库的包如何引入并使用呢？

##### 2.使用npm仓库的包

1.可以新建一个测试项目test2,打开Dos命令窗口，并切换到该目录，继续使用前面介绍的初始化本项目

```
npm init
```

2. 安装前面上传的包censorifywe(包名以你正确注册到仓库的名字为准)

```
npm install censorifywe
```

此命令成功下载相应包的内容并添加到test2的node_modules目录下，并修改package.json文件和package-lock.json的相应dependencies节内容

```
"dependencies": {
    "censorifywe": "^0.1.4"
  }
```

3.添加test.js,测试你下载的包

```
const {censor} = require('censorifywe')

console.log(censor('我爱废材'))
```

#### 8.使用淘宝镜像

npm访问的外国站点，下载包文件有时会比较慢，淘宝仓库镜像，首先全局安装cnpm

```
npm install cnpm -g --registry=https://registry.npm.taobao.org
```

 当然，也可以设置下载的仓库地址为淘宝仓库镜像,数字表示使用2号仓库

```
npm config set registry http://registry.npm.taobao.org/2
```

查找当前的仓库地址

```
npm config get registry
```

#### 9.Yarn的使用

Facebook 贡献的 Javascript 包管理器。使用与npm类似，请自行百度

