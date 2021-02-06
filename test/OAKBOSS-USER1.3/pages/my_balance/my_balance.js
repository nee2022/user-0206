// pages/my_balance/my_balance.js
const app=getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
     title:"我的余额",
     Url:'/pages/personal_center/pensonal_center',
     amount:0,
     token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'user',
      success:(res)=>{
        console.log(res);
        that.setData({
          amount:res.data.amount
        })
      }
    })
    wx.getStorage({
      key: 'token',
      success:(res)=>{
        console.log(res)
        that.setData({
          token:res.data
        })
        wx.request({
          url:  app.BASE_URL.globelUrl+'/user/api/profile',
          method:'GET',
          header:{
           "Content-Type": "application/json" 
         },
          data:{
            token:that.data.token
          },
           success:(res)=>{
             console.log(res)
             that.setData({
               amount:res.data.user.amount
             })
           }
        })
      }
    })
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