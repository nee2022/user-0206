const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '订单确认',
    Url: `/pages/set_meal/set_meal?currentTab=1`,
    type1: '微信支付',
    gateway: 'wechat',
    wallet_amount: 0,
    minusStatus: 'disabled',
    num: 1,
    pdr: {},
    color: 'blue',
    token: '',
    meal: {},
    id:0,
    click1: true,
    click2: false,
    click3: false,
    click4: false,
    click5: false,
    text: '浙',
    value: '',
    top: false,
    pay:0,
    changes1: [
      { value: '京', name: '京' },
      { value: '泸', name: '泸' },
      { value: '浙', name: '浙' },
      { value: '苏', name: '苏' },
      { value: '粤', name: '粤' },
      { value: '鲁', name: '鲁' },
      { value: '晋', name: '晋' }
    ],
    changes2: [
      { value: '翼', name: '翼' },
      { value: '豫', name: '豫' },
      { value: '川', name: '川' },
      { value: '渝', name: '渝' },
      { value: '辽', name: '辽' },
      { value: '吉', name: '吉' },
      { value: '黑', name: '黑' }
    ],
    changes3: [
      { value: '皖', name: '皖' },
      { value: '鄂', name: '鄂' },
      { value: '湘', name: '湘' },
      { value: '赣', name: '赣' },
      { value: '闽', name: '闽' },
      { value: '陕', name: '陕' },
      { value: '甘', name: '甘' }
    ],
    changes4: [
      { value: '宁', name: '宁' },
      { value: '蒙', name: '蒙' },
      { value: '津', name: '津' },
      { value: '贵', name: '贵' },
      { value: '云', name: '云' },
      { value: '桂', name: '桂' },
      { value: '琼', name: '琼' }
    ],
    changes5: [
      { value: '青', name: '青' },
      { value: '新', name: '新' },
      { value: '藏', name: '藏' }
    ]
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.meal.num;
    console.log(num)
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    var meal = this.data.meal;
    meal.num = parseInt(num);
    meal.minusStatus = minusStatus;
    this.setData({
      meal: meal
    });
  },
  /* 点击加号 */
  bindPlus: function (e) {
    var num = this.data.meal.num;
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    var meal = this.data.meal;
    meal.num = parseInt(num);
    meal.minusStatus = minusStatus;
    this.setData({
      meal: meal
    });
  },
  radioChange1(e) {
    var that = this;
    that.hideModal1();
    if (e.detail.value == 'r1') {
      that.setData({
        type1: '钱包支付',
        gateway: 'userpay'
      })
    } else if (e.detail.value == 'r2') {
      that.setData({
        type1: '微信支付',
        gateway: 'wechat'
      })
    }
  },
  import(e) {
    var value = e.detail.value;
    console.log(value)
    this.setData({
      value
    })
  },
  pay() {
    var that = this;
    var openid = wx.getStorageSync('openid');
   if(that.data.meal.pay!=0){
    var unit_price = that.data.meal.pay 
   }else{
    var unit_price=that.data.pay
   }
    var id = that.data.id;
    var num = that.data.meal.num;
    // var state = that.data.meal.state;
    var value = that.data.value;
    var text=that.data.text;
    var car_code=text+value;
    console.log(car_code);
    var color = that.data.color;
    // console.log(state)
    var reality_pay = (num * unit_price).toFixed(2);
    wx.setStorageSync('value', value);
    wx.setStorageSync('text', text);
    wx.setStorageSync('color', color);
    console.log(reality_pay)
    var reg = /^[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    if (!reg.test(value)) {
      wx.showToast({
        title: '车牌号格式有误',
        icon: 'error',
        duration: 2000
      })
    }
    if (value == "") {
      wx.showToast({
        title: '车牌号不能为空',
        icon: 'error',
        duration: 2000
      })
    }
    console.log(id, num)
    if (reg.test(value)) {
        wx.request({
          url: app.BASE_URL.globelUrl + '/user/api/plan/pay',
          method: 'POST',
          data: {
            token: that.data.token,
            plan: id,
            gateway: that.data.gateway,
            type: 'miniprog',
            source: 'i.wechat',
            openid: openid,
            count: num,
            appid: 'wx659896642ff371ea',
            plates: car_code + '.' + color
          },
          success: (res) => {
            console.log(res);
            var pdr = res.data;
            that.setData({
              pdr
            })
            if (res.data.error > 0) {
              if (res.data.errmsg = "支付请求过于频繁") {
                wx.showToast({
                  title: '支付请求过于频繁',
                  icon: 'error',
                  duration: 1500
                })
              }
            }
            if (that.data.gateway == 'wechat') {
              console.log(res);
              wx.requestPayment({
                nonceStr: res.data.jsApiParameters.nonceStr,
                package: res.data.jsApiParameters.package,
                paySign: res.data.jsApiParameters.paySign,
                timeStamp: res.data.jsApiParameters.timeStamp,
                signType: res.data.jsApiParameters.signType,
                success: (res) => {
                  console.log(res);
                  if (res.errMsg == 'requestPayment:ok') {
                    wx.showToast({
                      title: '支付成功',
                      duration: 1500
                    })
                    setTimeout(() => {
                      var dealno = that.data.pdr.dealno;
                      var back_meal=0;
                      console.log(dealno)
                      wx.redirectTo({
                        url: `/pages/pay_sucess/pay_success?dealno=${dealno}&back_meal=${back_meal}&reality_pay=${reality_pay}`
                      })
                    }, 1500);
                  } else {
                    wx.showToast({
                      title: '支付失败',
                      icon: 'error',
                      duration: 1500
                    })
                  }
                }
              })
            } else if (that.data.gateway == 'userpay') {
              console.log(res)
              if (res.data.error == 0) {
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 1500
                })
                setTimeout(() => {
                  var dealno = that.data.pdr.dealno;
                  var back_meal=0;
                  console.log(dealno)
                  wx.redirectTo({
                    url: `/pages/pay_sucess/pay_success?dealno=${dealno}&back_meal=${back_meal}&reality_pay=${reality_pay}`
                  })
                }, 1500);
              } else if (that.data.wallet_amount < that.data.reality_pay) {
                wx.showToast({
                  title: '您的余额不足',
                  icon: 'error',
                  duration: 1500
                })
              }
            }
          }
        })
      }
  },
  clickme1: function () {
    var that = this;
    that.showModal1();
  },
  close1() {
    this.hideModal1();
  },
  showModal1: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData1: animation.export(),
      showModalStatus1: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData1: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal1: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData1: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData1: animation.export(),
        showModalStatus1: false
      })
    }.bind(this), 200)
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
    animation.translateY(500).step()
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
    animation.translateY(500).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        top: false
      })
    }.bind(this), 200)
  },
  change_color1(e) {
    var that = this;
    that.setData({
      click1: true,
      click2: false,
      click3: false,
      click4: false,
      click5: false,
      color: 'blue'
    })
  },
  change_color2(e) {
    var that = this;
    that.setData({
      click1: false,
      click2: true,
      click3: false,
      click4: false,
      click5: false,
      color: 'green'
    })
  },
  change_color3(e) {
    var that = this;
    that.setData({
      click1: false,
      click2: false,
      click3: true,
      click4: false,
      click5: false,
      color: 'yellow'
    })
  },
  change_color4(e) {
    var that = this;
    that.setData({
      click1: false,
      click2: false,
      click3: false,
      click4: true,
      click5: false,
      color: 'white'
    })
  },
  change_color5(e) {
    var that = this;
    that.setData({
      click1: false,
      click2: false,
      click3: false,
      click4: false,
      click5: true,
      color: 'black'
    })
  },
  province_change(e) {
    this.hideModal();
    const event = e.currentTarget.dataset.province;
    this.setData({
      text: event
    })
  },
  cancle() {
    this.hideModal()
  },
  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
    this.setData({
      top: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var meal = JSON.parse(options.meal);
    var state=meal.state;
    if(state!=undefined && state==0){
      that.setData({
        Url:`/pages/set_meal/set_meal?currentTab=0`
      })
    }
    console.log(meal);
    that.setData({
      meal
    })
    var text=wx.getStorageSync('text');
    var value=wx.getStorageSync('value');
    var color=wx.getStorageSync('color');
    if(color=='blue'){
      that.setData({
        click1:true,
        click2: false,
        click3: false,
        click4: false,
        click5: false
      })
    }else if(color=='green'){
      that.setData({
        click2:true,
        click1: false,
        click3: false,
        click4: false,
        click5: false
      })
    }else if(color=='yellow'){
      that.setData({
        click3:true,
        click2: false,
        click1: false,
        click4: false,
        click5: false
      })
    }else if(color=='white'){
      that.setData({
        click4:true,
        click2: false,
        click3: false,
        click1: false,
        click5: false
      })
    }else{
      that.setData({
        click5:true,
        click2: false,
        click3: false,
        click4: false,
        click1: false
      })
    }
   if(color!='' && value!="" && text!=""){
    that.setData({
      text,
      color,
      value
    })
   }
    var token = wx.getStorageSync('token');
    that.setData({
      token
    })
    var ID=that.data.meal.plan;
    var plan=that.data.meal.plan;
    if(plan!=undefined){
      that.setData({
        id:plan
      })
    }else{
      that.setData({
        id:that.data.meal.id
      })
    }
    console.log(ID+'djk');

  if(ID!=undefined){
    wx.request({
      url:  app.BASE_URL.globelUrl+`/user/api/plan/${ID}`,
      method:'GET',
      data:{
         token
      },
      header: {
        "Content-Type": "application/json"
      },
      success:(res)=>{
        console.log(res)
        var pay=res.data.plan.pay
        // console.log(pay)
        that.setData({
         pay
       })
      }
    })
  }
    if (token != '') {
      wx.request({
        url: app.BASE_URL.globelUrl + '/user/api/profile',
        method: 'GET',
        data: {
          token
        },
        header: {
          "Content-Type": "application/json"
        },
        success: (res) => {
          console.log(res)
          var wallet_amount = res.data.user.amount;
          that.setData({
            wallet_amount
          })
        }
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