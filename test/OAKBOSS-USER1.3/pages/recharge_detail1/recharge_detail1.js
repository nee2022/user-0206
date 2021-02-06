const app=getApp();
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    title:'充值记录',
    Url:'/pages/metro_card2/metro_card2',
    date:'11',
    payments:[],
    // month:0,
    start:'',
    end:'',
    month:1
  },
  bindDateChange: function(e) {
    var that=this;
    var str=e.detail.value;
    var token=that.data.token
    var str1=str.substring(str.length-2)
    that.setData({
      date: str1
    })
    console.log(str1)
    wx.request({
      url: app.BASE_URL.globelUrl+'/user/api/service/0/payments/',
      data:{
         token:token,
         service:1
      },
      header:{
       "Content-Type": "application/json"
      },
      success:(res)=>{
        console.log(res)
        var start=res.data.payments[res.data.total-1].update_time.slice(0,7);
        var end=res.data.payments[0].update_time.slice(0,7);
        console.log(start,end)
       //  var update_time=[],
        var update_time=res.data.payments[res.data.total-1].update_time;
        var month=Number(update_time.slice(5,7)) 
       console.log(month)
        that.setData({
          start,
          end,
          payments:res.data.payments,
          month
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
   var token=wx.getStorageSync('token')
    this.setData({
      token:token
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