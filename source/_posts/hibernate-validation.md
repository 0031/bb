layout: a
title: Hibernate校验器的正确打开方式
date: 2017-02-22 09:16:08
tags:
  - Hibernate
  - 参数验证
---

{% imgurl assets/images/a/hibernate-validation/1.png %}

之前学习SpringMVC时，听说过一些校验器，在Bean中配置一些注解，即可方便的进行参数验证。
但是由于当时在学校，写的系统并不太复杂，参数并不多，还有就是没有花心思去学（说白了就是懒），因此没有用到。
但现在来实习，发现他们以前写的代码和我在学校写的类似，但是参数太多，意味着加一个参数就要在控制器中新加一行代码，非常不便于维护。
所以我才选择了校验器来对他们的代码进行优化（算是为自己减少维护量吧，实在是涉及的字段有点多），于是找到了Hibernate校验器。

<!-- more -->

##### 注解

关于引用依赖包可以查看[参考来源]，下面说说常用注解：

| 注解			 | 作用
| :------------- | :--------------------------------
| AssertTrue	 | 布尔值为真
| AssertFalse	 | 布尔值为假
| Null			 | 引用为空
| NotNull		 | 引用不为空
| NotEmpty		 | 字符串引用和值都不是空
| Min			 | 数字的最小值
| Max			 | 数字的最大值
| Past			 | 日期必须是过去
| Future		 | 日期必须是未来
| Pattern		 | 字符串必须匹配正则表达式
| Valid			 | 递归验证引用
| Size			 | 验证字符串是否在Size范围内
| Email			 | 验证字符串是否是一个有效的电子邮箱
| URL			 | 字符串是否是一个有效的URL

##### 如何使用

在bean中需要做验证的变量前加入注解，示例如下：

``` java
public class User {
	// 用户名肯定不允许为空吧
	@NotEmpty
	private String name;
	// 加入时间肯定不能是将来时吧，也不能为空吧
	@Past
	@NotNull
	private Date joinDate;
	// 年龄不能为负数吧，最久也没听说过活到150的吧（大不了顶破天给他个200）
	@Size(min = 0, max = 150)
	private int age;
	// get/set方法不在此贴出
}
```

然后在控制器中执行验证即可：

``` java
@Controller
public class LoginController {
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public int getArchiveTable(User user) {
		// 先初始化校验器
		ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		Validator validator = factory.getValidator();
		Set<ConstraintViolation<T>> set = validator.validate(user);
		// 如果集合元素个数为0，通过验证
		if(set.size() == 0){
			// 此处执行其他逻辑...
			// 返回至页面
			return 1;
		}
		// 未通过验证
		return 0;
	}
}
```

##### 自定义工具类

由于经常使用到几个变量，为提高复用性，节省开发时间，因此诞生了一个Util工具类：

``` java
// Hibernate校验器帮助类，对常用的几个变量做了统一处理
// 在bean中需要配置校验注解例如@NotNull、@Valid等
public class ValidateUtil {
	// 使用校验器，先对数据进行合法性校验
	private static ValidatorFactory factory;
	private static Validator validator;
	// 对变量进行初始化
	static{
		factory = Validation.buildDefaultValidatorFactory();
		validator = factory.getValidator();
	}
	// 使用完后销毁factory对象
	public void finalize() {
		factory.close();
	}
	// 执行校验并返回校验结果集
	public static <T> Set<ConstraintViolation<T>> validate(T obj){
		return validator.validate(obj);
	}
	// 执行校验并返回是否合法，合法返回true
	public static <T> boolean isLegal(T obj){
		return validate(obj).size() == 0 ? true : false;
	}
	// 通过结果集获取错误信息，如果没有则返回空
	public static <T> String getMessage(Set<ConstraintViolation<T>> set){
		if(set.size() != 0){
			StringBuffer msg = new StringBuffer();
			for (ConstraintViolation<T> c : set) {
				msg.append(c.toString());
				msg.append(",");
			}
			// 删除最后一个,返回结果
			msg.deleteCharAt(msg.length() - 1);
			return msg.toString();
		}
		return null;
	}
}
```
<small>如果您觉得我的方法有需要优化的地方，欢迎在评论区吐槽！O(∩_∩)O~</small>

如果使用工具类，那么在控制器中的代码可以简化了：

``` java
@Controller
public class LoginController {
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public int getArchiveTable(User user) {
		// 通过工具类判断参数是否合法
		if(ValidateUtil.isLegal(user)){
			// 此处执行其他逻辑...
			// 返回至页面
			return 1;
		}
		// 未通过验证
		return 0;
	}
}
```

##### 最后废话几句

为了节省维护成本，前期多花时间写高质量的代码，否则慢慢的会发现，越来越多的坑在前面等着你。

<br/>
<hr/>

参考来源：

① [Hibernate Validator简介]

  [参考链接]: #参考链接
  [Hibernate Validator简介]: http://www.jianshu.com/p/6cf7bccce73f