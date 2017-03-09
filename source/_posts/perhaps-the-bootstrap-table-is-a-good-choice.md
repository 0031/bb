layout: a
title: 或许bootstrap-table能提高你的开发效率
date: 2017-03-07 09:56:46
tags:
  - Table
  - Plugin
---

{% imgurl assets/images/a/perhaps-the-bootstrap-table-is-a-good-choice/1.png %}

开发中经常遇到后台数据展示至前台的场景，其中用表格批量展示数据的情况尤其多。
那么如何能快速的将复杂的数据格式清晰的显示在网页中，这是一个问题。
或许你会想到，拿到后台数据，然后通过拼接参数，渲染完成一张表格，然后手动插入到dom中。
不过，听起来貌似涉及到的步骤不少，至少在我看来，这样的方式效率不会很高（当然如果使用模板引擎辅助渲染，应该还是不错的）。
当然，你也会考虑到使用插件，不过表格插件有不少，做得好的也有很多，[bootstrap-table]就是其中之一。
由于官方文档示例比较丰富，但是在某些配置上没有做足够的说明，所以我记录了一点点遇到的小坑。

<!-- more -->

##### 渊源

最近比较喜欢找点开源插件投入到项目中去，不再像以前那样闭门造轮子。
上手所在单位的项目，发现之前的开发者像上面说的那种通过JS自定义拼接的原始方式来完成数据展示。
当然，本来我也可以直接复制下之前的代码，然后改一改就完成了，不过作为强迫症轻微患者，并不喜欢这样的做法。
想到了之前项目中有学习过bootstrap-table，由于当时没有太多深入，就丢弃了。
这个项目非常适合使用它，于是在Github中找到了它。

##### 开始使用

刚好，示例网站的首页正是我需要的，项目需求是可删除可编辑，那么好，开始吧。
开始前，你需要引入相关样式和脚本，推荐[Bootcdn]或者[Rawgit]。

``` html
<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap-table/1.11.1/bootstrap-table.css">
<script src="https://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>
```

由于详细代码篇幅比较大，不在文章中贴出，如果实在想要，请看小提示：-)

普通表格：
<iframe style="width: 80%;height: 200px;border: none;overflow: hidden" src="/examples/perhaps-the-bootstrap-table-is-a-good-choice/1.html"></iframe>

带删除按钮：
<iframe style="width: 80%;height: 200px;border: none;overflow: hidden" src="/examples/perhaps-the-bootstrap-table-is-a-good-choice/2.html"></iframe>


带编辑功能：
<iframe style="width: 80%;height: 300px;border: none;overflow: hidden" src="/examples/perhaps-the-bootstrap-table-is-a-good-choice/3.html"></iframe>

<small><span style="color: red">Tips:</span>右键表格查看框架源代码，即可查看如何生成表格。</small>

请注意：增加编辑功能，需要额外添加如下样式和脚本（之前我忘记了加bootstrap-table/1.11.1/extensions，踩了一个大坑，另外bootstrap与bootstrap-editable版本需要一一对应）：

``` html
<link rel="stylesheet" href="https://cdn.bootcss.com/x-editable/1.5.1/bootstrap3-editable/css/bootstrap-editable.css">
<script src="https://cdn.bootcss.com/bootstrap-table/1.11.1/extensions/editable/bootstrap-table-editable.js"></script>
<script src="https://cdn.bootcss.com/x-editable/1.5.1/bootstrap3-editable/js/bootstrap-editable.min.js"></script>
```

##### 更多

由于官方文档更丰富，只是我个人觉得好用，分享出来，就不在此一一举栗了，可以移步官网[bootstrap-table-examples]查看更多，或许你能发现更多有趣的东西！



  [bootstrap-table]: https://github.com/wenzhixin/bootstrap-table
  [bootstrap-table-examples]: https://github.com/wenzhixin/bootstrap-table-examples
  [Bootcdn]: http://www.bootcdn.cn/
  [Rawgit]: http://rawgit.com/
