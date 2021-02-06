const app=getApp();
// pages/metro_card1/metro_card1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"一卡通",
    Url:'/pages/personal_center/pensonal_center',
    cards:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var token=wx.getStorageSync('token')
   wx.request({
     url: app.BASE_URL.globelUrl+'/user/api/cards',
     method:'GET',
     header:{
      "Content-Type": "application/json"
    },
    data:{
      token
    },
    success:(res)=>{
      console.log(res)
      var cards=res.data.cards;
      that.setData({
        cards
      })
    }
   })
  },
  loss_recharge(e){
   var event=e.currentTarget.dataset.service_type;
  //  console.log(cardInfo)
   var type=event.type;
  //  console.log(cardInfo);
  var cardInfo=JSON.stringify(event)
   if(type==1){
     wx.redirectTo({
       url: `/pages/metro_card4/metro_card4?cardInfo=${cardInfo}`,
     })
   }else if(type==2){
    wx.redirectTo({
      url: `/pages/metro_card2/metro_card2?cardInfo=${cardInfo}`,
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