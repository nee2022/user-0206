// pages/login/login.js
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:'登录',
    userInfo: {},
    showAuth: true,
    code:'',
    showModal: false
  },
  getPhoneNumber: function (e) {
    var that=this;
    wx.checkSession({
      success: function () {   
          wx.login({
            success (res) {
              console.log(res);
              if (res.code) {
                console.log(res.code);
                // 发起网络请求
                that.setData({
                  code:res.code
                })
                // console.log(that.data.code+'1111');
                wx.request({
                  url: app.BASE_URL.globelUrl+'/user/api/token',
                  method:"POST",
                  header:{
                    "Content-Type": "application/json"
                  },
                  data: {
                    type:4,
                    appid:"wx659896642ff371ea",
                    code:that.data.code,
                  }, 
                  success(res){
                    console.log(res);
                    wx.navigateTo({
                      url: '/pages/index/index',
                      success:(res)=>{
                        // res.eventChannel.emit()
                        console.log(res)
                      }
                    })
                    console.log(111)
                    console.log(res)
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
                           console.log(res.data)
                         }
                       },
                       {
                        key: 'token',
                        success(res){
                          console.log(res.data)
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
      }
    })
  }
})