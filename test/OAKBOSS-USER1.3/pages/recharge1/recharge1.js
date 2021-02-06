const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     title:'充值',
     Url:'/pages/metro_card1/metro_card1',
     un_click1:'money_box1',
     un_click2: 'money_box',
     un_click3: 'money_box',
     un_click4: 'money_box',
     un_click5: 'money_box',
     un_click6: 'money_box',
     hidden:true,
     hidden1:true,
     pay1:0,
     pay2:0, 
     pay3:0,
     pay4:0,
     pay5:0,
     title3:'',
     title4:'',
     title5:'',
     inputs:0,
     money: 0,
     token:'',
     openid:'',
     amount:'',
     paylist1:0,
     paylist2:0,
     paylist3:0,
     paylist4:0,
     paylist5:0,
     cardId_:0
  },
  lv1:function(event){
    this.setData({
      un_click2: 'money_box',
      un_click3: 'money_box',
      un_click4: 'money_box',
      un_click5: 'money_box',
      un_click6: 'money_box',
      un_click1:'money_box1',
      money:event.currentTarget.dataset.amount,
      hidden:true
    })
},
lv2: function (event) {
  this.setData({
    un_click2: 'money_box1',
    un_click3: 'money_box',
    un_click4: 'money_box',
    un_click5: 'money_box',
    un_click6: 'money_box',
    un_click1: 'money_box',
    money:event.currentTarget.dataset.amount,
    hidden:true
  })
},
lv3: function (event) {
  this.setData({
    un_click2: 'money_box',
    un_click3: 'money_box1',
    un_click4: 'money_box',
    un_click5: 'money_box',
    un_click6: 'money_box',
    un_click1: 'money_box',
    money:event.currentTarget.dataset.amount,
    hidden:true
  })
},
lv4: function (event) {
  this.setData({
    un_click2: 'money_box',
    un_click3: 'money_box',
    un_click4: 'money_box1',
    un_click5: 'money_box',
    un_click6: 'money_box',
    un_click1: 'money_box',
    money:event.currentTarget.dataset.amount,
    hidden:true
  })
},
lv5: function (event) {
  this.setData({
    un_click2: 'money_box',
    un_click3: 'money_box',
    un_click4: 'money_box',
    un_click5: 'money_box1',
    un_click6: 'money_box',
    un_click1: 'money_box',
    money:event.currentTarget.dataset.amount,
    hidden:true
  })
},
lv6: function () {
  this.setData({
    un_click2: 'money_box',
    un_click3: 'money_box',
    un_click4: 'money_box',
    un_click5: 'money_box',
    un_click6: 'money_box1',
    un_click1: 'money_box',
    hidden:false
  })
},
getMoney(e){
  var amount=e.detail.value
  this.setData({
    inputs:amount
  })
},

clickPay(){
  var that=this;
  var inputs=that.data.inputs;
  let openid=wx.getStorageSync('openid')
  that.setData({
    openid
  })
  if(inputs===0){
    wx.request({
      url: app.BASE_URL.globelUrl+`/user/api/card/${that.data.cardId_}/pay`,
      method:'POST',
      dataType:'json',
      header:{
        "content-type": "application/json"
      },
      data:{
      token:that.data.token,
      paylist:that.data.money,
      gateway:'wechat',
      appid:'wx659896642ff371ea',
      source:"i.wechat",
      type:"miniprog",
      openid:that.data.openid
      },
      success:(res)=>{
        console.log(res);
         wx.requestPayment({
           nonceStr: res.data.jsApiParameters.nonceStr,
           package: res.data.jsApiParameters.package,
           paySign: res.data.jsApiParameters.paySign,
           timeStamp: res.data.jsApiParameters.timeStamp,
           signType:res.data.jsApiParameters.signType,
           success:(res)=>{
             console.log(res);
            if(res.errMsg == 'requestPayment:ok'){
              wx.showToast({
                title:'支付成功',
                duration:1500  
             })
              setTimeout(() => {
                // var cardInfo=JSON.stringify(that.data.card)
               wx.redirectTo({
                url: `/pages/metro_card1/metro_card1`,
              })
              }, 1500);
            }else{
              wx.showToast({
                title:'支付失败',
                icon:none,
                duration:1500
             })
            }
           }
         })
      }
    })
  }else{
    wx.request({
      url: app.BASE_URL.globelUrl+`/user/api/card/${that.data.cardId_}/pay`,
      header:{
        "content-type": "application/json"
      },
      method:'POST',
      data:{
      token:that.data.token,
      gateway:'wechat',
      amount:that.data.inputs,
      appid:'wx659896642ff371ea',
      source:"i.wechat",
      type:"miniprog",
      openid:that.data.openid
      },
      success:(res)=>{
        console.log(res);
         wx.requestPayment({
           nonceStr: res.data.jsApiParameters.nonceStr,
           package: res.data.jsApiParameters.package,
           paySign: res.data.jsApiParameters.paySign,
           timeStamp: res.data.jsApiParameters.timeStamp,
           signType:res.data.jsApiParameters.signType,
           success:(res)=>{
             console.log(res)
             if(res.errMsg == 'requestPayment:ok'){
              wx.showToast({
                title:'支付成功',
                duration:1500  
             })
              setTimeout(() => {
                // var cardInfo=JSON.stringify(that.data.card)
               wx.redirectTo({
                url: `/pages/metro_card1/metro_card1`
              })
              }, 1500);
            }else{
              wx.showToast({
                title:'支付失败',
                icon:none,
                duration:1500
             })
            }
           }
         })
      }
    })
  }
 
},
recharge(){
  var that=this;
  wx.getStorage({
    key: 'token',
    success:function(res){
      // console.log(res);
      const token=res.data
      that.setData({
        token
      })
      // console.log(token);
      wx.request({
        url: app.BASE_URL.globelUrl+'/user/api/paylist',
        method:"GET",
        header:{
          "Content-Type": "application/json"
        },
        data: {
         token
        }, 
        success:(res)=>{
          // console.log(res);
          var paylist=res.data.paylist;
         that.setData({
           pay1:paylist[0].pay,
           pay2:paylist[1].pay,
           pay3:paylist[2].pay,
           pay4:paylist[3].pay,
           pay5:paylist[4].pay,
           title3:paylist[2].title,
           title4:paylist[3].title,
           title5:paylist[4].title,
           paylist1:paylist[0].id,
           paylist2:paylist[1].id,
           paylist3:paylist[2].id,
           paylist4:paylist[3].id,
           paylist5:paylist[4].id,
           money:paylist[2].id
         })
        }
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.recharge();
  if(options.cardId!=undefined){
    var cardId=options.cardId;
    console.log(cardId)
    that.setData({
      cardId_:cardId
    })
  }else{
    var card=JSON.parse(options.card);
    var $cardId=card.id;
    console.log($cardId);
    that.setData({
      cardId_:$cardId
    })
  }
  console.log(that.data.cardId_)
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