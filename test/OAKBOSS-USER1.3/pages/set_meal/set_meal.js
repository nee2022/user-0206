// pages/set_meal/set_meal.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '套餐',
    Url: '/pages/personal_center/pensonal_center',
    minusStatus: 'disabled',
    plans1: [],
    plans1_: [],
    hidden1: true,
    currentTab: 0,
    id: [],
  name1:[],
  name:[]
  },

  /* 点击减号 */
  bindMinus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.plans1[index].num
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var plans1 = this.data.plans1;
    plans1[index].num = num;
    // 按钮可用状态
    plans1[index]. minusStatus =minusStatus;
    // 将数值与状态写回  
    this.setData({
      plans1: plans1
    });
  },
  /* 点击加号 */
  bindPlus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.plans1[index].num
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    var plans1 = this.data.plans1;
    plans1[index].num = num;
    plans1[index]. minusStatus =minusStatus;
    // 按钮可用状态
    // 将数值与状态写回  
    this.setData({
      plans1: plans1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var currentTab=options.currentTab;
    var that = this;
    that.setData({
      currentTab
    })
    var token = wx.getStorageSync('token')
    wx.request({
      url: app.BASE_URL.globelUrl + '/user/api/plans/1',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        token
      },
      method: 'GET',
      success: (res) => {
        console.log(res)
        var plans = res.data.plans;
        var plans1 = [];
        for (var key in plans) {
          if (plans[key].enabled == true) {
            plans1.push(plans[key])
          }
          for (var key in plans1) {
            plans1[key].num = 1
            plans1[key].minusStatus='normal'
          }
         
        }
        that.setData({
          plans1
        
        })
        console.log(plans1)
      }
    })
    wx.request({
      url: app.BASE_URL.globelUrl + '/user/api/my/plans/1',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        token
      },
      success: (res) => {
        console.log(res)
        var plans_ = res.data.user_plans;
        var plans1_=[];
        for(var key in plans_){
          plans1_.push(plans_[key])
          for(var key in plans1_){
            plans1_[key].num=1;
          }
        }
        that.setData({
          plans1_
        })
        console.log(that.data.plans1_)
        if (res.data.errmsg == '记录未查到') {
          that.setData({
            hidden1: false
          })
        } else {
          that.setData({
            hidden1: true
          })
        }
      }
    })
  },
  /**
    * 滑动切换tab
    */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  Renew(e){
    console.log(e.currentTarget.dataset.renew);
    var meal=JSON.stringify(e.currentTarget.dataset.renew);
    wx.redirectTo({
      url: `/pages/order_affirm/order_affirm?meal=${meal}`,
    })
  },
  pay_meal(e){
    console.log(e.currentTarget.dataset.meal);
    var meal=JSON.stringify(e.currentTarget.dataset.meal);
    wx.redirectTo({
      url: `/pages/order_affirm/order_affirm?meal=${meal}`,
    })
  },
  /**
  * 点击tab切换
  */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
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