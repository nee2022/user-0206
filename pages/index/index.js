//index.js
//获取应用实例
const app = getApp()
// import Canvas from '../../utils/canvas.js'
Page({
  // ...Canvas.options,
  data: {
    // open: false,
    // guanbi: false,
    // userInfo: {},
    // confrim1: false,
    // confrim2: false,
    // confrim3: false,
    // confrim4: false,
    // confrim5: false,
    // confrim6: false,
    // confrim7: false,
    // hasUserInfo: false,
    hidden: true,
    latitude: '30.316015',
    longitude: '120.338034',
    markers: [],
    charger: 0,
    deals: [],
    minute1: [],
    none: true,
    hiddena: false,
    hidden2: true,
    hidden3: true,
    hidden4: true,
    hiddenf: false,
    minute: '',
    pay: 0,
    deal_no: '',
    to_top: false,
    // height_change2: false,
    // height_change3: false,
    charger_info: [],
    useful_port: 0,
    token: '',
    charger_num: 0,
    marker_server: 0,
    portrait: '../static/user.png',
    // ...Canvas.data
  },
  f3() {
    wx.redirectTo({
      url: '/pages/personal_center/pensonal_center',
    })
  },
  bicycle_charge() {
    wx.navigateTo({
      url: '/pages/bicycle_charge/bicycle_charge',
    })
  },
  car_charge() {
    wx.navigateTo({
      url: '/pages/car_charge/car_charge',
    })
  },
  park_stop() {
    wx.navigateTo({
      url: '/pages/park_stop/park_stop',
    })
  },
  road_stop() {
    wx.navigateTo({
      url: '/pages/road_stop/road_stop',
    })
  },

  getMyLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      }
    })
  },
  // 点击右上角小图标事件
  tap_ch: function () {
    this.setData({
      guanbi: true,
      hidden: false
    });
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },
  ensure1() {
    this.setData({
      confrim1: true,
      confrim1: !this.data.confrim1
    })
  },
  ensure2() {
    this.setData({
      confrim2: true,
      confrim2: !this.data.confrim2
    })
  },
  ensure3() {
    this.setData({
      confrim3: true,
      confrim3: !this.data.confrim3
    })
  },
  ensure4() {
    this.setData({
      confrim4: true,
      confrim4: !this.data.confrim4
    })
  },
  ensure5() {
    this.setData({
      confrim5: true,
      confrim5: !this.data.confrim5
    })
  },
  ensure6() {
    this.setData({
      confrim6: true,
      confrim6: !this.data.confrim6
    })
  },
  ensure7() {
    this.setData({
      confrim7: true,
      confrim7: !this.data.confrim7
    })
  },
  empty() {
    this.setData({
      confrim1: false,
      confrim2: false,
      confrim3: false,
      confrim4: false,
      confrim5: false,
      confrim6: false,
      confrim6: false,
      confrim7: false
    })
  },
  tap_end: function () {
    this.setData({
      open: false,
      guanbi: false,
      hidden: true
    });
    // }
  },
  //点击我显示底部弹出框
  task_place() {
    this.showModal();
  },
  clickme1(event) {
    var that = this;
    that.setData({
      hiddenf: true
    })
    function eee() {
      return new Promise(
        function (door) {
          that.showModal1();
          door();
          // console.log(111)
        }
      )
    }
    function ttt() {
      return new Promise(
        function () {
          var charger_num = event.detail.markerId
          that.setData({
            charger_num
          })
          // console.log(charger_num)
          var token = wx.getStorageSync('token')
          // console.log(token)
          wx.request({
            url: app.BASE_URL.globelUrl + '/user/api/charger/' + charger_num,
            method: 'GET',
            header: {
              "Content-Type": "application/json"
            },
            data: {
              token: token,
              attach: 'state,ports'
            },
            success: (res) => {
              // console.log(res)
              var charger_info = res.data.charger
              var ports = charger_info.ports;
              var useful_port = 0;
              var marker_server = charger_info.type;
              for (var key in ports) {
                if (ports[key].state == 0) {
                  useful_port++
                }
              }
              that.setData({
                charger_info,
                useful_port,
                marker_server
              })
            }
          })

        }

      )
    }
    eee().then(ttt);
  },
  showModal1: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData1: animation.export(),
      showModalStatus1: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData1: animation.export()
      })
    }.bind(this), 200)
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  hideModal1: function () {
    // 隐藏遮罩层
    var that = this;
    that.setData({
      hiddenf: false
    })
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData1: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData1: animation.export(),
        showModalStatus1: false
      })
    }.bind(this), 200)
  },
  f1(e) {
    var e = e.currentTarget.dataset.item;
    console.log(e)
    var e1 = e[0]
    var deal_no = e[2];
    var pay = e[1];
    if (e1 == '13') {
      setTimeout(() => {
        wx.redirectTo({
          url: `/pages/bicycle_charge/bicycle_charge?dealno=${deal_no}&pay=${pay}`,
        }, 1000)
      })
    }
  },
  //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  imagerotate() {
    var that = this;
    that.setData({
      to_top: !that.data.to_top,
      height_change2: !that.data.height_change2,
      height_change3: !that.data.height_change3
    })
    console.log(1111)
  },
  onLoad: function () {
    var that = this;
    // that.draw('runCanvas', 100, 3000);
    function aaa() {
      return new Promise(
        function (door) {
          var user = wx.getStorageSync('user');
          var portrait = user.portrait;
          if (portrait != '') {
            that.setData({
              portrait
            })
          }
          door();
        }
      )
    }
    function bbb() {
      return new Promise(
        function () {
          var token = wx.getStorageSync('token');
          console.log(token)
          if (token != '') {
            wx.request({
              url: app.BASE_URL.globelUrl + '/user/api/deals',
              method: 'GET',
              data: {
                token
              },
              success: (res) => {
                console.log(res)
                var deals = res.data.deals;
                that.setData({
                  deals
                })
                if (deals.length == 0) {
                  that.setData({
                    hiddena: true
                  })
                }
                var deals1 = [];
                for (var key in deals) {
                  if (deals[key].service == 13) {
                    // console.log(deals[key])
                    deals1.push(deals[key])
                    console.log(deals1)
                    var start_time1 = []
                    for (var key in deals1) {
                      start_time1.push(deals1[key].start_time.replace(/-/g, '/'));
                      console.log(start_time1)
                      var d1 = []
                      for (var key in start_time1) {
                        d1.push(new Date().getTime() - new Date(start_time1[key]).getTime());
                        console.log(d1)
                        var minute = [];
                        for (var key in d1) {
                          console.log(d1)
                          minute.push(Math.floor(d1[key] / 1000 / 60 % 60));
                          console.log(minute)
                          var minute1 = [];
                          for (var key in minute) {
                            if (minute[key] < 10) {
                              minute1.push('0' + minute[key])
                            } else {
                              minute1.push(minute[key])
                            }
                            console.log(minute1)
                            that.setData({
                              minute1,
                            })
                          }
                        }
                      }
                    }
                  }
                  if (deals[key].service == 13) {
                    that.setData({
                      hidden2: true,
                      none: true,
                      hidden3: true,
                      hidden4: false
                    })
                  }
                }
              }
            })
            var i = setInterval(() => {
              // console.log(564654654)
              wx.request({
                url: app.BASE_URL.globelUrl + '/user/api/deals',
                method: 'GET',
                data: {
                  token
                },
                success: (res) => {
                  // console.log(res)
                  var deals = res.data.deals;
                  that.setData({
                    deals
                  })
                  if (deals.length == 0) {
                    that.setData({
                      hiddena: true
                    })
                  }
                  var deals1 = [];
                  for (var key in deals) {
                    if (deals[key].service == 13) {
                      // console.log(deals[key])
                      deals1.push(deals[key])
                      // console.log(deals1)
                      var start_time1 = []
                      for (var key in deals1) {
                        start_time1.push(deals1[key].start_time.replace(/-/g, '/'));
                        // console.log(start_time1)
                        var d1 = []
                        for (var key in start_time1) {
                          d1.push(new Date().getTime() - new Date(start_time1[key]).getTime());
                          // console.log(d1)
                          var minute = [];
                          for (var key in d1) {
                            // console.log(d1)
                            minute.push(Math.floor(d1[key] / 1000 / 60 % 60));
                            // console.log(minute)
                            var minute1 = [];
                            for (var key in minute) {
                              if (minute[key] < 10) {
                                minute1.push('0' + minute[key])
                              } else {
                                minute1.push(minute[key])
                              }
                              // console.log(minute1)
                              that.setData({
                                minute1,
                              })
                            }
                          }
                        }
                      }
                    }
                    if (deals[key].service == 13) {
                      that.setData({
                        hidden2: true,
                        none: true,
                        hidden3: true,
                        hidden4: false
                      })
                    }
                  }
                }
              })
            }, 5000)
            if (that.data.deals.length == '50') {
              clearInterval(i)
            }
          } else {
            console.log('没token');
          }
        }
      )
    }
    aaa().then(bbb)

    //实时订单
    // var token = wx.getStorageSync('token')
    // wx.request({

    //   url: app.BASE_URL.globelUrl+'/user/api/charger/76323',
    //   method:'GET',
    //   data:{
    //     token:token,
    //     attach:'state,ports'
    //   },
    //   success:(res)=>{
    //     console.log(res)
    //     var charger_info=res.data.charger
    //     var ports=charger_info.ports;
    //     var useful_port=0;
    //     for(var key in ports){
    //         if(ports[key].state==0){
    //            useful_port++  
    //         }
    //     }
    //     that.setData({
    //       charger_info,
    //       useful_port
    //     })
    //   }
    // })
    //获取用户当前的授权状态
    wx.getSetting({
      success(res) {
        //若用户没有授权地理位置
        if (!res.authSetting['scope.userLocation']) {
          //在调用需授权 API 之前，提前向用户发起授权请求
          wx.authorize({
            scope: 'scope.userLocation',
            //用户同意授权
            success() {
              // 用户已经同意小程序使用地理位置，后续调用 wx.getLocation 接口不会弹窗询问
              that.getMyLocation();
            },
            // 用户不同意授权
            fail() {
              wx.showModal({
                content: '获取定位失败，请开启定位 功能，已为您定位到杭州',
                showCancel: false,
                success: function (res) {
                  if (res.confirm == false) {
                    return false;
                  }
                  wx.openSetting({
                    success(res) {
                      //如果再次拒绝则返回页面并提示
                      if (!res.authSetting['scope.userLocation']) {
                        wx.showToast({
                          title: '此功能需获取位置信息，请重新设置',
                          duration: 3000,
                          icon: 'none'
                        })
                      }
                      else {
                        //允许授权，调用地图
                        that.onLoad()
                      }
                    }
                  })
                }
              })
            }
          })
        }
        else {
          that.getMyLocation();
        }
      }
    })
    setTimeout(() => {
      wx.request({
        url: app.BASE_URL.globelUrl + '/map/chargers/3,4',
        method: 'GET',
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          console.log(res)
          var siteList = res.data.chargers;
          var markers = [];
          // console.log(markers1)
          // marker['title']=siteList[i]['name'];
          siteList.forEach(function (value, i, arr) {
            var marker = {};
            marker['id'] = siteList[i]['id'];
            marker['latitude'] = siteList[i]['latitude'];
            marker['longitude'] = siteList[i]['longitude'];
            marker['width'] = 36;
            marker['height'] = 40;
            marker['clusterld'] = siteList[i]['id'];
            marker['joinCluster'] = true;
            if (siteList[i]['type'] == 1) {
              marker['iconPath'] = '../static/zhiliuzhuang.png'
            } else if (siteList[i]['type'] == 2) {
              marker['iconPath'] = '../static/jiaoliuzhuang.png'
            } else if (siteList[i]['type'] == 3) {
              marker['iconPath'] = '../static/dianmokuaicong.png'
            } else if (siteList[i]['type'] == 4) {
              marker['iconPath'] = '../static/dainmomancong.png'
            }
            markers[i] = marker
            // markers[i]= markers[i].filter((item)=>!item['longitude']==0 && !item['latitude']==0)
          })
          that.setData({
            markers: markers,

          })
          console.log(markers)
        }
      })
    }, 5500)
  },
  close() {
    this.hideModal();
  },
  chargerServe() {
    var that = this;
    var charger_num = that.data.charger_num
    if (that.data.marker_server == 4 || that.data.marker_server == 3) {
      wx.navigateTo({
        url: `/pages/scan_pay/scan_pay?id=${charger_num}`,
      })
    }

  },
  scanCode() {
    // var token = wx.getStorageSync('token')
    // var that = this;
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success(res) {
        console.log(res);
        var result = JSON.stringify(res.result);
        wx.redirectTo({
          url: `/pages/scan_service/scan_service?result=${result}`,
        })
        // wx.request({
        //   url: app.BASE_URL.globelUrl + '/user/api/qr',
        //   method: 'POST',
        //   data: {
        //     token,
        //     qrcode: result
        //   },
        //   header: {
        //     "Content-Type": "application/x-www-from-urlencoded"
        //   },
        //   success: (res) => {
        //     console.log(res)
        //     var page = res.data.page;
        //     if(page=='bind_card'){
        //       var uid=res.data.card.uid;
        //       var number=res.data.card.number;
        //       if(uid==0){
        //       wx.redirectTo({
        //         url: `/pages/add_discount/add_discount?number=${number}`,
        //       })
        //     }
        //    }
        //     if (page == 'pay') {
        //       var service = res.data.service;
        //       var gun = res.data.gun;
        //       var charger = res.data.charger;
        //     if(charger!=0){
        //       wx.setStorageSync('charger', charger)
        //     }
        //     if(service==4){
        //         var uid=res.data.card.uid;
        //         var type=res.data.card.type;
        //         var card=JSON.stringify(res.data.card);
        //         if(uid>0 && type==2){
        //           wx.redirectTo({
        //             url: `/pages/recharge1/recharge1?card=${card}`,
        //           })
        //         }
        //    }else if(service==20){
        //         var pdr=JSON.stringify(res.data.pdr)
        //         var service_=res.data.pdr.service;
        //         var state=res.data.pdr.state;
        //         var amount=res.data.pdr.amount;
        //         // var paid=res.data.pdr.paid;
        //         console.log(service_)
        //         if(service_==22 && state!=2 && state!=7 && amount!=0){
        //           wx.redirectTo({
        //             url: `/pages/park_stop/park_stop?pdr=${pdr}`,
        //           })
        //         }else if(service_==21 && state!=2 && state!=7 && amount!=0){
        //           wx.redirectTo({
        //             url: `/pages/road_stop/road_stop?pdr=${pdr}`,
        //           })
        //         }else{
        //           wx.redirectTo({
        //             url: `/pages/scan_fail/scan_fail`,
        //           })
        //         }
        //    }else if(service == 13 || service == 10) {
        //         wx.request({
        //           url: app.BASE_URL.globelUrl + `/user/api/charger/${charger}`,
        //           method: 'GET',
        //           data: {
        //             token,
        //             attach:'state'
        //           },
        //           header: {
        //             "Content-Type": "application/x-www-from-urlencoded"
        //           },
        //           success: (res) => {
        //             console.log(res);
        //             var online = res.data.charger.online;
        //             var error1 = res.data.error;
        //             if (online == false || error1 != 0) {
        //               wx.redirectTo({
        //                 url: `/pages/scan_fail/scan_fail`,
        //               })
        //             } else {
        //               wx.navigateTo({
        //                 url: `/pages/scan_pay/scan_pay?id=${charger}&gun=${gun}`
        //               })
        //             }

        //           }
        //         })
        //    }else{
        //         wx.redirectTo({
        //           url: `/pages/scan_fail/scan_fail`,
        //         })
        //       }
        //     }
        //   }
        // })
      }
    })
  }
})
