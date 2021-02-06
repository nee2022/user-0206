// pages/my_order/my_order.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
     title:'我的订单',
     Url:'/pages/personal_center/pensonal_center',
     // tab切换
     currentTab: 0,
     payments:[],
     state4:[],
     state2:[],
     state1:[],
     hiddena1:true,
     hiddena2:false,
     hiddenb1:true,
     hiddenb2:false,
     hiddenc1:true,
     hiddenc2:false,
     hiddend1:true,
     hiddend2:false,
     page:1,
     totalPage:1,
     row:7,
     start:'',
     end:'',
     token:'',
     start:'',
     end:'',
     date:new Date().getMonth()+1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindDateChange: function(e) {
    var that=this;
    var str=e.detail.value;
    // var token=that.data.token;
    var str1=str.substring(str.length-2)
    that.setData({
      date: str1
    })
    console.log(str1)
  },
  nav_1(e){
    var event=e.currentTarget.dataset.id1;
    console.log(event)
    var _id=e.currentTarget.dataset.id1[0];
    var _state=e.currentTarget.dataset.id1[1];
    console.log(_id,_state)
    wx.redirectTo({
      url: `/pages/order_detail/order_detail?id=${_id}&state=${_state}`,
    })
  },
  onLoad: function (options) {
    console.log(options)
    var currentTab=options.currentTab;
    this.setData({
      currentTab
    })
    var that = this;
     /**
     * 获取系统信息
     */
    wx.getSystemInfo( { 
      success: function( res ) {
        that.setData( {
          winHeight: res.windowHeight
        });
      }
    });
   var token=wx.getStorageSync('token')
    wx.request({
      url: app.BASE_URL.globelUrl+'/user/api/payments',
      method:'GET',
      data:{
        token,
        page:that.data.page,
        row:that.data.row
      },
      header:{
        "Content-Type": "application/json" 
      },
      success:(res)=>{
        console.log(res)
       var total=res.data.total
       var totalPage=Math.ceil(total/that.data.row);
      if(res.data.errmsg=='记录未查到'){
        that.setData({
          hiddena1:false,
          hiddena2:true,
          start,
          end
        })
      }else{
        that.setData({
          payments:res.data.payments,
          hiddena1:true,
          hiddena2:false,
          totalPage,
          token
        })
        wx.request({
          url: app.BASE_URL.globelUrl+'/user/api/payments',
          method:'GET',
          data:{
            token,
            page:that.data.page,
            row:total
          },
          header:{
            "Content-Type": "application/json" 
          },
          success:(res)=>{
            console.log(res)
            var start=res.data.payments[total-1].update_time.slice(0,7);
            var end=res.data.payments[0].update_time.slice(0,7);
            console.log(start,end)
          }
        })
      }
      }
    })
    wx.request({
      url: app.BASE_URL.globelUrl+'/user/api/payments/state/4',
      method:'GET',
      data:{
        token,
        page:that.data.page,
        row:that.data.row
      },
      header:{
        "Content-Type": "application/json" 
      },
      success:(res)=>{
        // console.log(res)
        if(res.data.errmsg=='记录未查到'){
          that.setData({
            hiddenb1:false,
            hiddenb2:true
          })
        }else{
          that.setData({
            state4:res.data.payments,
            hiddenb1:true,
            hiddenb2:false
          })
        }
      }
    })
    wx.request({
      url: app.BASE_URL.globelUrl+'/user/api/payments/state/2',
      method:'GET',
      data:{
        token,
        page:that.data.page,
        row:that.data.row
      },
      header:{
        "Content-Type": "application/json" 
      },
      success:(res)=>{
        console.log(res)
        if(res.data.errmsg=='记录未查到'){
          that.setData({
            hiddenc1:false,
            hiddenc2:true
          })
        }else{
          that.setData({
            state2:res.data.payments,
            hiddenc1:true,
            hiddenc2:false
          })
        }
      }
    })
    wx.request({
      url: app.BASE_URL.globelUrl+'/user/api/payments/state/1',
      method:'GET',
      data:{
        token,
        page:that.data.page,
        row:that.data.row
      },
      header:{
        "Content-Type": "application/json" 
      },
      success:(res)=>{
        // console.log(res)
        if(res.data.errmsg=='记录未查到'){
          that.setData({
            hiddend1:false,
            hiddend2:true
          })
        }else{
          that.setData({
            state1:res.data.payments,
            hiddend1:true,
            hiddend2:false
          })
        }
      }
    })
  },

   /**
     * 滑动切换tab
     */
    bindChange: function( e ) {
      var that = this;
      that.setData( { currentTab: e.detail.current });
    },
   /**
   * 点击tab切换
   */
  swichNav: function( e ) {
    var that = this;
    if( this.data.currentTab === e.target.dataset.current ) {
      return false;
    } else {
      that.setData( {
        currentTab: e.target.dataset.current
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
   var that=this;
   var page=that.data.page+1;
   that.setData({
     page:page
   })
   if(page<=that.data.totalPage){
    wx.showLoading({
      title:'加载中'
    })
   }
   wx.request({
     url: app.BASE_URL.globelUrl+'/user/api/payments',
     method:'GET',
     data:{
      from:'2020-12-01',
      to:'2020-12-31',
       token:that.data.token,
       page:that.data.page,
       row:that.data.row
     },
     header:{
       "Content-Type": "application/json" 
     },
     success:(res)=>{
       console.log(res)
       wx.hideLoading()
       that.setData({
        payments:that.data.payments.concat(res.data.payments),
       })
     }
    })
   wx.request({
      url: app.BASE_URL.globelUrl+'/user/api/payments/state/4',
      method:'GET',
      data:{
        from:'2020-12-01',
        to:'2020-12-31',
         token:that.data.token,
         page:that.data.page,
         row:that.data.row
      },
      header:{
        "Content-Type": "application/json" 
      },
      success:(res)=>{
        console.log(res)
       wx.hideLoading();
       that.setData({
        state4:that.data.state4.concat(res.data.payments),
       })
  }
    })
   wx.request({
      url: app.BASE_URL.globelUrl+'/user/api/payments/state/2',
      method:'GET',
      data:{
        from:'2020-12-01',
        to:'2020-12-31',
         token:that.data.token,
         page:that.data.page,
         row:that.data.row
      },
      header:{
        "Content-Type": "application/json" 
      },
      success:(res)=>{
        console.log(res)
        wx.hideLoading();
        that.setData({
         state2:that.data.state2.concat(res.data.payments),
        })
      }
    })
   wx.request({
      url: app.BASE_URL.globelUrl+'/user/api/payments/state/1',
      method:'GET',
      data:{
        from:'2020-12-01',
        to:'2020-12-31',
         token:that.data.token,
         page:that.data.page,
         row:that.data.row
      },
      header:{
        "Content-Type": "application/json" 
      },
      success:(res)=>{
        console.log(res)
        wx.hideLoading();
        that.setData({
         state1:that.data.state1.concat(res.data.payments),
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})