//app.js
App({
  BASE_URL:{
      globelUrl:'https://www.api.sqjtjt.com'
  },
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    // var token=wx.getStorageSync('token')
    // if(token==''){
  //     wx.showModal({
  //        title:'温馨提示',
  //        content:'您还未登录，将无法使用系统功能',
  //        success:(res)=>{
  //          if(res.confirm){
  //             wx.navigateTo({
  //               url: '/pages/login/login',
  //             })
  //          }else{
  //            console.log(111)
  //          }
  //        }
  //     })
  // }
    // 登录
    wx.login({
      success (res) {
        console.log(res);
        if (res.code) {
          // console.log(res.code);
          var code=res.code;
          wx.request({
            url: 'https://www.api.sqjtjt.com/user/api/token',
            method:"POST",
            header:{
              "Content-Type": "application/json"
            },
            data: {
              type:4,
              appid:"wx659896642ff371ea",
              code:code,
            }, 
            success(res){
              // console.log(res);
              // console.log(111)
              // console.log(res)
              if(res.data.error==0){
                  let openid=res.data.openid;
                  let token=res.data.token;
                  let user=res.data.user
                      //保存到客户端
                   //做后期逻辑处理
                   wx.setStorage({
                     data: openid,
                     key: 'openid',
                   })
                   wx.setStorage({
                    data: token,
                    key: 'token',
                  })
                  wx.setStorage({
                    data: user,
                    key: 'user',
                  })
              }else{
                 wx.removeStorage(
                   {
                   key: 'openid',
                   success(res){
                    //  console.log(res.data)
                   }
                 },
                 {
                  key: 'token',
                  success(res){
                    // console.log(res.data)
                  }
                }
                 )
              }
              // console.log(res.data)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
 }
})
