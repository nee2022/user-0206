// pages/pay_sucess/pay_success.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '扫码支付',
    Url: '/pages/index/index',
    pay: 0,
    paid_time: '',
    deal_no: '',
    gateway1: '',
    dealno: '',
    service: '',
    scrollHeight: 0,
    paddingb: 0,
    heightbox: 0,
    hiddena: true,
    hiddenb: false,
    add_height: false,
    service_: 0,
    reality_pay: 0,
    back_meal:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var dealno = options.dealno;
    var service_ = options.service;
    var back_meal=options.back_meal;
    var reality_pay = options.reality_pay;
    that.setData({
      dealno,
      service_,
      reality_pay,
      back_meal
    })
    console.log(options)
    var token = wx.getStorageSync('token')
    console.log(dealno)
    setTimeout(() => {
      wx.request({
        url: app.BASE_URL.globelUrl + '/user/api/payment/' + dealno,
        method: 'GET',
        data: {
          token
        },
        header: {
          "Content-Type": "text/html"
        },
        success: (res) => {
          console.log(res)
          if (res.data.error == 0) {
            that.setData({
              add_height: true,
              hiddenb: true,
              hiddena: false
            })
            var pay = res.data.payment.pay;
            var paid_time = res.data.payment.paid_time;
            var deal_no = res.data.payment.deal_no;
            var gateway = res.data.payment.gateway;
            if (gateway == 'wechat') {
              that.setData({
                gateway1: '微信支付'
              })
            } else if (gateway == 'userpay') {
              that.setData({
                gateway1: '钱包支付'
              })
            }
            var service = res.data.payment.service;
            if (service == 10) {
              that.setData({
                service: '充电'
              })
            }
            else if (service == 11) {
              that.setData({
                service: '汽车直流快充'
              })
            }
            else if (service == 12) {
              that.setData({
                service: '汽车交流慢充'
              })
            } else if (service == 13) {
              that.setData({
                service: '电单车充电'
              })
            } else if (service == 14) {
              that.setData({
                service: '充电宝'
              })
            } else if (service == 15) {
              that.setData({
                service: '智能插座'
              })

            } else if (service == 20) {
              that.setData({
                service: '停车'
              })
            } else if (service == 21) {
              that.setData({
                service: '路边泊位'
              })
            } else if (service == 22) {
              that.setData({
                service: '停车场停车'
              })
            }
            if (service == 20 || service == 21 || service == 22) {
              that.setData({
                hidden1: true
              })
            }
            that.setData({
              pay,
              paid_time,
              deal_no
            })
          } else if (res.data.errmsg == '订单未找到') {
            that.setData({
              hiddena: true,
              hiddenb: false,
              add_height: false
            })
          }
        }
      })
    }, 500)
    setTimeout(() => {
      wx.request({
        url: app.BASE_URL.globelUrl + '/user/api/payment/' + dealno,
        method: 'GET',
        data: {
          token
        },
        header: {
          "Content-Type": "text/html"
        },
        success: (res) => {
          console.log(res)
          if (res.data.error == 0) {
            that.setData({
              add_height: true,
              hiddenb: true,
              hiddena: false
            })
            var pay = res.data.payment.pay;
            var paid_time = res.data.payment.paid_time;
            var deal_no = res.data.payment.deal_no;
            var gateway = res.data.payment.gateway;
            if (gateway == 'wechat') {
              that.setData({
                gateway1: '微信支付'
              })
            } else if (gateway == 'userpay') {
              that.setData({
                gateway1: '钱包支付'
              })
            }
            var service = res.data.payment.service;
            if (service == 11) {
              that.setData({
                service: '汽车直流快充'
              })
            } else if (service == 12) {
              that.setData({
                service: '汽车交流慢充'
              })
            } else if (service == 13) {
              that.setData({
                service: '电单车充电'
              })
            } else if (service == 14) {
              that.setData({
                service: '充电宝'
              })
            } else if (service == 15) {
              that.setData({
                service: '智能插座'
              })
            } else if (service == 20) {
              that.setData({
                service: '停车'
              })
            } else if (service == 21) {
              that.setData({
                service: '路边泊位'
              })
            } else if (service == 22) {
              that.setData({
                service: '停车场停车'
              })
            }
            that.setData({
              pay,
              paid_time,
              deal_no
            })
          } else if (res.data.errmsg == '订单未找到') {
            that.setData({
              hiddena: true,
              hiddenb: false,
              add_height: false
            })
          }
        }
      })
    }, 600)
    setTimeout(() => {
      wx.request({
        url: app.BASE_URL.globelUrl + '/user/api/payment/' + dealno,
        method: 'GET',
        data: {
          token
        },
        header: {
          "Content-Type": "text/html"
        },
        success: (res) => {
          console.log(res)
          if (res.data.error == 0) {
            that.setData({
              add_height: true,
              hiddenb: true,
              hiddena: false
            })
            var pay = res.data.payment.pay;
            var paid_time = res.data.payment.paid_time;
            var deal_no = res.data.payment.deal_no;
            var gateway = res.data.payment.gateway;
            if (gateway == 'wechat') {
              that.setData({
                gateway1: '微信支付'
              })
            } else if (gateway == 'userpay') {
              that.setData({
                gateway1: '钱包支付'
              })
            }
            var service = res.data.payment.service;
            if (service == 11) {
              that.setData({
                service: '汽车直流快充'
              })
            } else if (service == 12) {
              that.setData({
                service: '汽车交流慢充'
              })
            } else if (service == 13) {
              that.setData({
                service: '电单车充电'
              })
            } else if (service == 14) {
              that.setData({
                service: '充电宝'
              })
            } else if (service == 15) {
              that.setData({
                service: '智能插座'
              })
            } else if (service == 20) {
              that.setData({
                service: '停车'
              })
            } else if (service == 21) {
              that.setData({
                service: '路边泊位'
              })
            } else if (service == 22) {
              that.setData({
                service: '停车场停车'
              })
            }
            that.setData({
              pay,
              paid_time,
              deal_no
            })
          } else if (res.data.errmsg == '订单未找到') {
            that.setData({
              hiddena: true,
              hiddenb: false,
              add_height: false
            })
          }
        }
      })
    }, 700)
    setTimeout(() => {
      wx.request({
        url: app.BASE_URL.globelUrl + '/user/api/payment/' + dealno,
        method: 'GET',
        data: {
          token
        },
        header: {
          "Content-Type": "text/html"
        },
        success: (res) => {
          console.log(res)
          if (res.data.error == 0) {
            that.setData({
              add_height: true,
              hiddenb: true,
              hiddena: false
            })
            var pay = res.data.payment.pay;
            var paid_time = res.data.payment.paid_time;
            var deal_no = res.data.payment.deal_no;
            var gateway = res.data.payment.gateway;
            if (gateway == 'wechat') {
              that.setData({
                gateway1: '微信支付'
              })
            } else if (gateway == 'userpay') {
              that.setData({
                gateway1: '钱包支付'
              })
            }
            var service = res.data.payment.service;
            if (service == 11) {
              that.setData({
                service: '汽车直流快充'
              })
            } else if (service == 12) {
              that.setData({
                service: '汽车交流慢充'
              })
            } else if (service == 13) {
              that.setData({
                service: '电单车充电'
              })
            } else if (service == 14) {
              that.setData({
                service: '充电宝'
              })
            } else if (service == 15) {
              that.setData({
                service: '智能插座'
              })
            } else if (service == 20) {
              that.setData({
                service: '停车'
              })
            } else if (service == 21) {
              that.setData({
                service: '路边泊位'
              })
            } else if (service == 22) {
              that.setData({
                service: '停车场停车'
              })
            }
            that.setData({
              pay,
              paid_time,
              deal_no
            })
          } else if (res.data.errmsg == '订单未找到') {
            that.setData({
              hiddena: true,
              hiddenb: false,
              add_height: false
            })
          }
        }
      })
    }, 800)
    setTimeout(() => {
      wx.request({
        url: app.BASE_URL.globelUrl + '/user/api/payment/' + dealno,
        method: 'GET',
        data: {
          token
        },
        header: {
          "Content-Type": "text/html"
        },
        success: (res) => {
          console.log(res)
          if (res.data.error == 0) {
            that.setData({
              add_height: true,
              hiddenb: true,
              hiddena: false
            })
            var pay = res.data.payment.pay;
            var paid_time = res.data.payment.paid_time;
            var deal_no = res.data.payment.deal_no;
            var gateway = res.data.payment.gateway;
            if (pay == 0) {
              setTimeout(() => {
                wx.redirectTo({
                  url: `/pages/bicycle_charge/bicycle_charge?dealno=${that.data.deal_no}&pay=${that.data.pay}`,
                })
              }, 1000);
            }
            if (gateway == 'wechat') {
              that.setData({
                gateway1: '微信支付'
              })
            } else if (gateway == 'userpay') {
              that.setData({
                gateway1: '钱包支付'
              })
            }
            var service = res.data.payment.service;
            if (service == 11) {
              that.setData({
                service: '汽车直流快充'
              })
            } else if (service == 12) {
              that.setData({
                service: '汽车交流慢充'
              })
            } else if (service == 13) {
              that.setData({
                service: '电单车充电'
              })
            } else if (service == 14) {
              that.setData({
                service: '充电宝'
              })
            } else if (service == 15) {
              that.setData({
                service: '智能插座'
              })
            } else if (service == 20) {
              that.setData({
                service: '停车'
              })
            } else if (service == 21) {
              that.setData({
                service: '路边泊位'
              })
            } else if (service == 22) {
              that.setData({
                service: '停车场停车'
              })
            }
            that.setData({
              pay,
              paid_time,
              deal_no
            })
          } else if (res.data.errmsg == '订单未找到') {
            that.setData({
              hiddena: true,
              hiddenb: false,
              add_height: false
            })
          }
        }
      })
    }, 900)
  },
  check_status(e) {
    var that = this;
    var e = e.currentTarget.dataset.status;
    console.log(e)
    if (e == '电单车充电') {
      setTimeout(() => {
        wx.redirectTo({
          url: `/pages/bicycle_charge/bicycle_charge?dealno=${that.data.deal_no}&pay=${that.data.pay}`,
        })
      }, 1000);
    }
  },
  back_index() {
    if(this.data.back_meal==0){
      wx.redirectTo({
        url: '/pages/set_meal/set_meal?currentTab=0',
      })
    }else{
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({     //获取窗口信息  设置筛选的高度
      success: function (res) {
        console.log(res)
        var heightNum = res.windowHeight
        that.setData({
          heightbox: heightNum
        })
        if (res.model.indexOf('iPhone XR') != -1) {    //这个比较特殊
          heightNum = heightNum - 49 - 34;
          that.setData({
            scrollHeight: heightNum,
            paddingb: 34
          });
        } else if (res.model.indexOf('Plus') != -1) {
          heightNum = heightNum - 49;
          that.setData({
            scrollHeight: heightNum,
          });

        } else if (res.model.indexOf('iPhone X') != -1) {
          heightNum = heightNum - 49 - 34;
          that.setData({
            scrollHeight: heightNum,
            paddingb: 34
          });
        } else {
          heightNum = heightNum - 49;
          that.setData({
            scrollHeight: heightNum,
          });

        }
      }
    })
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