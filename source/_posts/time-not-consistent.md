layout: article
title: 时间在不同操作系统下不一致
date: 2016-12-25 10:53:17
tags:
	- Java
	- Timezone
	- OS
---

{% imgurl assets/images/a/time-not-consistent/1.jpg %}

时间不一致，是由于时区设置不统一，
这个问题并不是所有开发者都能遇到，
开发与生产环境都在同类型操作系统下，
比如C#，均用Windows系统，就不用担心。

<!-- more -->

之前，我在博客上发布文章时，遇到了这个问题，
发布文章时，本地时间15点多，而服务器上显示7点多，
开始以为程序在时间戳上的转换可能有逻辑错误，通过打断点调试，并没有发现任何错误，
然后又重新导出war包，放在服务器上，再次发布新的文章，可是问题依然没有得到解决。

于是只能求助于网络，了解了其中的原因。
要解决该问题，首先需要了解几个东西：

##### 格林威治标准时间（GMT）

十七世纪，英国为了海上霸权的扩张计划，格林威治皇家天文台进行天体观测，
1884年，决定通过格林威治的子午线作为划分地球东西两半球的经度零度。
旧皇家观测所门口墙上有一个时钟，显示当下时间，这个时间就是世界时间参考点，
这就是格林威治标准时间（Greenwich Mean Time）的由来。


##### 世界协调时间（UTC）

Coordinated Universal Time【为什么缩写是UTC，挠头(⊙o⊙)?】是经过平均太阳时（以GMT为准）、
地轴运动修正后的新时标以及以秒为单位的国际原子时所综合精算而成的时间，
计算过程相当严谨精密，因此UTC比GMT更加精准。

站在一个软件开发者角度来说，GMT => 时间标准1.0，UTC => 时间标准2.0，
都可以用，只是对某些要求更高的人来说后者更适用。


##### 东八区（GMT+8/UTC+8）

在那个年代，中国海事比不上发达国家，因此只能沿用世界标准，
由于地理位置因素，北京时间大约快了8个小时，因此东八区诞生了，
本来全中国横跨多个时区，比如新疆时钟指向8点时，其实只有4点多，
但为了全国标准一致，均使用北京时间，特别行政区除外。
当然，我们在程序中看到的应该是 CST：中国标准时间（China Standard Time）


_找到“病根”，对症“下药”！_


##### 修改操作系统属性

_Linux：_ 由于代码篇幅比较大，请移步至[Linux下如何修改时区]。

_Windows：_ 直接在桌面右下角找到时间的位置，然后选择日期和时间，弹出窗口中找到时区的更改即可，
由于Windows不同版本界面不尽相同，所以不在此截图演示。

_Mac：_ 穷屌买不起，无法做出任何说明。


##### 修改程序代码（以Java示例）

其实这才是本文重点，直接在程序代码中控制时区转换即可，一次付出，终身受益。
方法也很简单，可以写一个关于时间的Util工具类：
``` java
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
public class TimeUtils {
	// 日志，可以在调试过程中快速定位错误位置
	protected static final Log log = LogFactory.getLog(TimeUtils.class);
	
	// 配置一个默认时区，当然也可以写入至xml文件中
	public static final String TIME_ZOME = "Asia/Shanghai";
	
	// 如果用到Calendar 可以这样修改时区
	private static Calendar cal = Calendar.getInstance();
	static {
		cal.setTimeZone(TimeZone.getTimeZone(TIME_ZOME));
	}
	/**
	 * 根据固定格式转换
	 * @param date		日期
	 * @param format	日期格式 如yyyy-MM-dd HH:mm:ss
	 * @return
	 */
	public static String simpleDateFormat(Date date,String format){
		try {
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
			// 如果用SimpleDateFormat这样修改时区
			simpleDateFormat.setTimeZone(TimeZone.getTimeZone(TIME_ZOME));
			return simpleDateFormat.format(date);
		} catch (Exception e) {
			log.debug("日期格式化出错: " + e.getMessage());
		}
		return null;
	}
	/** 其他函数不在此贴出 **/
}
```
如此修改后，在今后的代码编写中不用在担心时区不统一的问题了。

  [Linux下如何修改时区]: /2016/12/28/linux-tzselect/