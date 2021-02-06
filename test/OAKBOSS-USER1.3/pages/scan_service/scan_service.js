// pages/scan_service/scan_service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     qrcode:'',
     result_:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var token = wx.getStorageSync('token');
    var qrcode = decodeURIComponent(options.q);
    var result_ = JSON.parse(options.result);
    that.setData({
      qrcode,
      result_
    })
    // wx.showToast({
    //   title: qrcode,
    //   icon: 'none',
    //   duration: 100000,
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    console.log(result_);
    if (token == '' || token == 'undefined'){
      wx.login({
        success(res) {
          // console.log(res);
          if (res.code) {
            // console.log(res.code);
            var code = res.code;
            wx.request({
              url: 'https://www.api.sqjtjt.com/user/api/token',
              method: "POST",
              header: {
                "Content-Type": "application/json"
              },
              data: {
                type: 4,
                appid: "wx659896642ff371ea",
                code: code
              },
              success(res) {
                console.log(res);
                if (res.data.error == 0) {
                  let openid = res.data.openid;
                  let token = res.data.token;
                  let user = res.data.user
                  //保存到客户端
                  //做后期逻辑处理
                  wx.setStorage({
                    data: openid,
                    key: 'openid',
                  })
                  wx.setStorage({
                    data: token,
                    key: 'token'
                  })
                  wx.setStorage({
                    data: user,
                    key: 'user',
                  })
                  wx.redirectTo({
                    url: `/pages/main/main?qrcode=${that.data.qrcode}&result=${that.data.result_}`,
                  })
                } else {
                  wx.removeStorage(
                    {
                      key: 'openid',
                      success(res) {
                        //  console.log(res.data)
                      }
                    },
                    {
                      key: 'token',
                      success(res) {
                        // console.log(res.data)
                      }
                    }
                  )
                }
                // console.log(res.data)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    } else {
      wx.login({
        success(res) {
          // console.log(res);
          if (res.code) {
            // console.log(res.code);
            var code = res.code;
            wx.request({
              url: 'https://www.api.sqjtjt.com/user/api/token',
              method: "POST",
              header: {
                "Content-Type": "application/json"
              },
              data: {
                type: 4,
                appid: "wx659896642ff371ea",
                code: code
              },
              success(res) {
                console.log(res);
                if (res.data.error == 0) {
                  let openid = res.data.openid;
                  let token = res.data.token;
                  let user = res.data.user
                  //保存到客户端
                  //做后期逻辑处理
                  wx.setStorage({
                    data: openid,
                    key: 'openid',
                  })
                  wx.setStorage({
                    data: token,
                    key: 'token'
                  })
                  wx.setStorage({
                    data: user,
                    key: 'user',
                  })
                  wx.redirectTo({
                    url: `/pages/main/main?qrcode=${that.data.qrcode}&result=${that.data.result_}`,
                  })
                } else {
                  wx.removeStorage(
                    {
                      key: 'openid',
                      success(res) {
                        //  console.log(res.data)
                      }
                    },
                    {
                      key: 'token',
                      success(res) {
                        // console.log(res.data)
                      }
                    }
                  )
                }
                // console.log(res.data)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
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


