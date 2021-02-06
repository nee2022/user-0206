// pages/bicycle_charge/bicycle_charge.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  ports:[],
  v:0,
  charger:0,
  deal_no:0,
  soc:0,
  _i1:0,
  _p1:0,
  _energy1:0,
  hour:'0',
  minute:'0'+0,
  second:'0'+0,
  pay:0,
  token:'',
  hidden1:false,
  hidden2:true,
  hidden3:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var deal_no=options.dealno;
    var pay=options.pay;
    var that=this;
    var token=wx.getStorageSync('token')
    console.log(token)
    var charger=wx.getStorageSync('charger')
    console.log(charger)
    that.setData({
      charger,
      deal_no,
      pay,
      token
    })
    // console.log(that.data.deal_no)
  wx.request({
      url:  app.BASE_URL.globelUrl+'/user/api/charger/'+that.data.charger,
      method:'GET',
      header: {
        "Content-Type": "application/json"
      },
      data:{
        token,
        attach:'state,ports'
      },
      success:(res)=>{
        console.log(res);
        var ports=res.data.charger.ports;
        for(var key in ports){
            if(ports[key].dealno==that.data.deal_no){
              console.log(ports[key]);
              var v=Math.round(ports[key].v)
              var soc=ports[key].soc
              var i1=ports[key].i;
              var p1=ports[key].p;
              var energy1=ports[key].energy
              var start_time1=ports[key].start_time;
              var start_time=start_time1.replace(/-/g,'/');
             var d=new Date().getTime()-new Date(start_time).getTime();
             var hour=Math.floor(d/1000/60/60);
             var minute=Math.floor(d/1000/60%60);
             var second=Math.floor(d/1000)
           if(0<=second && second<60){
              that.setData({
                hidden1:false,
                hidden2:true,
                hidden3:true
              })
           }else if(second>=60){
            that.setData({
              hidden1:true,
              hidden2:false,
              hidden3:true
            })
           }else if(1<=minute && minute<60){
            that.setData({
              hidden1:true,
              hidden2:false,
              hidden3:true
            })
           }else if(minute>=60){
            that.setData({
              hidden1:true,
              hidden2:true,
              hidden3:false
            })
           }
             if(second<10){
              second='0'+second
             }
             if(minute<10){
               minute='0'+minute
             }
             that.setData({
               minute:minute,
               hour:hour,
               second:second
             })
             if(i1<1){
               var _i1=(Math.round(i1*1000))+'mA'
               that.setData({
                 _i1
               })
             }else if(i1>=1 && i1<10){
                var _i2=(i1.toFixed(2
                  ))+'A'
                that.setData({
                  _i1:_i2
                })
             }else if(i1>=10){
               var _i3=(Math.round(i1))+'A'
               that.setData({
                 _i1:_i3
               })
             }
             if(p1<1){
              var _p1=(Math.round(p1*1000))+'W'
              that.setData({
                _p1
              })
            }else if(p1>=1 && p1<10){
               var _p2=(p1.toFixed(2))+'Kw'
               that.setData({
                 _p1:_p2
               })
            }else if(p1>=10){
              var _p3=(Math.round(p1))+'Kw'
              that.setData({
                _p1:_p3
              })
            }
            if(energy1<1){
              var _energy1=(Math.round(energy1*1000))+'Wh'
              that.setData({
                _energy1
              })
            }else if(energy1>=1 && energy1<10){
               var _energy2=(energy1.toFixed(2
                 ))+'Kwh'
               that.setData({
                 _energy1:_energy2
               })
            }else if(energy1>=10){
              var _energy3=(Math.round(energy1))+'Kwh'
              that.setData({
                _energy1:_energy3
              })
            }
              that.setData({
                ports:ports[key],
                v,
                soc
              })
            }
        }
        // console.log(that.data.ports)
      }
    })


  var i=setInterval(()=>{
    console.log(2222)
    wx.request({
      url:  app.BASE_URL.globelUrl+'/user/api/charger/'+that.data.charger,
      method:'GET',
      header: {
        "Content-Type": "application/json"
      },
      data:{
        token,
        attach:'state,ports'
      },
      success:(res)=>{
        // console.log(res);
          var ports=res.data.charger.ports;
        for(var key in ports){
            if(ports[key].dealno==that.data.deal_no){
              // console.log(ports[key]);
              var v=Math.round(ports[key].v)
              var soc=ports[key].soc
              var i1=ports[key].i;
              var p1=ports[key].p;
              var energy1=ports[key].energy
              var start_time1=ports[key].start_time;
              //兼容ios
              var start_time=start_time1.replace(/-/g,'/');
             var d=new Date().getTime()-new Date(start_time).getTime();
             var hour=Math.floor(d/1000/60/60);
             var minute=Math.floor(d/1000/60%60);
             var second=Math.floor(d/1000);
             console.log(second)
             if(0<=second && second<60){
               console.log(33333)
                that.setData({
                  hidden1:false,
                  hidden2:true,
                  hidden3:true
                })
             }else if(second>60){
               console.log(11111)
              that.setData({
                hidden1:true,
                hidden2:false,
                hidden3:true
              })
             }
              if(1<=minute && minute<60){
              that.setData({
                hidden1:true,
                hidden2:false,
                hidden3:true
              })
             }else if(minute>=60){
              that.setData({
                hidden1:true,
                hidden2:true,
                hidden3:false
              })
             }
             if(second<10){
              second='0'+second
             }
             if(minute<10){
               minute='0'+minute
             }
             that.setData({
               minute:minute,
               hour:hour,
               second:second
             })
             if(i1<1){
               var _i1=(Math.round(i1*1000))+'mA'
               that.setData({
                 _i1
               })
             }else if(i1>=1 && i1<10){
                var _i2=(i1.toFixed(2
                  ))+'A'
                that.setData({
                  _i1:_i2
                })
             }else if(i1>=10){
               var _i3=(Math.round(i1))+'A'
               that.setData({
                 _i1:_i3
               })
             }
             if(p1<1){
              var _p1=(Math.round(p1*1000))+'W'
              that.setData({
                _p1
              })
            }else if(p1>=1 && p1<10){
               var _p2=(p1.toFixed(2))+'Kw'
               that.setData({
                 _p1:_p2
               })
            }else if(p1>=10){
              var _p3=(Math.round(p1))+'Kw'
              that.setData({
                _p1:_p3
              })
            }
            if(energy1<1){
              var _energy1=(Math.round(energy1*1000))+'Wh'
              that.setData({
                _energy1
              })
            }else if(energy1>=1 && energy1<10){
               var _energy2=(energy1.toFixed(2
                 ))+'Kwh'
               that.setData({
                 _energy1:_energy2
               })
            }else if(energy1>=10){
              var _energy3=(Math.round(energy1))+'Kwh'
              that.setData({
                _energy1:_energy3
              })
            }
              that.setData({
                ports:ports[key],
                v,
                soc
              })
            }
        }
        // console.log(that.data.ports)
        if(that.data.soc==100){
          clearInterval(i)
        }
      }
    })
   },5000)
   if(that.data.soc==100){
    clearInterval(i)
  }
  },
   f2(){
     var that=this;
     wx.showModal({
       title:'提示',
       content:'您确定要结束充电吗？',
       success(res){
         if(res.confirm){
          wx.request({
            url:app.BASE_URL.globelUrl+'/user/api/charger/session',
            data:{
             token:that.data.token,
             dealno:that.data.deal_no
            },
            header: {
             "Content-Type": "x-www-form-urlencoded"
           },
            method:'DELETE',
            success:(res)=>{
              console.log(res)
              console.log(1111)
              if(res.data.error==0){
                wx.redirectTo({
                  url: '/pages/index/index',
                })
              }
            }
          })
         }else if(res.cancel){
          console.log('用户点击取消')
        }
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