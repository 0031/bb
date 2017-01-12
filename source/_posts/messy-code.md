layout: article
title: 乱码，这个让人头疼而又必须解决的问题
date: 2016-12-23 16:23:22
reward: true
tags:
	- Java
	- Tomcat
	- Eclipse
---
{% imgurl assets/images/a/messy-code/1.jpg %}

在我最开始接触实际网站系统开发的时候，
经常遇到文本乱码，并且始终没有解决完善，
或许当时开发经验不够，没能做到面面俱到。
这个问题确实非常让人头疼，如果不去完全解决它，将会影响后面的开发。

<!-- more -->

### 乱码类型

&emsp;&emsp;常见的乱码，一般能够分成五种类型：第一类是文本/文档文档乱码，这一般是由于源文档编码，和Windows使用的编码不通用造成的；第二类是网页乱码，形成原因和第一类乱码类似；第三类是Windows系统界面乱码，即中文Windows的菜单、桌面、提示框等显示乱码，主要是Windows注册表中有关字体的部分配置不当引起的；第四类是应用程式的界面乱码，即各种应用程式（包括游戏）本来显示中文的地方出现乱码，形成原因比较复杂，有第二类的乱码原因，也可能是软件用到的中文链接库，被英文链接库覆盖造成的；第五类是邮件乱码，形成原因也极其复杂。

### 如何解决(以Java Web开发场景为基础)

>	
 - 开发工具：Eclipse
 - 服务器：Tomcat
 - 目标编码：UTF-8

** 统一Eclipse编码格式 **
修改Workspace编码格式
&emsp;&emsp;在Eclipse菜单栏中，选择Windows->Perferences->General->Workspace，在右侧找到Text file encoding修改为UTF-8：
<div align="center">
	{% imgurl assets/images/a/messy-code/2.jpg width:50% height:50% %}
	<small>修改Workspace编码格式 图解</small>
</div>


修改Project编码格式
&emsp;&emsp;选择某个项目，单击右键，选择Properties->Resource，在右侧找到Text file encoding修改为UTF-8：
<div align="center">
	{% imgurl assets/images/a/messy-code/3.jpg width:50% height:50% %}
	<small>修改Project编码格式 图解</small>
</div>


修改Content-Type
&emsp;&emsp;在Eclipse菜单栏中，选择Windows->Perferences->General->Content-Type，在右侧找到Text->Java Source File(如果有使用到JSP文件可以找到Jsp)更新为UTF-8，切记一定要点击右边的Update：
<div align="center">
	{% imgurl assets/images/a/messy-code/4.jpg width:70% height:70% %}
	<small>修改Content-Type 图解</small>
	<small style="color: red">当然，为了所有文件都统一，可以全部更新，毕竟有些文件类型用不到</small>
</div>

修改单个文件编码格式
&emsp;&emsp;与Project类似，只是选择单个文件，这里就不截图了。

其实经过上述操作，基本上已经算编码统一了，写代码时不用担心出现乱码问题，
但是，将项目发布至服务器上时，只要遇到POST请求，返回中文数据，依然出现乱码。
那么此时就需要修改Tomcat配置文件中的编码才能解决这个问题。

** 修改Tomcat配置文件 **
调试时
&emsp;&emsp;使用Eclipse有个好处，调试项目很容易，一键发布，因此解决乱码只需在Project Explorer找到Servers->server.xml（需要搭建好Tomcat环境），
找到：
``` xml
<Connector port="8080" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" />
```
修改为：
``` html
<Connector port="8080"  protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" URIEncoding="UTF-8" />
```

项目正式发布时
&emsp;&emsp;需要找到Tomcat安装目录下conf/server.xml，当然，修改位置不变。

### 最后
&emsp;&emsp;上述步骤操作完成后，乱码问题将不会再出现，如果本文没有帮你解决问题或者文章有错误的地方，请在评论区留言。
