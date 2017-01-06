// 使用闭包封装插件
;(function () {
  // 严格模式
  'use strict';
  var options = {
    elem: 'return-to-top',  // 返回顶部元素
    scroll: ''             // 滚动条基准，默认以浏览器滚动条，当然你可以设置为div的id
  }
  // 接收元素
  var elem = document.getElementById('return-to-top');
  // 接收滚动条基准，默认则是浏览器滚动条
  var scrollElem = window;
  // 元素最初的class内容
  var initClassName = '';
  // 滚动条计时器
  var timeout = false;

  // 核心函数，将会暴露给调用者
  var api = {
    // 初始化
    init: function(ops){
      // 有参数传入
      if(ops){
        for(var key in ops){
          options[key] = ops[key];
        }
      }
      elem = document.getElementById(options.elem) || elem;
      scrollElem = document.getElementById(options.scroll) || scrollElem;
      initClassName = elem.className;
      // 监听滚动条滚动
      scroll();
      // 监听点击事件
      click();
      // 方便生成执行链，由于这里只有一个函数，则无需此步骤
      // return this;  
    }
  }


  // 内部函数
  /**
   * 让滚动条缓慢移动到顶部
   * callback 回调函数，回到顶部完成后再执行
   * acceleration 滚动速度，默认0.1
   * stime 滚动间隔时间，值越小越平滑，默认10 ms
   */
  function scrollToTop(callback,acceleration,stime){
    acceleration = acceleration > 0 ? acceleration : 0.1; // 速度不允许为负数
    stime = stime || 10;
    // 滚动条到页面顶部的水平距离
    var x = getScrollLeft(scrollElem);
    // 滚动条到页面顶部的垂直距离
    var y = getScrollTop(scrollElem);
    // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
    var speeding = 1 + acceleration;
    // window对象使用scrollTo方法，HTML元素使用srollLeft与scrollTop方法
    if(scrollElem === window){
      scrollElem.scrollTo(Math.floor(x / speeding) , Math.floor(y / speeding));
    }else{
      scrollElem.scrollLeft = Math.floor(x / speeding);
      scrollElem.scrollTop = Math.floor(y / speeding);
    }
    // 如果距离不为零, 继续调用函数
    if(x > 0 || y > 0) {
      setTimeout(function(){
        scrollToTop(callback,acceleration,stime);
      },stime);
    }else{
      if(typeof callback == 'function'){
        callback();
      }
    }
  }

  // 监听滚动条滚动事件，其中使用到了懒加载
  function scroll(){
    scrollElem.addEventListener('scroll',function(){   
        if (timeout)
          clearTimeout(timeout);
        timeout = setTimeout(function(){
          var top = getScrollTop(scrollElem);
          // 距顶部超过300时，显示元素
          if(top > 300){
            show();
          }else{
            hide();
          }
        },1000);   
    });
  }
  // 监听元素点击事件
  function click(){
    // 绑定点击事件
    elem.addEventListener('click', function (e) {
      e.stopPropagation();
      // 开始点击，激活元素
      elem.className = initClassName + ' active animated bounceOutUp';
      setTimeout(function(){
          reset();
          setStyle(elem,{
            display: 'none'
          });
      },500);
      // 回到顶部，然后执行回调函数，重置元素状态
      scrollToTop(reset);
    });
  }
  // 滚动到0,初始化元素
  function reset(){
    elem.className = initClassName;
  }

  // 显示
  function show(){
    if (isHidden()) {
      setStyle(elem,{
        display: 'block'
      });
      // 添加移入动画
      elem.className = initClassName + ' animated bounceInUp';
      // 一段时间后恢复原状
      setTimeout(function(){
          reset();
      },500);
    }
  }

  // 隐藏
  function hide(){
    if (!isHidden()) {
      // 添加移出动画
      elem.className = initClassName + ' animated fadeOutDown';
      setTimeout(function(){
          reset();
          setStyle(elem,{
            display: 'none'
          });
      },500);
    }
  }

  // 判断元素是显示状态还是隐藏状态
  function isHidden(){
    if(elem.style.display != 'none'){
      return false;
    }
    return true;
  }

  // 修改元素样式
  function setStyle (elem, styles) {
    var s = elem.style;
    for (var key in styles) {
      s[key] = styles[key];
    }
  }

  // 获取元素滚动条垂直距离
  function getScrollTop(elem){
    if(!isDom(elem)){
      // 元素不存在默认使用浏览器滚动条
      return getBodyScrollTop();
    }
    return elem.scrollTop;
  }
  // 获取元素滚动条水平距离
  function getScrollLeft(elem){
    if(!isDom(elem)){
      // 元素不存在默认使用浏览器滚动条
      return getBodyScrollLeft();
    }
    return elem.scrollLeft;
  }

  // 获取浏览器滚动条垂直距离
  // 谁的值大说明使用谁，在html中使用document.body，在xhtml中使用document.documentElement
  function getBodyScrollTop(){
    var y1 = document.body.scrollTop;
    var y2 = document.documentElement.scrollTop;
    var y3 = window.scrollY;
    return Math.max(y3,Math.max(y1,y2));
  }
  // 获取浏览器滚动条水平距离
  function getBodyScrollLeft(){
    var x1 = document.body.scrollLeft;
    var x2 = document.documentElement.scrollLeft;
    var x3 = window.scrollX;
    return Math.max(x3,Math.max(x1,x2));
  }
  // 判断是否dom对象
  function isDom(obj){
    // 常规浏览器，typeof HTMLElement === 'object'
    if (typeof HTMLElement === 'object') {
      return obj instanceof HTMLElement;
    }
    // Chrome、Opera浏览器，typeof HTMLElement == 'function' 
    else{
      return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
    }
  }
  // 绑定至window对象
  window.returnToTop = api;
})();

window.returnToTop.init({
  scroll: 'container'
});
