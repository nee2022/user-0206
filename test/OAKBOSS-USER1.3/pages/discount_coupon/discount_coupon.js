// pages/discount_coupon/discount_coupon.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '选择优惠券',
    Url: '/pages/personal_center/pensonal_center',
    token: '',
    user_plans1: [],
    user_plans2: [],
    hidden1: false,
    hidden2: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res) => {
        //  console.log(res)
        that.setData({
          token: res.data
        })
        wx.request({
          url: app.BASE_URL.globelUrl + '/user/api/my/plans/2/state/0',
          method: 'GET',
          data: {
            token: that.data.token
          },
          header: {
            "Content-Type": "text/html"
          },
          success: (res) => {
            console.log(res);
            if (res.data.errmsg != "记录未查到") {
              var user_plans = res.data.user_plans;
              that.setData({
                user_plans1: user_plans
              })

              if (user_plans.length == 0) {
                this.setData({
                  hidden1: true,
                  hidden: false
                })
              }
            }
          }
        });
        wx.request({
          url: app.BASE_URL.globelUrl + '/user/api/my/plans/2/state/1',
          method: 'GET',
          data: {
            token: that.data.token
          },
          header: {
            "Content-Type": "text/html"
          },
          success: (res) => {
            console.log(res);
            if (res.data.errmsg != "记录未查到") {
              var user_plans = res.data.user_plans;
              that.setData({
                user_plans2: user_plans
              })
            }
          }
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


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