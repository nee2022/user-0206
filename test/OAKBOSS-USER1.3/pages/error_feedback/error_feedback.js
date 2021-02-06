// pages/error_feedback/error_feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '错误反馈',
    Url: '/pages/personal_center/pensonal_center',
    texts:'',
    min:5,
    max:200
  },
 inputs(e){
   var that=this;
   var value=e.detail.value;
   var len=parseInt(value.length);
   if (len <this.data.min){
    this.setData({
      texts: "加油，至少要输入5个字哦"
    })
  }else if (len >= this.data.min){
    this.setData({
      texts: " "
    })
  }
  if (len > this.data.max) return;
  // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
  this.setData({
    currentWordNumber: len //当前字数  
  });
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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