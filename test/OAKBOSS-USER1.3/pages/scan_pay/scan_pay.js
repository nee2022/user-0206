// pages/scan_pay/scan_pay.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title1: '扫码支付',
    Url: '/pages/index/index',
    packages: [],
    name: '',
    address: '',
    ports: [],
    price: 0,
    price_allowance: 0,
    etn: 1,
    type: '',
    type1: '微信支付',
    package_id: 0,
    id: 0,
    _id: 0,
    token: '',
    gateway: 'wechat',
    pay_amount: 0,
    wallet_amount: 0,
    dealno: '',
    title: '',
    // qrcode: '',
    // online: true,
    // error1: 0,
    gun1:0
  },
  radioChange1(e) {
    var that = this;
    that.hideModal1();
    if (e.detail.value == 'r1') {
      that.setData({
        type1: '钱包支付',
        gateway: 'userpay'
      })
    } else {
      that.setData({
        type1: '微信支付',
        gateway: 'wechat'
      })
    }
  },
  radioChange(e) {
    var that = this;
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    that.hideModal();
    var packages = that.data.packages;
    for (let i = 0, len = packages.length; i < len; ++i) {
      packages[i].checked = packages[i] === e.detail.value;
      var arr_package = e.detail.value.split(',');
      var pay_amount = arr_package[1];
      var package_id = arr_package[0];
      var type = arr_package[2];
      that.setData({
        package_id,
        pay_amount,
        type
      })
    }
  },
  pay() {
    var that = this;
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: app.BASE_URL.globelUrl + '/user/api/charge/pay',
      method: 'POST',
      data: {
        token: that.data.token,
        port: that.data.etn,
        package: that.data.package_id,
        gateway: that.data.gateway,
        charger: that.data.id,
        appid: 'wx659896642ff371ea',
        source: 'i.wechat',
        type: 'miniprog',
        openid: openid
      },
      header: {
        "Content-Type": "application/json"
      },
      success: (res) => {
        console.log(res)
        var dealno = res.data.dealno;
        that.setData({
          dealno
        })
        var etn1=that.data.etn;
        if (etn1 == 0 || res.data.error == 23) {
          wx.showToast({
            title: '请选择端口',
            icon: 'error',
            duration: 1500
          })
        } else if (res.data.error > 0) {
          if (res.data.errmsg = "支付请求过于频繁") {
            wx.showToast({
              title: '支付请求过于频繁',
              icon: 'error',
              duration: 1500
            })
          }
          else if (res.data.errmsg = "已有订单进行中") {
            wx.showToast({
              title: '已有订单进行中',
              icon: 'error',
              duration: 1500
            })
          }
        }
        if (that.data.gateway == 'wechat') {
          console.log(res);
          wx.requestPayment({
            nonceStr: res.data.jsApiParameters.nonceStr,
            package: res.data.jsApiParameters.package,
            paySign: res.data.jsApiParameters.paySign,
            timeStamp: res.data.jsApiParameters.timeStamp,
            signType: res.data.jsApiParameters.signType,
            success: (res) => {
              console.log(res);
              if (res.errMsg == 'requestPayment:ok') {
                wx.showToast({
                  title: '支付成功',
                  duration: 1500
                })
                that.port_vary();
                setTimeout(() => {
                  wx.navigateTo({
                    url: `/pages/pay_sucess/pay_success?dealno=${that.data.dealno}`
                  })
                }, 2000);
              } else {
                wx.showToast({
                  title: '支付失败',
                  icon: 'error',
                  duration: 1500
                })
              }
            }
          })
        } else if (that.data.gateway == 'userpay') {
          console.log(res)
          if (res.data.error == 0) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1500
            })
            that.port_vary();
            setTimeout(() => {
              wx.navigateTo({
                url: `/pages/pay_sucess/pay_success?dealno=${that.data.dealno}`
              })
            }, 2000);
          } else if (that.data.wallet_amount<that.data.pay_amount) {
            wx.showToast({
              title: '您的余额不足',
              icon: 'error',
              duration: 1500
            })
          }
        }
      }
    })
  },
  close() {
    this.hideModal();
  },
  close1() {
    this.hideModal1();
  },
  change_port(e) {
    var that = this;
    var etn = e.currentTarget.dataset.port;
    that.setData({
      etn
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
  },
  clickme1: function () {
    var that = this;
    that.showModal1();
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
  //隐藏对话框
  hideModal1: function () {
    // 隐藏遮罩层
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function (options) {
    var that = this;
    var gun1=options.gun;
    // wx.showToast({
    //   title: decodeURIComponent(options.q),
    //   icon: 'none',
    //   duration: 100000,
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    that.setData({
      // qrcode: decodeURIComponent(options.q),
      gun1:gun1
    })
    // wx.setStorageSync('qrcode', that.data.qrcode)
    // wx.login({
    //   success(res) {
    //     // console.log(res);
    //     if (res.code) {
    //       // console.log(res.code);
    //       var code = res.code;
    //       wx.request({
    //         url: 'https://www.api.sqjtjt.com/user/api/token',
    //         method: "POST",
    //         header: {
    //           "Content-Type": "application/json"
    //         },
    //         data: {
    //           type: 4,
    //           appid: "wx659896642ff371ea",
    //           code: code,
    //         },
    //         success(res) {
    //           if (res.data.error == 0) {
    //             let openid = res.data.openid;
    //             let token = res.data.token;
    //             let user = res.data.user
    //             //保存到客户端
    //             //做后期逻辑处理
    //             wx.setStorage({
    //               data: openid,
    //               key: 'openid',
    //             })
    //             wx.setStorage({
    //               data: token,
    //               key: 'token'
    //             })
    //             wx.setStorage({
    //               data: user,
    //               key: 'user',
    //             })
    //           } else {
    //             wx.removeStorage(
    //               {
    //                 key: 'openid',
    //                 success(res) {
    //                   //  console.log(res.data)
    //                 }
    //               },
    //               {
    //                 key: 'token',
    //                 success(res) {
    //                   // console.log(res.data)
    //                 }
    //               }
    //             )
    //           }
    //           // console.log(res.data)
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
    var that = this;
    console.log(options.id)
    if (options.id != undefined) {
      var _id = options.id;
      that.setData({
        _id
      })
    }
  },
  // port_options() {
  //   var that = this;
  //     if (that.data.online == false || that.data.error1 != 0) {
  //       wx.redirectTo({
  //         url: `/pages/scan_fail/scan_fail`,
  //       })
  //   }
  // },
  port_vary() {
    var that = this;
    // console.log(that.data.id,that.data.token)
    if (that.data.id != 0 && that.data.token != '') {
      wx.request({
        url: app.BASE_URL.globelUrl + '/user/api/charger/' + that.data.id,
        method: 'GET',
        header: {
          "Content-Type": "application/json"
        },
        data: {
          token: that.data.token,
          attach: 'state,ports'
        },
        success: (res) => {
          // console.log(res)
          if (res.data.error == 0) {
            var name = res.data.charger.name;
            var address = res.data.charger.address;
            var ports = res.data.charger.ports;
            var price_allowance = res.data.charger.price_allowance;
            var price = res.data.charger.price;
            // var online = res.data.charger.online;
            // var error1 = res.data.error;
            that.setData({
              name,
              address,
              price_allowance,
              price,
              ports,
              // online,
              // error1
            })
            // console.log(that.data.online,that.data.error1)
            if (res.data.ports != null) {
              if (that.data.ports.length == 0) {
                that.setData({
                  etn: 0
                })
              }
            }
          }
        }
      })
    } else {
      // console.log(55555)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (token != '') {
      var token = wx.getStorageSync('token')
      that.setData({
        token
      })
      function liang() {
        // var qrcode = wx.getStorageSync('qrcode');
        return new Promise(
          function (door) {
            // wx.request({
            //   url: app.BASE_URL.globelUrl + '/user/api/qr',
            //   header: {
            //     "Content-Type": "application/json"
            //   },
            //   method: 'POST',
            //   data: {
            //     token: that.data.token,
            //     qrcode:qrcode
                // qrcode:'https://www.api.sqjtjt.com/qr/811888' 
              // },
              // success: (res) => {
              //   console.log(res)
              //   var id = res.data.charger;
                // var service = res.data.service;
                // var error = res.data.error;
                // console.log(qrcode)
                // if ((service == 0 && error == 0) || (qrcode!='undefined' && res.data.errmsg == '二维码未找到')) {
                //   wx.redirectTo({
                //     url: `/pages/scan_fail/scan_fail`,
                //   })
                // }
                if (that.data.gun1>0) {
                  var gun1 = that.data.gun1;
                } else {
                  var gun1 = 0;
                }
                that.setData({
                  etn: gun1
                })
                console.log(that.data._id)
                if (that.data._id != 0) {
                  that.setData({
                    id: that.data._id
                  })
                  wx.setStorage({
                    data: that.data._id,
                    key: 'charger',
                  })
                }
                //  else {
                //   that.setData({
                //     id
                //   })
                //   wx.setStorage({
                //     data: id,
                //     key: 'charger',
                //   })
                // }
                door(that.data.id);
                //  console.log(111)
              // }
            // })

          }
        )
      }
      function ran(id) {
        return new Promise(
          function (door) {
            wx.request({
              url: app.BASE_URL.globelUrl + '/user/api/charger/' + id + '/packages',
              method: 'GET',
              header: {
                "Content-Type": "application/json"
              },
              data: {
                token: that.data.token
              },
              success: (res) => {
                // console.log(res);
                if (res.data.error == 0) {
                  var packages = res.data.packages;
                  var type = packages[0].name;
                  var package_id = packages[0].id;
                  var pay_amount = packages[0].pay;
                  that.setData({
                    packages,
                    type,
                    package_id,
                    pay_amount
                  })
                }
              }
            })
            door();
            // console.log(that.data.token)
            // console.log(222)
          }
        )
      }
      function dong() {
        return new Promise(
          function (door) {
            that.port_vary();   
            door();
          }
        )
      }
      function xing() {
        console.log(token)
        return new Promise(
          function (door) {
            if (token != '') {
              wx.request({
                url: app.BASE_URL.globelUrl + '/user/api/profile',
                method: 'GET',
                data: {
                  token
                },
                header: {
                  "Content-Type": "application/json"
                },
                success: (res) => {
                  // that.port_options();
                  // setTimeout(()=>{
                  //   that.port_options();
                  // },1000)
                  console.log(res)
                  var wallet_amount = res.data.user.amount
                  that.setData({
                    wallet_amount
                  })
                }
              })
            }
            // console.log(444)
          }
        )
      }
      liang().then(ran).then(dong).then(xing);

    }
      setInterval(() => {
        that.port_vary();
      }, 5000)
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