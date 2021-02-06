
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    qrcode: ''
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    var token = wx.getStorageSync('token');
    var qrcode=options.qrcode;
    var result=options.result;
    console.log(result);
    // wx.showToast({
    //   title: qrcode,
    //   icon: 'none',
    //   duration: 100000,
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    if (qrcode == 'undefined') {
      // var result = JSON.parse(options.result);
      wx.request({
        url: app.BASE_URL.globelUrl + '/user/api/qr',
        method: 'POST',
        data: {
          token,
          qrcode: result
        },
        header: {
          "Content-Type": "application/x-www-from-urlencoded"
        },
        success: (res) => {
          console.log(res)
          var page = res.data.page;
          if (page == 'bind_card') {
            var uid = res.data.card.uid;
            var number = res.data.card.number;
            if (uid == 0) {
              wx.redirectTo({
                url: `/pages/add_discount/add_discount?number=${number}`,
              })
            }
          }
          if (page == 'pay') {
            var service = res.data.service;
            var gun = res.data.gun;
            var charger = res.data.charger;
            if (charger != 0) {
              wx.setStorageSync('charger', charger)
            }
            if (service == 4) {
              var uid = res.data.card.uid;
              var type = res.data.card.type;
              var card = JSON.stringify(res.data.card);
              if (uid > 0 && (type == 2 || type == 1)) {
                wx.redirectTo({
                  url: `/pages/recharge1/recharge1?card=${card}`,
                })
              } else {
                wx.redirectTo({
                  url: `/pages/scan_fail/scan_fail`,
                })
              }
            } else if (service == 20) {
              var pdr = JSON.stringify(res.data.pdr)
              var service_ = res.data.pdr.service;
              var state = res.data.pdr.state;
              var amount = res.data.pdr.amount;
              // var paid=res.data.pdr.paid;
              console.log(service_)
              if (service_ == 22 && state != 2 && state != 7 && amount != 0) {
                wx.redirectTo({
                  url: `/pages/park_stop/park_stop?pdr=${pdr}`,
                })
              } else if (service_ == 21 && state != 2 && state != 7 && amount != 0) {
                wx.redirectTo({
                  url: `/pages/road_stop/road_stop?pdr=${pdr}`,
                })
              } else {
                wx.redirectTo({
                  url: `/pages/scan_fail/scan_fail`,
                })
              }
            } else if (service == 13 || service == 10) {
              wx.request({
                url: app.BASE_URL.globelUrl + `/user/api/charger/${charger}`,
                method: 'GET',
                data: {
                  token,
                  attach: 'state'
                },
                header: {
                  "Content-Type": "application/x-www-from-urlencoded"
                },
                success: (res) => {
                  console.log(res);
                  var online = res.data.charger.online;
                  var error1 = res.data.error;
                  if (online == false || error1 != 0) {
                    wx.redirectTo({
                      url: `/pages/scan_fail/scan_fail`,
                    })
                  } else {
                    wx.navigateTo({
                      url: `/pages/scan_pay/scan_pay?id=${charger}&gun=${gun}`
                    })
                  }
                }
              })
            } else {
              wx.redirectTo({
                url: `/pages/scan_fail/scan_fail`,
              })
            }
          }
        }
      })
    }else{
      // wx.showToast({
      //   title:decodeURIComponent(options.q),
      //   icon: 'none',
      //   duration: 100000,
      //   success: (res) => {
      //     console.log(res)
      //   }
      // })
      that.setData({
        qrcode
        // gun1:gun1
      })
      // wx.setStorageSync('qrcode', that.data.qrcode);
      var qrcode = that.data.qrcode;
      wx.request({
        url: app.BASE_URL.globelUrl + '/user/api/qr',
        header: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        data: {
          token: token,
          qrcode: qrcode
          // qrcode:'https://www.api.sqjtjt.com/qr/card/72' 
        },
        success: (res) => {
          console.log(res)
          // var id = res.data.charger;
          var page = res.data.page; 
          if (page == 'bind_card') {
            var uid = res.data.card.uid;
            var number = res.data.card.number;
            if (uid == 0) {
              wx.redirectTo({
                url: `/pages/add_discount/add_discount?number=${number}`,
              })
            }
          }
          else if (page == 'pay') {
            var service = res.data.service;
            var gun = res.data.gun;
            var charger = res.data.charger;
            if (charger != 0) {
              wx.setStorageSync('charger', charger)
            }
            if (service == 4) {
              var uid = res.data.card.uid;
              var type = res.data.card.type;
              var card = JSON.stringify(res.data.card);
              if (uid > 0 && (type == 2 || type == 1)) {
                wx.redirectTo({
                  url: `/pages/recharge1/recharge1?card=${card}`,
                })
              } else {
                wx.redirectTo({
                  url: `/pages/scan_fail/scan_fail`,
                })
              }
            } else if (service == 20) {
              var pdr = JSON.stringify(res.data.pdr)
              var service_ = res.data.pdr.service;
              var state = res.data.pdr.state;
              var amount = res.data.pdr.amount;
              // var paid=res.data.pdr.paid;
              console.log(service_)
              if (service_ == 22 && state != 2 && state != 7 && amount != 0) {
                wx.redirectTo({
                  url: `/pages/park_stop/park_stop?pdr=${pdr}`,
                })
              } else if (service_ == 21 && state != 2 && state != 7 && amount != 0) {
                wx.redirectTo({
                  url: `/pages/road_stop/road_stop?pdr=${pdr}`,
                })
              } else {
                wx.redirectTo({
                  url: `/pages/scan_fail/scan_fail`,
                })
              }
            } else if (service == 13 || service == 10) {
              // var token=wx.getStorageSync('token')
              wx.request({
                url: app.BASE_URL.globelUrl + `/user/api/charger/${charger}`,
                method: 'GET',
                data: {
                  token,
                  attach: 'state'
                },
                header: {
                  "Content-Type": "application/x-www-from-urlencoded"
                },
                success: (res) => {
                  console.log(res);
                  var online = res.data.charger.online;
                  var error1 = res.data.error;
                  if (online == false || error1 != 0) {
                    wx.redirectTo({
                      url: `/pages/scan_fail/scan_fail`,
                    })
                  } else {
                    wx.navigateTo({
                      url: `/pages/scan_pay/scan_pay?id=${charger}&gun=${gun}`
                    })
                  }
                }
              })
            } else {
              wx.redirectTo({
                url: `/pages/scan_fail/scan_fail`,
              })
            }
          }
          else{
            // wx.showToast({
            //   title: res.data,
            //   icon: 'none',
            //   duration: 100000,
            //   success: (res) =>{
            //     console.log(res)
            //   }
            // })
            // function error(title,errmsg){
            wx.redirectTo({
              url: `/pages/scan_fail/scan_fail`,
            })
            // }
          
          }
          var error = res.data.error;
          console.log(qrcode)
          if ((service == 0 && error == 0) || (qrcode != 'undefined' && res.data.errmsg == '二维码未找到')) {
            wx.redirectTo({
              url: `/pages/scan_fail/scan_fail`,
            })
          }
          console.log(111)
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


