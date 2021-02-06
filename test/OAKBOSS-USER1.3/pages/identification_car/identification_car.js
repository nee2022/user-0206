const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '认证车辆',
    Url: '/pages/personal_center/pensonal_center',
    color: '',
    plate: '',
    tempFilePaths:'',
    tempFilePaths_:'',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var color = options.color;
    var plate = options.plate;
    that.setData({
      color,
      plate
    })
  },
  refer(){
    var that=this;
    var nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
    var name=that.data.name;
    if(name==""){
      wx.showToast({
        title: '姓名不能为空',
        icon:'error',
        duration:1500
      })
    }else if(!nameReg.test(name)){
       wx.showToast({
         title: '姓名格式不正确',
          icon:'error',
          duration:1500
       })
    }else if(that.data.tempFilePaths_==''){
      wx.showToast({
        title: '行驶证照片为空',
        icon:'error',
        duration:1500
      })
    }else if(that.data.tempFilePaths==''){
      wx.showToast({
        title: '驾驶证照片为空',
        icon:'error',
        duration:1500
      })
    }
    if(name!='' && nameReg.test(name) && that.data.tempFilePaths_!='' && that.data.tempFilePaths!=''){
      var token=wx.getStorageSync('token')
      wx.request({
        url: app.BASE_URL.globelUrl+'/user/api/plate/certificates',
        method:'POST',
        header:{
          "Content-Type": "application/json"
        },
        data:{
          plate:that.data.plate,
          color:that.data.color,
          token,
          certificates:[
            {
            type:3,
            front:{
            format:'jpg',
            data:'MTIxMg==',
            digest:'64d47e54c691b3a4ec65492f7646589b'
          },
           back:{
            format:'jpg',
            data:'MTIxMg==',
            digest:'64d47e54c691b3a4ec65492f7646589b'
        }
      }
        ]
        },
       success:(res)=>{
         if(res.data.error==0){
           wx.showToast({
             title: '提交成功',
             icon:'success',
             duration:1500
           })
           setTimeout(()=>{
             wx.redirectTo({
               url: '/pages/attestation_success/attestation_success',
             })
           },1500)
         }else{
           wx.showToast({
             title: '提交失败',
             icon:'error',
             duration:1500
           })
         }
       }
      })
    }
  },
  name(e){
    var e=e.detail.value;
    console.log(e);
    this.setData({
      name:e
    })
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          tempFilePaths:res.tempFilePaths
        })
      }
    })
  },
  chooseimage_: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          tempFilePaths_:res.tempFilePaths
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