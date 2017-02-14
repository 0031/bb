layout: a
title: 我的git常用命令
date: 2017-02-08 09:34:04
tags:
	- Git
---

{% imgurl assets/images/a/my-git-common-commands/1.png %}

开年上班第二天，用Git上传了一次不好的提交，想把错误提交记录删除，重新传过。
之前也遇到过类似的事情，去网上找了一些方法，最终解决了，并且把解决办法也加入到了书签。
但是，当我再次打开书签时，发现根据步骤做，貌似并没有解决，还差点把整个库删了。
没错，一定是保存了假书签！o(╯□╰)o

尽管经过一番倒腾，解决了问题，但是还是有必要把一些我常用的命令记录下来，以后就不用到处再找。

<!-- more -->

##### 初始化文件夹

* 自动创建.git文件夹

``` shell
git clone https://github.com/0031/return-to-top.git
```

* 手动创建，然后连接到远程仓库
``` shell
git init
git remote add origin https://github.com/0031/return-to-top.git
```


##### 提交修改

① 加入需要提交的文件（“.”表示所有文件，可以用某个文件名替换表示单个文件）

``` shell
git add .
```

② 添加注释，方便查找

``` shell
git commit -m "update something"
```

③ 提交至远程仓库（“master可以替换为其他分支”）

``` shell
git push origin master
```

##### 打标签

① 显示当前所有标签

``` shell
git tag
```

② 含附注的标签

``` shell
git tag -a v1.0.4 -m "This is version 1.0.4"
```

③ 轻量级标签

``` shell
git tag v1.0.4
```

④ 提交标签

单个：

``` shell
git push origin v1.0.4
```

所有：

``` shell
git push origin --tags
```

⑤ 标签删除

本地：

``` shell
git tag -d v1.0.4
```

远程：

``` shell
git push origin :refs/tags/v1.0.4
```

##### 回滚

当提交了一个不太好的记录时，有强迫症的我又容不得留下这样的历史，那么回滚扮演了一个重要的角色。
网上有不少方式，其中有一种暴力的（备份删库移入备份），这样做貌似很简单，但是可能会出现无法挽救的局面。

总结了一下，还是应该这样做，比较安全一点：

① 查看日志，选择需要回滚到的commit id

``` shell
git log
```

② 选择某个id（前5位字符即可），重置

保留修改（建议使用）：

``` shell
git reset a1b2c
```

完全丢弃修改（可以先备份文件）：

``` shell
git reset --hard a1b2c
```

③ 提交回滚

``` shell
git push -f origin master
```

接下来可以提交新的修改了，和[上面的步骤]一致。

<br/>
<hr/>

参考来源：

① [Git打标签]
② [git如何回滚远程仓库]

  [上面的步骤]: #提交修改
  [Git打标签]: https://git-scm.com/book/zh/v1/Git-基础-打标签
  [git如何回滚远程仓库]: http://blog.mtxcxin.cn/blog/git如何回滚远程仓库.html
