// pages/text/text.js
import Canvas from '../../utils/canvas.js'
// const ctx2=wx.createCanvasContext(id);
// const app = getApp()
// var mymap = '';
// var lat = '';
// var long = '';
// const ctx2 = wx.createCanvasContext(id);
// // var startX, endX;
// // var moveFlag = true;// 判断执行滑动事件
// wx.createSelectorQuery().select('#'+id).boundingClientRect(function (rect) { //监听canvas的宽高
//   console.log(rect);
//     var w = parseInt(rect.width / 2); //获取canvas宽的的一半
//     var h = parseInt(rect.height / 2); //获取canvas高的一半，
//   }).exec();
  
// var context = new wx.createCanvasContext('canvasid', this);
// var strat_num = 1, end_num = 20;
// var sAngle = 1.5 * Math.PI, eAngle = 0;
// wx.createSelectorQuery().select('#'+id).boundingClientRect(function (rect) { //监听canvas的宽高
//   console.log(rect);
//     var w = parseInt(rect.width / 2); //获取canvas宽的的一半
//     var h = parseInt(rect.height / 2); //获取canvas高的一半，
//   }).exec();
  
Page({
  ...Canvas.options,
  /**
   * 页面的初始数据
   */
  data: {
    ...Canvas.data,
    // yuan:{height:110}
    // page : 1,
    // ani1: '',
    // ani2: '',
    // toView: 'green',
    // userInfo: {},
    // showAuth: true,
    // code:'',
    // showModal: false,
    // hideModal: true, //模态框的状态  true-隐藏  false-显示
    // items: [
    //   {value: 'USA', name: '美国'},
    //   {value: 'CHN', name: '中国', checked: 'true'},
    //   {value: 'BRA', name: '巴西'},
    //   {value: 'JPN', name: '日本'},
    //   {value: 'ENG', name: '英国'},
    //   {value: 'FRA', name: '法国'},
    // ]
    // timer:null,
    // hours: '0' + 0,   // 时
    // minute: '0' + 0,   // 分
    // second: '0' + 0    // 秒,
    // navigate_type:'',//分类类型，是否包含二级分类
    // slideWidth:'',//滑块宽
    // slideLeft:0 ,//滑块位置
    // totalLength:'',//当前滚动列表总长
    // slideShow:false,
    // slideRatio:''
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   }, {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color: '#FF0000DD',
    //   width: 2,
    //   dottedLine: true
    // }],
    // controls: [{
    //   id: 1,
    //   iconPath: '/images/mk.png',
    //   position: {
    //     left: 0,
    //     top: 300 - 1,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    // }]
    // progress_txt: '正在匹配中...', 
    // count:0, // 设置 计数器 初始为0
    // countTimer: null // 设置 定时器 初始为null
    // percentage: '', //百分比
    // animTime: '', // 动画执行时间
  },
//   run(c, w, h) {  //c是圆环进度百分比   w，h是圆心的坐标
// 	  let that = this;
// 	  var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
// 	  //圆环的绘制
// 	  ctx2.arc(w, h, w - 8, -0.5 * Math.PI, num); //绘制的动作
// 	 ctx2.setStrokeStyle("#ff5000"); //圆环线条的颜色
// 	  ctx2.setLineWidth("16");	//圆环的粗细
// 	  ctx2.setLineCap("butt");	//圆环结束断点的样式  butt为平直边缘 round为圆形线帽  square为正方形线帽
// 	  ctx2.stroke();
// 	  //开始绘制百分比数字
// 	  ctx2.beginPath();
// 	  ctx2.setFontSize(40); // 字体大小 注意不要加引号
// 	  ctx2.setFillStyle("#ff5000");	 // 字体颜色
// 	  ctx2.setTextAlign("center");	 // 字体位置
// 	  ctx2.setTextBaseline("middle");	 // 字体对齐方式
// 	  ctx2.fillText(c + "%", w, h);	 // 文字内容和文字坐标
// 	  ctx2.draw();
// },
// canvasTap(start, end, time, w, h) {  //传入开始百分比和结束百分比的值，动画执行的时间，还有圆心横纵坐标
//   var that = this;
//   start++;
//   if (start > end) {
//     return false;
//   }
//   that.run(start, w, h); //调用run方法
//   setTimeout(function () {
//     that.canvasTap(start, end, time, w, h);
//   }, time);
// },
//   run(c, w, h) {  //c是圆环进度百分比   w，h是圆心的坐标
// 	  let that = this;
// 	  var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
// 	  //圆环的绘制
// 	  ctx2.arc(w, h, w - 8, -0.5 * Math.PI, num); //绘制的动作
// 	 ctx2.setStrokeStyle("#ff5000"); //圆环线条的颜色
// 	  ctx2.setLineWidth("16");	//圆环的粗细
// 	  ctx2.setLineCap("butt");	//圆环结束断点的样式  butt为平直边缘 round为圆形线帽  square为正方形线帽
// 	  ctx2.stroke();
// 	  //开始绘制百分比数字
// 	  ctx2.beginPath();
// 	  ctx2.setFontSize(40); // 字体大小 注意不要加引号
// 	  ctx2.setFillStyle("#ff5000");	 // 字体颜色
// 	  ctx2.setTextAlign("center");	 // 字体位置
// 	  ctx2.setTextBaseline("middle");	 // 字体对齐方式
// 	  ctx2.fillText(c + "%", w, h);	 // 文字内容和文字坐标
// 	  ctx2.draw();
// },
// canvasTap(start, end, time, w, h) {  //传入开始百分比和结束百分比的值，动画执行的时间，还有圆心横纵坐标
//   var that = this;
//   start++;
//   if (start > end) {
//     return false;
//   }
//   that.run(start, w, h); //调用run方法
//   setTimeout(function () {
//     that.canvasTap(start, end, time, w, h);
//   }, time);
// },
  // countInterval: function () {
  //   // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
  //   this.countTimer = setInterval(() => {
  //     if (this.data.count <= 60) {
  //       /* 绘制彩色圆环进度条  
  //       注意此处 传参 step 取值范围是0到2，
  //       所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
  //       */
  //        this.drawCircle(this.data.count / (60/2))
  //       this.data.count++;
  //     } else {
  //       this.setData({
  //         progress_txt: "匹配成功"
  //       }); 
  //       clearInterval(this.countTimer);
  //     }
  //   }, 100)
  // },

  // drawProgressbg: function(){
  //   // 使用 wx.createContext 获取绘图上下文 context
  //   var ctx = wx.createCanvasContext('canvasProgressbg')
  //   ctx.setLineWidth(4);// 设置圆环的宽度
  //   ctx.setStrokeStyle('#20183b'); // 设置圆环的颜色
  //   ctx.setLineCap('round') // 设置圆环端点的形状
  //   ctx.beginPath();//开始一个新的路径
  //   ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
  //   //设置一个原点(100,100)，半径为90的圆的路径到当前路径
  //   ctx.stroke();//对当前路径进行描边
  //   ctx.draw();
  // },
// //计时开始
// start: function () {
//   let _this = this;
//   _this.setInterval();
// },
// // 计时器
// setInterval: function () {
//   const _this = this
//   var second = _this.data.second
//   var minute = _this.data.minute
//   var hours = _this.data.hours
//   _this.data.timer = setInterval(function () {  // 设置定时器
//     second++
//     if (second >= 60) {
//       second = 0  //  大于等于60秒归零
//       minute++
//       if (minute >= 60) {
//         minute = 0  //  大于等于60分归零
//         hours++
//         if (hours < 10) {
//           // 少于10补零
//           _this.setData({
//             hours: '0' + hours
//           })
//         } else {
//           _this.setData({
//             hours: hours
//           })
//         }
//       }
//       if (minute < 10) {
//         // 少于10补零
//         _this.setData({
//           minute: '0' + minute
//         })
//       } else {
//         _this.setData({
//           minute: minute
//         })
//       }
//     }
//     if (second < 10) {
//       // 少于10补零
//       _this.setData({
//         second: '0' + second
//       })
//     } else {
//       _this.setData({
//         second: second
//       })
//     }
//   }, 1000)
// },

// //暂停
// stop: function () {
//   let _this = this;
//   clearInterval(_this.data.timer);
// },
//    //点击我显示底部弹出框
//  clickme: function () {
//   this.showModal();
// },
// upper(e) {
//   console.log(e)
// },
// touchStart: function (e) {
//   startX = e.touches[0].pageX; // 获取触摸时的原点
//   moveFlag = true;
// },
// 触摸移动事件
// touchMove: function (e) {
//   endX = e.touches[0].pageX; // 获取触摸时的原点
//   if (moveFlag) {
//     if (endX - startX > 50) {
//       console.log("move right");
//       this.move2right();
//       moveFlag = false;
//     }
//     if (startX - endX > 50) {
//       console.log("move left");
//       this.move2left();
//       moveFlag = false;
//     }
//   }
// },
// 触摸结束事件
// touchEnd: function (e) {
//   moveFlag = true; // 回复滑动事件
// },
// //向左滑动操作
// move2left() {
//   var that = this;
//   if (this.data.page == 2) {
//     return
//   }
//   var animation = wx.createAnimation({
//     duration: 1000,
//     timingFunction: 'ease',
//     delay: 100
//   });
//   animation.opacity(0.2).translate(-500, 0).step()
//   this.setData({
//     ani1: animation.export()
//   })
//   setTimeout(function () {
//     that.setData({
//       page: 2,
//       ani2: ''
//     });
//   }, 800)
// },
//向右滑动操作
// move2right() {
//   var that = this;
//   if (this.data.page == 1) {
//     return
//   }
//   var animation = wx.createAnimation({
//     duration: 1000,
//     timingFunction: 'ease',
//     delay: 100
//   });
//   animation.opacity(0.2).translate(500, 0).step()
//   this.setData({
//     ani2: animation.export()
//   })
//   setTimeout(function () {
//     that.setData({
//       page: 1,
//       ani1: ''
//     });
//   }, 800)
//   },
// lower(e) {
//   console.log(e)
// },

// scroll(e) {
//   console.log(e)
// },

// scrollToTop() {
//   this.setAction({
//     scrollTop: 0
//   })
// },

// tap() {
//   for (let i = 0; i < order.length; ++i) {
//     if (order[i] === this.data.toView) {
//       this.setData({
//         toView: order[i + 1],
//         scrollTop: (i + 1) * 200
//       })
//       break
//     }
//   }
// },

// tapMove() {
//   this.setData({
//     scrollTop: this.data.scrollTop + 10
//   })
// },
//  //显示对话框
//  showModal: function () {
//   // 显示遮罩层
//   var animation = wx.createAnimation({
//     duration: 200,
//     timingFunction: "linear",
//     delay: 0
//   })
//   this.animation = animation
//   animation.translateY(300).step()
//   this.setData({
//     animationData: animation.export(),
//     showModalStatus: true
//   })
//   setTimeout(function () {
//     animation.translateY(0).step()
//     this.setData({
//       animationData: animation.export()
//     })
//   }.bind(this), 200)
// },
// //隐藏对话框
// hideModal: function () {
//   // 隐藏遮罩层
//   var animation = wx.createAnimation({
//     duration: 200,
//     timingFunction: "linear",
//     delay: 0
//   })
//   this.animation = animation
//   animation.translateY(300).step()
//   this.setData({
//     animationData: animation.export(),
//   })
//   setTimeout(function () {
//     animation.translateY(0).step()
//     this.setData({
//       animationData: animation.export(),
//       showModalStatus: false
//     })
//   }.bind(this), 200)
// },
//   radioChange(e) {
//     console.log('radio发生change事件，携带value值为：', e.detail.value)

//     const items = this.data.items
//     for (let i = 0, len = items.length; i < len; ++i) {
//       items[i].checked = items[i].value === e.detail.value
//     }

//     this.setData({
//       items
//     })
//   },
  // showModal: function() {
  //   var that = this;
  //   that.setData({
  //     hideModal: false
  //   })
  //   var animation = wx.createAnimation({
  //     duration: 600, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快 
  //     timingFunction: 'ease', //动画的效果 默认值是linear 
  //   })
  //   this.animation = animation
  //   setTimeout(function() {
  //     that.fadeIn(); //调用显示动画 
  //   }, 200)
  // },
 
  // 隐藏遮罩层 
  // hideModal: function() {
  //   var that = this;
  //   var animation = wx.createAnimation({
  //     duration: 800, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快 
  //     timingFunction: 'ease', //动画的效果 默认值是linear 
  //   })
  //   this.animation = animation
  //   that.fadeDown(); //调用隐藏动画 
  //   setTimeout(function() {
  //     that.setData({
  //       hideModal: true
  //     })
  //   }, 720) //先执行下滑动画，再隐藏模块 
  // },
  // draw: function (id, percent, animTime) {
  //   var that = this;
  //   const ctx2 = wx.createCanvasContext(id);
  //   that.setData({
  //     ctx2:ctx2,
  //     percentage:percent,
  //     animTime: animTime
  //   });
  //   var time = that.data.animTime / that.data.percentage;
  //   wx.createSelectorQuery().select('#'+id).boundingClientRect(function (rect) { //监听canvas的宽高
  //     var w = parseInt(rect.width / 2); //获取canvas宽的的一半
  //     var h = parseInt(rect.height / 2); //获取canvas高的一半，
  //     that.canvasTap(0, that.data.percentage, time, w, h)
  //   }).exec();
  // },
  //动画集 
  // fadeIn: function() {
  //   this.animation.translateY(0).step()
  //   this.setData({
  //     animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性 
  //   })
  // },
  // fadeDown: function() {
  //   this.animation.translateY(300).step()
  //   this.setData({
  //     animationData: this.animation.export(),
  //   })
  // },

//   checkSession(){
//     const _this=this;
//     wx.checkSession({
//       success: (res) => {
//         //session_key 未过期，并且在本生命周期一直有效
//         wx.showToast({
//           title: '处于登录状态',
//           icon:"success",
//           duration:2000
//         });
//       },
//       fail(){
//         //session_key 已经失效，需要重新执行登录流程
//         wx.showToast({
//           title: '登录已失效',
//           icon:'none',
//           duration:2000
//         });
//         _this.login()//重新登录
//       }
//     })
//   },
//   submit: function() {
//     this.setData({
//     showModal: true
//     })
// },

// preventTouchMove: function() {

// },


// go: function() { 
//     this.setData({
//     showModal: false
//     })
// },
//   getUserInfo:function(e){
//     console.log(e)
//     app.globelUrl.userInfo=e.detail.userInfo
//     this.setData({
//       userInfo:e.detail.userInfo,
//       // hasUserInfo:true
//     })
//   },
  

//   recharge(){
   
//   },
  //获取用户的授权信息
  // auth: function (e) {
  //   //json字符串
  //   var userInfo = JSON.stringify(e.detail.userInfo);
  //   console.log(userInfo);
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     showAuth: false
  //   })
  //   //  console.log(e)
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  //在页面加载完成是调用
  onLoad: function (options) {
    this.draw('runCanvas',100,3000);
    //0.先检验本地缓存中是否有token,直接请求后端服务器，获取数据库用户信息
    //token过期
    //1.wx.login(),获取到code
    //2.把code传给后端,后端换取openid和session_key
    //3.如果openid存在与数据库当中，直接根据openid查询的信息返回给前端，返回信息和token
    //4.如果openid不存在数据库当中，把openid存在数据库当中，相当于插入user用户，只不过昵称，头像都是空的
    //依然返回用户信息和token
    //5.前端肯定获取用户信息和token,如果用户信息是空的，说明没有授权过，就要显示授权按钮，等待用户授权
    //6.用户同意授权之后，可以通过wx.getUserInfo()拿到用户信息，把信息传给后端，请求头携带token
    //7.后端接收到请求之后，根据token获取到对应的user表记录，用户，将信息更新到数据库表
    //检查是否授权
    //可以通过wx.getSetting 先查询一下用户是否授权了"scope.record"这个scope
  //  var that=this;
  //   wx.getSetting({
  //     success(res) {
  //       if (res.authSetting['scope.userInfo']) {
  //         //必须是在用户已经授权情况下调用
  //         wx.getUserInfo({
  //           success: function(res) {
  //              that.setData({
  //                userInfo:res.userInfo,
  //                showAuth:false
  //              })
  //           }
  //         })
  //       }
  //     }
  //   })
  
  // var times=0
  // var i=setInterval(function(){
  //   times++
  //   if(times>=30){
  //     console.log(1111)
  //   }
  //   // clearInterval(i)
  // },2000)
  // var self = this ;
  // var systemInfo = wx.getSystemInfoSync() ;
  // self.setData({
  //   list: _list,
  //   windowHeight: app.globalData.navigate_type == 1 ? systemInfo.windowHeight : systemInfo.windowHeight - 35,
  //   windowWidth: systemInfo.windowWidth,
  //   navigate_type: app.globalData.navigate_type
  // })
  // //计算比例
  // self.getRatio();
  // },
  //  //根据分类获取比例
  //  getRatio(){
  //   var self = this ;
  //   if (!self.data.tlist[self.data.currentTab].secondList || self.data.tlist[self.data.currentTab].secondList.length<=5){
  //     this.setData({
  //       slideShow:false
  //     })
  //   }else{
  //     var _totalLength = self.data.tlist[self.data.currentTab].secondList.length * 150; //分类列表总长度
  //     var _ratio = 230 / _totalLength * (750 / this.data.windowWidth); //滚动列表长度与滑条长度比例
  //     var _showLength = 750 / _totalLength * 230; //当前显示红色滑条的长度(保留两位小数)
  //     this.setData({
  //       slideWidth: _showLength,
  //       totalLength: _totalLength,
  //       slideShow: true,
  //       slideRatio:_ratio
  //     })
  //   }
  // } ,
  // //slideLeft动态变化
  // getleft(e){
  //   this.setData({
  //     slideLeft: e.detail.scrollLeft * this.data.slideRatio
  //   })
  // var url = app.url + 'Api/Api/get_shop_dp&PHPSESSID=' + wx.getStorageSync('PHPSESSID')
  // var that = this
  // console.log(option)
  // if (option.scene) {
  //   this.setData({
  //     isshow: false
  //   })
  //   wx.navigateTo({
  //     url: '../chat/chat?scene=' + option.scene,
  //   })
  // } else {
  //   this.setData({
  //     isshow: true
  //   })
  // }
  // wx.request({ //让服务器端统一下单，并返回小程序支付的参数
  //   url: url,
  //   data: {
  //     openid: wx.getStorageSync('openid')
  //   },
  //   success: function(res) {
  //     console.log(res);
  //     that.setData({
  //       markers: res.data.data
  //     });
  //     wx.getLocation({
  //       type: 'wgs84',
  //       success(mres) {
  //         var map_lat = mres.latitude;
  //         var map_long = mres.longitude;
  //         var map_speed = mres.speed;
  //         var map_accuracy = mres.accuracy;
  //         that.setData({
  //           lat: map_lat
  //         });
  //         that.setData({
  //           long: map_long
  //         });
  //       }
  //     });
  //   }
  // });
  // var windowidth = 700;
  // var colw=windowidth / 3;
  // this.setData({
  //   yuan:{
  //     height:colw
  //   }
  // })
  // this.createCanvas('one',colw /2,'red','第一','80',100);
  // this.createCanvas('two', colw / 2, 'red', '第一', '50',100);

   },
  // createCanvas:function(id,xy,color,txt,val,total){
  //   var ctx=wx.createCanvasContext(id);
  //   ctx.setLineWidth(8);
  //   ctx.setStrokeStyle('#ffffff');
  //   ctx.setLineCap('round');
  //   ctx.beginPath();
  //   ctx.arc(xy,xy,0.75*xy,0,2*Math.PI,false);
  //   ctx.stroke();
 
  //   ctx.setLineWidth(8);
  //   ctx.setStrokeStyle(color);
  //   ctx.setLineCap('round');
  //   var p=val / total;
 
  //   ctx.beginPath(xy);
  //   ctx.arc(xy,xy,0.75*xy,-90 * Math.PI / 180,(p*360 - 90)*Math.PI / 180,false);
  //   ctx.textAlign = "center";
  //   ctx.font = '14rpx Arial';
  //   ctx.fillText(txt, xy, 1.4 * xy, xy);
  //   ctx.font = '28rpx Arial';
  //   ctx.fillStyle = color;
  //   ctx.fillText(val, xy, 1.1 * xy, xy);
  //   ctx.stroke();//对当前路径进行描边
  //   ctx.draw();
  // },
  // showModal: function(event) {
  //   //console.log(event.markerId);
  //   var i = event.markerId;
  //   var url = app.url + 'Api/Api/get_shop_dp_detail&PHPSESSID=' + wx.getStorageSync('PHPSESSID');
  //   var that = this;
  //   console.log('====get_detail====')
  //   wx.request({ 
  //     url: url,
  //     data: {
  //       id: i,
  //       openid: wx.getStorageSync('openid')
  //     },
  //     success: function(res) {
  //       console.log(res);
  //       that.setData({
  //         myall: res.data.data
  //       });
  //     }
  //   });
  //     // 显示遮罩层
  //     var animation = wx.createAnimation({
  //       duration: 200,
  //       timingFunction: "linear",
  //       delay: 0
  //     })
  //     this.animation = animation
  //     animation.translateY(300).step()
  //     this.setData({
  //       animationData: animation.export(),
  //       showModalStatus: true
  //     })
  //     setTimeout(function() {
  //       animation.translateY(0).step()
  //       this.setData({
  //         animationData: animation.export()
  //       })
  //     }.bind(this), 200)
  //   },
  //   //隐藏对话框
  //   hideModal: function() {
  //     // 隐藏遮罩层
  //     var animation = wx.createAnimation({
  //       duration: 200,
  //       timingFunction: "linear",
  //       delay: 0
  //     })
  //     this.animation = animation
  //     animation.translateY(300).step()
  //     this.setData({
  //       animationData: animation.export(),
  //     })
  //     setTimeout(function() {
  //       animation.translateY(0).step()
  //       this.setData({
  //         animationData: animation.export(),
  //         showModalStatus: false
  //       })
  //     }.bind(this), 200)
  //   },
   
  //   opendetail: function(event) {
  //     console.log('-----跳转商品-----');
  //     //console.log(event);
  //     var id = event.currentTarget.dataset.id;
  //     this.setData({
  //       id: id
  //     });
  //     wx.navigateTo({
  //         url: "/pages/detail/detail?id=" + id
  //       }),
  //       console.log(id);
  //   },
   
  //   calling: function(event) {
  //     var tel = event.currentTarget.dataset.id.tel;
  //     this.setData({
  //       tel: tel
  //     });
  //     wx.makePhoneCall({
  //       phoneNumber: tel,
  //       success: function() {
  //         console.log("拨打电话成功！")
  //       },
  //       fail: function() {
  //         console.log("拨打电话失败！")
  //       }
  //     })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.drawProgressbg();  
    // this.drawCircle(2) 
    // this.countInterval()
    // this.canvas()
  },
  // canvas:function(){
  //   var that=this;
  //   if (strat_num <= end_num){
  //     console.log('strat_num:', strat_num)
  //     eAngle = strat_num * 2 * Math.PI / end_num + 1.5 * Math.PI;
  //     setTimeout(function () {
  //       context.setStrokeStyle("#00ff00")
  //       context.setLineWidth(2)
  //       context.fillText(strat_num * 5 <= 100?strat_num * 5:100, 95, 95)
  //       context.arc(100, 100, 60, sAngle, eAngle, false)
  //       context.stroke()
  //       context.draw()
  //       that.canvas()
  //       strat_num++
  //   },200)
  //   } else {
  //     console.log('strat_num_end:', strat_num)
  //   }
  // },

  // drawCircle: function (step){  
  //   var context = wx.createCanvasContext('canvasProgress');
  //     // 设置渐变
  //     var gradient = context.createLinearGradient(200, 100, 100, 200);
  //     gradient.addColorStop("0", "#2661DD");
  //     gradient.addColorStop("0.5", "#40ED94");
  //     gradient.addColorStop("1.0", "#5956CC");
      
  //     context.setLineWidth(10);
  //     context.setStrokeStyle(gradient);
  //     context.setLineCap('round')
  //     context.beginPath(); 
  //     // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
  //     context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
  //     context.stroke(); 
  //     context.draw() 
  // },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})