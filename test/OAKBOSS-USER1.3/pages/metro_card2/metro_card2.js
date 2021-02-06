// pages/metro_card2/metro_card2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   title:'一卡通',
   Url:'/pages/metro_card1/metro_card1',
   cardInfo:{}
  },
 card_report(){
  wx.redirectTo({
     url: '/pages/card_report/card_report',
   })
 },
 user_record(){
  wx.redirectTo({
     url: '/pages/user_record/user_record',
   })
 },
 recharge_detail1(){
   wx.redirectTo({
     url: '/pages/recharge_detail1/recharge_detail1',
   })
 },
 unbind(){
  wx.showModal({
     title:"提示",
     content:'解绑优惠卡后，此卡将不能使用',
     success:(res)=>{
       if(res.confirm){
          wx.showToast({
            title: '解绑成功',
            icon:'success',
            duration:2000,
            mask:true,
            success:(res)=>{
              console.log(res)
            }
          })
       }else if(res.cancel){
        wx.showToast({
          title: '解绑失败',
          image:'../static/gantanhao.png', 
          duration:2000,
          mask:true,
          success:(res)=>{
           console.log(res)
          }
        })
       }
     }
  })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var cardInfo=JSON.parse(options.cardInfo)
    console.log(cardInfo)
    that.setData({
      cardInfo
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