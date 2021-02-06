// pages/stop_pay/stop_pay.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '停车支付',
    Url: '/pages/index/index',
    pdr: {},
    hours: '0' + 0,
    minute: '0' + 0,
    second: '0' + 0,
    gateway: '',
    token: '',
    type1: '微信支付',
    gateway: 'wechat',
    wallet_amount: 0,
    id: 0,
    reality_pay: 0
  },
  radioChange1(e) {
    var that = this;
    that.hideModal1();
    if (e.detail.value == 'r1') {
      that.setData({
        type1: '钱包支付',
        gateway: 'userpay'
      })
    } else if (e.detail.value == 'r2') {
      that.setData({
        type1: '微信支付',
        gateway: 'wechat'
      })
    }
  },
  pay() {
    var that = this;
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: app.BASE_URL.globelUrl + '/user/api/park/pay',
      method: 'POST',
      data: {
        token: that.data.token,
        pdr: that.data.id,
        gateway: that.data.gateway,
        type: 'miniprog',
        source: 'i.wechat',
        openid: openid,
        pay: that.data.reality_pay,
        appid: 'wx659896642ff371ea'
      },
      success: (res) => {
        console.log(res);
        if (res.data.error > 0) {
          if (res.data.errmsg = "支付请求过于频繁") {
            wx.showToast({
              title: '支付请求过于频繁',
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
                setTimeout(() => {
                  var dealno = that.data.pdr.dealno;
                  var service = that.data.pdr.service;
                  var reality_pay = that.data.reality_pay
                  console.log(dealno)
                  wx.redirectTo({
                    url: `/pages/pay_sucess/pay_success?dealno=${dealno}&service=${service}&reality_pay=${reality_pay}`
                  })
                }, 1500);
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
            setTimeout(() => {
              var dealno = that.data.pdr.dealno;
              var service = that.data.pdr.service;
              var reality_pay = that.data.reality_pay
              console.log(dealno)
              wx.redirectTo({
                url: `/pages/pay_sucess/pay_success?dealno=${dealno}&service=${service}&reality_pay=${reality_pay}`
              })
            }, 1500);
          } else if (that.data.wallet_amount < that.data.reality_pay) {
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
  clickme1: function () {
    var that = this;
    that.showModal1();
  },
  close1() {
    this.hideModal1();
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var pdr = JSON.parse(options.pdr);
    // console.log(pdr);
    var duration = pdr.duration;
    var amount = pdr.amount;
    var id = pdr.id
    var paid=pdr.paid
    var allowance = pdr.allowance;
    var reality_pay = amount-paid-allowance;
    var hours = Math.floor(duration / 60 / 60);
    var minute = Math.floor(duration / 60 % 60);
    var second = Math.floor(duration % 60);
    if (second < 10) {
      that.setData({
        second: '0' + second
      })
    }
    if (minute < 10) {
      that.setData({
        minute: '0' + minute,
      })
    }
    if (hours < 10) {
      hours = '0' + hours
    }
    that.setData({
      pdr,
      hours,
      second,
      minute,
      reality_pay,
      id
    })
    var token = wx.getStorageSync('token');
    that.setData({
      token
    })
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
          console.log(res)
          var wallet_amount = res.data.user.amount;
          that.setData({
            wallet_amount
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

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