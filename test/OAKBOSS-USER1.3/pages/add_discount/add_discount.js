// pages/add_discount/add_discount.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'添加优惠卡',
   Url:'/pages/metro_card1/metro_card1',
   vanish:false,
   message:"",
   num:0,
   buton:false,
   disabled1:true,
   card_number:'',
   number:''
  },
  transmint(){
    var that=this;
    var val=that.data.number;
    var myreg=/^[\u4e00-\u9fa5A-Za-z0-9]{6,24}$/
    this.setData({
     num:val.length,
    })
    if(myreg.test(val)){
     this.setData({
       buton:true,
       disabled1:false
     })
    }else{
      this.setData({
        buton:false,
        disabled1:true
      })
    }
  },
  nickname_input(e){
    var val= e.detail.value;  
    var myreg=/^[\u4e00-\u9fa5A-Za-z0-9]{6,24}$/
    this.setData({
     num:val.length,
    })
    if(myreg.test(val)){
     this.setData({
       buton:true,
       disabled1:false
     })
    }else{
      this.setData({
        buton:false,
        disabled1:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
   console.log(options.number)
  if(options.number!=undefined){
    var number=String(options.number);
  }
   that.setData({
     number
   })
   that.transmint();
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
 formSubmit_(e) {
   var that=this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value.nickname);
   var card_number=e.detail.value.nickname;
   that.setData({
    card_number
  })
  var token=wx.getStorageSync('token')
  console.log(token)
  console.log(that.data.card_number)
  wx.request({
    url:app.BASE_URL.globelUrl+'/user/api/card',
    method:'POST',
    header:{
      'content-type':'text/html'
    },
    data:{
      token,
      number:that.data.card_number
    },
    success:(res)=>{
      console.log(res);
     if(res.data.errmsg=='绑定失败!'){
       wx.showToast({
         title:'绑定失败!',
         icon:'error',
         duration:1500
       })
     }else if(res.data.error==0){
      wx.showToast({
        title:'绑定成功',
        icon:'success',
        duration:1500,
         success:()=>{
         setTimeout(()=>{
          wx.navigateTo({
            url: '/pages/metro_card1/metro_card1',
          })
         },1500)
                                                    
         }
      })
     }
    },
    fail(){
      console.log(1123)
    }
  })
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