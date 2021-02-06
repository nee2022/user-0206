// pages/order_detail/order_detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     title:'订单详情',
     Url:'/pages/my_order/my_order',
     state:0,
     deal_no:'',
     paid_time:'',
     gateway:'',
    pay:0,
    service:'',
    hidden1:true
  },
  check_status(e){
    var that=this;
     var e=e.currentTarget.dataset.status;
     if(e=='电单车充电'){
       setTimeout(()=>{
          wx.redirectTo({
            url: `/pages/bicycle_charge/bicycle_charge?dealno=${that.data.deal_no}&pay=${that.data.pay}`,
          })
       },2000);
     }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);
    var id=options.id;
    var state=options.state;
    if(state==4){
      that.setData({
        hidden1:false
      })
    }
    if(state==0){
      state='已支付'
    }else if(state==1){
      state='已退款'
    }else if(state==2){
      state='已完成'
    }else if(state==3){
      state='退款中'
    }else if(state==4){
      state='充电中'
    }else if(state==5){
      state='退款失败'
    }else if(state==6){
      state='等待开始'
    }else if(state==7){
      state='等待结束'
    }else{
      state='充电完成'
    }
    var token=wx.getStorageSync('token')
    wx.request({
      url:app.BASE_URL.globelUrl+'/user/api/payment/'+id,
      method:'GET',
      header:{
        "Content-Type": "application/json" 
      },
      data:{
        token
      },
      success:(res)=>{
        console.log(res);
        var payment=res.data.payment;
        var deal_no=payment.deal_no;
        var pay=payment.pay;
        var paid_time=payment.paid_time;
        var gateway=payment.gateway;
        if(gateway=='userpay'){
          that.setData({
            gateway:'钱包支付'
          })
        }else if(gateway=='wechat'){
          that.setData({
            gateway:'微信支付'
          })
        }
        var service=payment.service
        if(service==11){
          that.setData({
            service:'汽车直流快充'
          })
        }else if(service==12){
          that.setData({
            service:'汽车交流慢充'
          })
        }else if(service==13){
          that.setData({
            service:'电单车充电'
          })
        }else if(service==14){
          that.setData({
            service:'充电宝'
          })
        }else if(service==15){
        that.setData({
          service:'智能插座'
        })
      }
        that.setData({
          deal_no,
          pay,
          paid_time,
          state
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