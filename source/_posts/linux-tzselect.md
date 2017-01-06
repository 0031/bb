layout: article
title: Linux下如何修改时区
date: 2016-12-28 16:27:55
tags:
	- Linux
	- Shell
	- OS
---

{% imgurl assets/images/a/linux-tzselect/1.jpg %}

上次有[一篇文章]写到了时区的修改，本应把这篇文章融在那里面，
但是感觉好像代码又有点多，突出不了那篇文章的主题（是想突出Java中如何修改时区），
因此把它移到这里来，做个小结。

<!-- more -->

1. 键入 date -R ，查看时区：
``` bash
[root@user ~]# date -R
Wed, 28 Dec 2016 08:48:12 +0000
```
可以看到这是0时区，才8点多，我所在的位置实际上已经16点多了。
<br/>

2. 键入 tzselect ，选择时区
&emsp;这里我们选择Asia（亚洲）：
``` bash
[root@user ~]# tzselect
Please identify a location so that time zone rules can be set correctly.
Please select a continent or ocean.
 1) Africa
 2) Americas
 3) Antarctica
 4) Arctic Ocean
 5) Asia
 6) Atlantic Ocean
 7) Australia
 8) Europe
 9) Indian Ocean
10) Pacific Ocean
11) none - I want to specify the time zone using the Posix TZ format.
#? 5
```
&emsp;然后选择China（中国）：
``` bash
Please select a country.
 1) Afghanistan           18) Israel                35) Palestine
 2) Armenia               19) Japan                 36) Philippines
 3) Azerbaijan            20) Jordan                37) Qatar
 4) Bahrain               21) Kazakhstan            38) Russia
 5) Bangladesh            22) Korea (North)         39) Saudi Arabia
 6) Bhutan                23) Korea (South)         40) Singapore
 7) Brunei                24) Kuwait                41) Sri Lanka
 8) Cambodia              25) Kyrgyzstan            42) Syria
 9) China                 26) Laos                  43) Taiwan
10) Cyprus                27) Lebanon               44) Tajikistan
11) East Timor            28) Macau                 45) Thailand
12) Georgia               29) Malaysia              46) Turkmenistan
13) Hong Kong             30) Mongolia              47) United Arab Emirates
14) India                 31) Myanmar (Burma)       48) Uzbekistan
15) Indonesia             32) Nepal                 49) Vietnam
16) Iran                  33) Oman                  50) Yemen
17) Iraq                  34) Pakistan
#? 9
```
&emsp;选择北京时间：
``` bash
Please select one of the following time zone regions.
1) Beijing Time
2) Xinjiang Time
#? 1
```
&emsp;确认当期时间是否正确（这是掏出你的手表看下对不对O(∩_∩)~）：
``` bash
The following information has been given:
        China
        Beijing Time
Therefore TZ='Asia/Shanghai' will be used.
Local time is now:      Wed 28 Dec 17:08:05 CST 2016.
Universal Time is now:  Wed 28 Dec 09:08:05 UTC 2016.
Is the above information OK?
1) Yes
2) No
#? 1
```
&emsp;系统给了一个修改时区的命令：
``` bash
You can make this change permanent for yourself by appending the line
        TZ='Asia/Shanghai'; export TZ
to the file '.profile' in your home directory; then log out and log in again.
Here is that TZ value again, this time on standard output so that you
can use the /usr/bin/tzselect command in shell scripts:
Asia/Shanghai
```
&emsp;复制其中的 TZ='Asia/Shanghai'; export TZ ，并执行：
``` bash
[root@user ~]# TZ='Asia/Shanghai'; export TZ
```
&emsp;键入 键入 tzselect ，再次查看时间，则为东八区了：
``` bash
[root@user ~]# date -R
Wed, 28 Dec 2016 17:10:16 +0800
```

<br/>

当然，除了tzselect命令，还有其他一些修改时区的方法，就不在这里一一介绍了。

  [一篇文章]: /2016/12/25/time-not-consistent/