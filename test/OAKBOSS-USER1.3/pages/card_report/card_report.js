// pages/card_report/card_report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'卡挂失',
    Url:'/pages/metro_card2/metro_card2',
    items: [
      {value: 'USA', name: '卡丢失'},
      {value: 'CHN', name: '使用不了'},
      {value: 'BRA', name: '其他'}
    ]
  },
 //点击我显示底部弹出框
 clickme: function () {
  this.showModal();
},
radioChange(e) {
  console.log('radio发生change事件，携带value值为：', e.detail.value)
  this.hideModal();
  const items = this.data.items
  for (let i = 0, len = items.length; i < len; ++i) {
    items[i].checked = items[i].value === e.detail.value
  }
  if(e.detail.value!=''){
    wx.redirectTo({
      url: '/pages/metro_card6/metro_card6',
    })
  }
  this.setData({
    items
  })

},
//显示对话框
showModal: function () {
  // 显示遮罩层
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: "linear",
    delay: 0
  })
  this.animation = animation
  animation.translateY(300).step()
  this.setData({
    animationData: animation.export(),
    showModalStatus: true
  })
  setTimeout(function () {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })
  }.bind(this), 200)
},
//隐藏对话框
hideModal: function () {
  // 隐藏遮罩层
  var animation = wx.createAnimation({
    duration: 400,
    timingFunction: "linear",
    delay: 0
  })
  this.animation = animation
  animation.translateY(300).step()
  this.setData({
    animationData: animation.export(),
  })
  setTimeout(function () {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: false
    })
  }.bind(this), 200)
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