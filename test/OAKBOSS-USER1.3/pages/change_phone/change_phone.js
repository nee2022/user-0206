// pages/phone_login/phone_login.js
const app=getApp();// 全局数据，可以在所有的子页面中使用
Page({
   
  /**
   * 页面的初始数据
   */
  data: {
    title:'修改手机号',
    message:"手机号有误",
    //hidden 只对块状布局有效 display:flex
    vanish:false,
    Url:'/pages/personal_info/personal_info',
    btnValue:'获取验证码',
    send_yn:false,
    phone:'',
    text:"",
    code:'',
    disable1:false,
    second:120,
    disable2:true,
    btnDisabled:false,
    hidden:true
  },
  //手机号输入
  bindPhoneInput(e){
  //  console.log(e.detail.value);
   var val =e.detail.value;
   this.setData({
     phone:val
   })
   if(val !=''){
       this.setData({
          send_yn:true,
          hidden:false
       })
   }else{
     this.setData({
      hidden:true
     })
   }
  },
  //发送验证码
 send_code(){
    var that=this;
    var code=that.data.phone;
    // console.log(code);
    // console.log(1111);
    const myreg=/^1[3-9]\d{9}$/;
    if(myreg.test(code)){
        // console.log(2222)
       wx.request({
         url: app.BASE_URL.globelUrl+'/api/captcha',
         data:{
           type:"1",
           telephone:code
         },
         method:"POST",
         header:{
          "Content-Type": "application/json" // 默认值
         },
         success:(res)=>{
          //  console.log(res)
            if(res.data.error==0){
              that.setData({
                send_yn:false,
                disable2:false,
                btnDisabled:true
               })
              that.timer();
              return;
            }else if(res.data.error == 4353){
              this.setData({
                btnDisabled:false,
                send_yn:true,
                message:"尝试次数过多",
                vanish:true
              })
            }
            else{
              this.setData({
                btnDisabled:false,
                send_yn:true
              })
            }
         },
       })
    }
},
timer:function(){
  let promise=new Promise((resolve,reject)=>{
    let setTimer=setInterval(
      ()=>{
      var second=this.data.second - 1;
      // console.log(second)
     
      if(this.data.second <=0){
        // console.log(this.data.second)
        this.setData({
          second:120,
          btnValue:'获取验证码',
          btnDisabled:false,
          send_yn:true
        })
        resolve(setTimer)
      }else{
        this.setData({
          second:second,
          btnValue:"重新发送"+"("+second+'秒'+")",
        })
      }
    },500)
  })
  promise.then((setTimer) =>{
     clearInterval(setTimer)
  })
},
 codedight(e){
   this.setData({
     vanish:false
   })

 },
  //验证码输入
  bindCodeInput(e){
    const code=e.detail.value;
    const mycode=/^\d{4,8}$/;
    if(mycode.test(code)){
      this.setData({
        code:e.detail.value,
      })
    }
  },
  phonedight(){
     this.setData({
       vanish:false  
     })
  },
   phonenumber(e){
    const that=this;
    const mobile=e.detail.value;
    const myreg=/^1[3-9]\d{9}$/;
     if(!myreg.test(mobile)){
       that.setData({
         vanish:true,
         send_yn:false,
         disable2:true
       }) 
     }else{
      this.setData({
         phone:e.detail.value
      })
     }
   },
   login(){
    var that=this;
    if(that.data.phone==""){
      that.setData({
        vanish:true,
        message:'手机号不能为空'
      })
    }
   else if(that.data.code==''){
      that.setData({
        vanish:true,
        message:'验证码不能为空'
      })
    }else{
      wx.request({
        url: app.BASE_URL.globelUrl+'/api/captcha/',
        data:{
          telephone:that.data.phone,
          code:that.data.code
        },
       method:"GET",
       header: {
        'content-type': 'application/json'
      },
       success:(res)=>{
        // console.log(res);
       if(res.data.error==4357){
          this.setData({
              vanish:true,
              message:'验证码有误'
          })
        }else if(res.data.error==0){
        wx.request({
          url: app.BASE_URL.globelUrl+'/user/api/token',
          method:'POST',
          header:{
            "Content-Type": "application/json"
          },
          data:{
            type:1,
            telephone:that.data.phone,
            code:that.data.code
          },
          success:res=>{
            console.log(res);
            // console.log(1111)
            setTimeout(function(){
              wx.navigateTo({
               url: '/pages/index/index',
             }) 
           },1000)
          }
        })
        }
      },
      fail:()=>{
        console.log('发送失败')
      }   
      })
    }
   },
    //检测验证码
    
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      vanish:false
    })
  },
})