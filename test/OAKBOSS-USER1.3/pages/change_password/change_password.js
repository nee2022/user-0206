// pages/change_password/change_password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'修改密码',
    Url:'/pages/personal_info/personal_info',
    Eyes1:true,
    Eyes2:true,
    text1:"password",
    text2:'password',
    hidden1:true,
    hidden2:true,
    URL:"",
    set1:"",
    set2:"",
    message:"密码有误",
    vanish:false
  },
   switch1(){
     this.setData({
       Eyes1:!this.data.Eyes1,
       text1:"text"
     })
   },
   switch2(){
    this.setData({
      Eyes1:!this.data.Eyes1,
      text1:"password"
    })
  },
  switch3(){
    this.setData({
      Eyes2:!this.data.Eyes2,
      text2:"text"
    })
  },
  switch4(){
   this.setData({
     Eyes2:!this.data.Eyes2,
     text2:"password"
   })
 },
setting(e){
  console.log(e.detail.value.length)
  if(e.detail.value.length>=1){
    this.setData({
      hidden1:false
    })
  }else if(e.detail.value.length==0){
    this.setData({
      hidden1:true
    })
  }
},
confrim(e){
  console.log(e.detail.value.length)
  if(e.detail.value.length>=1){
    this.setData({
      hidden2:false
    })
  }else if(e.detail.value.length==0){
    this.setData({
      hidden2:true
    })
  }
},
 clear1(){
   this.setData({
     hidden1:true,
     set1:''
   })
 },
 clear2(){
  this.setData({
    hidden2:true,
    set2:''
  })
},
focus1(){
this.setData({
  vanish:false
})
},
focus2(){
  this.setData({
    vanish:false
  })
  },
formSubmit:function(e){
  var newpwd=e.detail.value.newpwd;
  var newpwd2=e.detail.value.newpwd2;
  var myreg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/;
  if(newpwd=="" || newpwd2==""){
     this.setData({
       vanish:true,
       message:"密码不能为空"
     })
  }else if(newpwd!=newpwd2){
    this.setData({
      vanish:true,
      message:'两次输入不一致'
    })
  }else if(!myreg.test(newpwd)){
    this.setData({
      vanish:true,
      message:'密码格式不正确'
    })
  }else{
    //发送请求
  }
  
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