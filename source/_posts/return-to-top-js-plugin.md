layout: article
title: 一款简易的网页返回顶部JS原生插件
date: 2017-01-03 16:10:22
tags:
	- Javascript
	- Plugin
---

{% imgurl assets/images/a/return-to-top-js-plugin/1.png %}

还是在使用Hexo博客时发现的小问题。
一般来说，网站都会加入返回顶部按钮，
但是在使用Yilia主题时，并没有发现，
作为一个完美主义者，当然必须解决它。

为了不重复造轮子，将以前项目中的代码Copy过来，
加入到Yilia源码中，发现之前的代码依赖jQuery，
但Hexo中并没有jQuery，这就不可爱了赛。
本来可以自行加上，但是如果仅仅为了一个按钮，
多加入了几十K的脚本，肯定是不划算的啦。

于是，修修补补总算是做成了JS原生插件。
并且通过bower打包发布到git，方便下次使用。
那么本文就来说说修补细节以及它的“打开方式”。

<!-- more -->

### 功能分析

&emsp;&emsp;由于之前的代码中并没有加入动画，
由于背景图片是一个小火箭（图片来源于网络），
如果加入动画可能更生动一些，只是需要多加载样式，
这里我选择了[animate.css]做为动画样式表，
通过JS控制class来改变不同状态下图片动画。
当然，也有不需要动画的用户，因此须定制动画开关；
同理，不需要背景图的用户，定制背景开关；
另外，平滑滚动至顶部，提升用户体验，毋庸置疑；
防止多次点击，只执行最后一次点击事件。

### JS原生插件如何写

&emsp;&emsp;经常使用jQuery，导致JS一些语法忘记。
需要再次拾起请看：[原生JavaScript插件编写指南]。

### 复用

&emsp;&emsp;本来这就是一个常用的功能，因此需要考虑复用和下次使用方便。
怎么样更好用？这是一个值得考虑的问题，主要体现在打包工具上。
参考了很多打包工具或者说包管理软件，如Webpack、Vue、Rollup、Fis。
当然，对于仅仅一个JS插件来说，使用[Bower]+[Gulp]就够了，
这算是两个比较老的工具了把，想学习的请看下面这几篇文章：
&emsp;&emsp;<small>_[Bower —— 管理你的客户端依赖关系]_</small>
&emsp;&emsp;<small>_[Gulp入门指南]_</small>
&emsp;&emsp;<small>_[前端自动化Gulp工具常用插件]_</small>

&emsp;&emsp;通过一番整理，将该插件发布到git，传送门：[return-to-top]。
往后看，将会告诉您该插件的使用方式。

### 开始使用

___Clone___

如果没有NodeJS环境，直接clone（不建议此方式，不便于统一管理）：

``` bash
git clone https://github.com/0031/return-to-top.git
```

___NodeJS___

首先确保工作环境下安装了NodeJS，由于Bower与Gulp基于NodeJS。
如果还未安装，请前往下载：[NodeJS]，可能有点慢，能翻墙最好。
在控制台输入如下代码，已检验是否安装完整：

``` bash
$ node -v
v6.9.2
$ npm -v
3.10.9
```

<br/>

___Bower___

全局安装[Bower]：

``` bash
$ npm install -g bower
```

小技巧：国内Npm仓库速度太慢，可考虑使用淘宝Npm：

``` bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```
然后将所有Npm命令替换为Cnpm来使用，大大提高速度，如：

``` bash
$ cnpm install -g bower
```

<br/>

___自定义Bower下载目录___

新建.bowerrc文件：

``` bash
$ touch .bowerrc
```

将.bowerrc文件内容修改为自定义路径：

```
{
  "directory" : "yourpath"
}
```

小技巧：建议将所有的第三方插件都放在js/css/images同目录下plugins目录，方便统一管理。

<br/>

___Return To Top___

通过Bower即可安装return-to-top插件：

``` bash
$ bower install return-to-top --save
```

或者

``` bash
$ bower install https://github.com/0031/return-to-top --save
```

在/yourpath/return-to-top目录下即为插件核心内容。

<br/>

___示例___

在/return-to-top/example/example.html可以查看示例文件。
细心的童鞋可以发现，本站右下方可发现小火箭，是该插件最好的示例。
另外，/return-to-top/dist目录下的文件用于生产环境使用。

<br/>

___动画效果___

动画效果使用的animate.css来源于[Bootcdn]，
您也可以通过Bower下载到本地：

``` bash
$ bower install animate.css --save
```

<br/>

___引入脚本___

在需要使用返回顶部插件的html文件中加入如下代码，即可使用：
``` html
<script src="/yourpath/return-to-top/dist/return-to-top.min.js"></script>
<script type="text/javascript">
	window.returnToTop.init();
</script>
```
需要将/yourpath替换为您的本地路径。

<br/>

### 高级进阶

如果想对插件有更高的要求，可以自定义源码。
进入/return-to-top目录，执行npm安装：

``` bash
$ npm install
```

修改/return-to-top/src/js/return-to-top.js过后可以执行相关命令，
开发环境下：

``` bash
$ npm run dev
```

可在/return-to-top/example目录下测试效果。
注：开发时，对JS语法做了检查，请注意编程规范。

生产环境下：

``` bash
$ npm run dist
```

可对js进行压缩，使用时引入return-to-top.min.js以节省空间。

### 最后说几句

开发此插件是方便自己，同时发布在git希望给大家带来一定的方便，
虽然背景图片来源于网络，动画效果来源于animate，但其他内容均为原创，
开发不易，使用时还望注明出处，非常感谢大家的支持！

如果还有什么地方不明白，您可以在评论区留言！

  [animate.css]: https://github.com/daneden/animate.css
  [原生JavaScript插件编写指南]: http://geocld.github.io/2016/03/10/javascript_plugin/
  [Bower]: https://github.com/bower/bower
  [Gulp]: https://github.com/gulpjs/gulp
  [return-to-top]: https://github.com/0031/return-to-top
  [Bower —— 管理你的客户端依赖关系]: https://segmentfault.com/a/1190000000349555
  [Gulp入门指南]: http://www.gulpjs.com.cn/docs/getting-started/
  [前端自动化Gulp工具常用插件]: http://www.jianshu.com/p/98db023b5b89
  [NodeJS]: https://nodejs.org/zh-cn/
  [Bootcdn]: http://www.bootcdn.cn/