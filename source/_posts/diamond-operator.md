layout: a
title: Java中的diamond运算符  --  JDK 1.7新特性
date: 2017-02-14 10:54:06
tags:
  - Java
  - Maven
---

拷贝前辈之前做过的项目到本机，启动运行控制台打出如下错误：

``` eclipse
[ERROR] -source 1.6 中不支持 diamond 运算符
[ERROR](请使用 -source 7 或更高版本以启用 diamond 运算符)
```

项目中出现很多小红叉，但是打开报错的文件，却没有发现错误，至少来说，提示错误的地方并没有逻辑错误。
那好，咱就把Eclipse关于Html、Js、Xml的验证给关闭，刷新缓存，好了，没有小红叉，但是运行仍然打印出上面的结果。

查阅资料后才了解到JDK 1.7的一个新特性  ——  diamond运算符。

<!-- more -->

##### 新特性介绍

增强对通用实例创建（diamond）的类型推断 ：
类型推断是一个特殊的烦恼，下面的代码： 

``` java
Map<String, List<String>> map = new HashMap<String, List<String>>(); 
```

通过类型推断后变成： 

``` java
Map<String, List<String>> map = new HashMap<>(); 
```

这个<>被叫做diamond（钻石）运算符，这个运算符从引用的声明中推断类型。

##### 修改Maven配置

解决上述运行问题，需要修改maven编译版本。
找到pom.xml中的maven-compiler-plugin位置：

``` xml
<plugin>
	<artifactId>maven-compiler-plugin</artifactId>
	<configuration>
		<debug>true</debug>
		<source>1.6</source>
		<target>1.6</target>
	</configuration>
</plugin>
```

修改为1.7以上即可（我的JDK本地环境为1.8）：

``` xml
<plugin>
	<artifactId>maven-compiler-plugin</artifactId>
	<configuration>
		<debug>true</debug>
		<source>1.8</source>
		<target>1.8</target>
	</configuration>
</plugin>
```

然后重新运行项目就不会出现不支持 diamond 运算符的问题了。


<br/>


参考来源：

① [错误: -source 1.6 中不支持 diamond 运算符 (请使用 -source 7 或更高版本以启用 diamond 运算符)]
② [mvn 请使用 -source 7 或更高版本以启用 diamond 运算符]



  [错误: -source 1.6 中不支持 diamond 运算符 (请使用 -source 7 或更高版本以启用 diamond 运算符)]: http://blog.csdn.net/aliaooooo/article/details/42536295
  [mvn 请使用 -source 7 或更高版本以启用 diamond 运算符]: http://blog.csdn.net/wind520/article/details/47341885
