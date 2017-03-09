layout: a
title: SpringMVC绑定Json参数之忽略未知属性
date: 2017-03-09 10:48:13
tags:
  - SpringMVC
  - 参数绑定
---

{% imgurl assets/images/a/spring-mvc-json-ignore-properties/1.jpg %}

莫名其妙，今天往后台发送请求时，报400错误，控制台也不打印异常，不进入控制器。
原来由于使用SpringMVC进行参数绑定的时候，对传入的参数有一定的限制，不符合要求就会响应400错误。
发生该错误有2个原因：
1. 参数名相同，参数类型不一致。
2. 传入了未知属性，对复杂数据类型来说，例如如User中只有name属性，请求内容中却有name和age。

<!-- more -->

##### 参数绑定

SpringMVC为了方便开发者，特地提供了一些基本参数绑定方式，如简单类型的参数绑定、Pojo参数绑定、List参数绑定、Map参数绑定等等。
这里不描述其方法，如有需要请移步[SpringMVC中的参数绑定总结]，当然，网上也有很多相关教程。


##### Json参数绑定

敲黑板，Json格式的参数绑定非常实用！！！上面的参数绑定基本是围绕表单数据，并不是所有的场景都适用，当除了需要传表单数据还有附加其他复杂的数据，则需要封装成Json格式发到后台。

配置Json参数绑定：

_前台发送请求_

``` javascript
var user = {
  name: '张三',
  sex: '男',
  age: 20,
  place: '北京东城区'
};
$.ajax(function(){
  url: '/checkUser',
  // 向后台发送数据的参数格式
  dataType: 'json',
  // 接收后台响应数据的格式
  contentType: 'application/json;charset=utf-8',
  data: JSON.stringify({
    user: user
  })
})
.then(function(data){
  // success
})
.fail(function(error){
  // fail
});
```

_后台接收请求_

控制器：

``` java
@RequestMapping(value = "checkUser")
// 加入@ResponseBody注解，SpringMVC使用Jackson将返回值转为Json格式
public @ResponseBody String checkUser(User user) {
  // get some data...
  User u = new User("张三","男",20);
  if(user == u){
    return "同一个人";
  }
  return "不是同一个人";
}
```

User：
``` java
public class User {
  private String name;
  private String sex;
  private int age;
  User(String name,String sex,int age){
    // ...
  }
  // getter... setter...
}
```

逻辑上来说，上述代码没有什么问题，可是SpringMVC会抛出400异常，开篇已经解释了原因，这里的place作为未知属性传入，是Spring无法进行参数绑定的，参数名为user所对应的属性一致，可以少但不可以多。

为了解决这样的错误，有两种方案：

1.不传place字段
2.修改后台配置，使其能够过滤未知属性

可想而知，选后者更明智一些。

<br />

过滤未知属性只需要在User前增加一个注解
@JsonIgnoreProperties(ignoreUnknown=true)

User：
``` java
// 忽略传入的json未知属性
@JsonIgnoreProperties(ignoreUnknown=true)
public class User {
  // attrs...
  // getter... setter...
}
```
再试试看，这次不会再有错了吧。


##### 最后

每一次的记录，只是为了下一次少踩坑，减少错误的发生，写更稳定的代码！

  [SpringMVC中的参数绑定总结]: http://blog.csdn.net/eson_15/article/details/51718633