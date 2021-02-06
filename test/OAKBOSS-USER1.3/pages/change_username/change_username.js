// pages/change_nickname/change_nickname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'修改用户名',
    Url: "/pages/personal_info/personal_info",
    vanish:false,
    message:"",
    num:0,
    buton:false
  },

  nickname_input(e){
     var val=e.detail.value;
     var myreg=/^[\u4e00-\u9fa5A-Za-z0-9]{1,24}$/
     this.setData({
      num:val.length,
     })
     if(myreg.test(val)){
      this.setData({
        buton:true
      })
     }else{
       this.setData({
         buton:false
       })
     }
     
  },

  // formSubmit:function(e){
  //   var nickname=e.detail.value.nickname;
  //   if(nickname!=="" ){
  //     this.setData({
  //        buton:true
  //     })
  //   }else{
  //       this.setData({
  //         buton:false
  //       })
  //   }
  // }
})