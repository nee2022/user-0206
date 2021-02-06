// pages/park_stop/park_stop.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pdr: {},
    reality_pay: 0,
    hours: '0' + 0,
    minute: '0' + 0,
    second: '0' + 0,
    wallet_amount: 0,
    URL:[],
    hidden1:false,
    hidden2:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var pdr = JSON.parse(options.pdr);
    console.log(pdr)
    var amount = pdr.amount;
    var medias= pdr.medias;
    var allowance = pdr.allowance;
    var paid=pdr.paid
    var reality_pay = amount-paid-allowance;
    var duration = pdr.duration;
    var hours = Math.floor(duration / 60 / 60);
    var minute = Math.floor(duration / 60 % 60);
    var second = Math.floor(duration % 60);
    if (second < 10) {
      that.setData({
        second: '0' + second
      })
    } else {
      that.setData({
        second: second
      })
    }
    if (minute < 10) {
      that.setData({
        minute: '0' + minute,
      })
    } else {
      that.setData({
        minute: minute,
      })
    }
    if (hours < 10) {
      that.setData({
        hours: '0' + hours
      })
    } else {
      that.setData({
        hours: hours
      })
    }
    if(medias!=undefined){
      var url_=[];
      for(var key in medias){
         if(medias[key].url.length!=0){
          url_.push(medias[key].url);
          that.setData({
            hidden1:false,
            hidden2:true
          })
         }else{
          that.setData({
            hidden1:true,
            hidden2:false
          })
         }
      }
      var URL=url_[0];
     }else{
       that.setData({
        hidden1:true,
        hidden2:false
       })
     }
    that.setData({
      pdr,
      reality_pay,
      URL
    })
  },
   //点击我显示底部弹出框
   parkImg() {
    this.showModal();
  },
  close(){
    this.hideModal();
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
      animation.translateY(0).step()
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
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        })
      }.bind(this), 100)
    },
  stop_pay() {
    var that = this;
    var pdr = JSON.stringify(that.data.pdr);
    wx.redirectTo({
      url: `/pages/stop_pay/stop_pay?pdr=${pdr}`,
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