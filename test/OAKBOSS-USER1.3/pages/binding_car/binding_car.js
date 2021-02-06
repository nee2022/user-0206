const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '绑定车辆',
    Url: '/pages/personal_center/pensonal_center',
    click1: true,
    click2: false,
    click3: false,
    click4: false,
    click5: false,
    color:"blue",
    text: '浙',
    top: false,
    value:'',
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
  change_color1(e) {
    var that = this;
    that.setData({
      click1: true,
      click2: false,
      click3: false,
      click4: false,
      click5: false,
      color:'blue'
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
      color:'green'
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
      color:'yellow'
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
      color:'white'
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
      color:'black'
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
  binding() {
    var that=this;
    var value = that.data.value;
    var text=that.data.text;
    var car_code=text+value;
    var token = wx.getStorageSync('token');
    var color = that.data.color;
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
  if(reg.test(value)){
    wx.request({
      url: app.BASE_URL.globelUrl + '/user/api/plates',
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      data: {
        token,
        plates:[{
          plate: car_code,
          color: color,
          media: {
            format: 'jpg',
            data: "MTlxMg==",
            digest: '64d47e54c691b3a4ec65492f7646589b'
          }
        }]
      },
      success: (res) => {
        console.log(res)
        if(res.data.error==0){
          wx.showToast({
            title: '绑定成功',
            icon:'success',
            duration:1500
          })
          wx.setStorageSync('value', value);
          wx.setStorageSync('text', text);
          wx.setStorageSync('color', color);
          console.log(value,text,color)
         setTimeout(()=>{
          wx.redirectTo({
            url: '/pages/personal_center/pensonal_center',
          })
         },1000)
        }else{
          wx.showToast({
            title: '绑定失败',
            icon:'error',
            duration:1500
          })
        }
      }
    })
  }
  },
  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
    this.setData({
      top: true
    })
  },
  import(e) {
    var value = e.detail.value;
    console.log(value)
    this.setData({
      value
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