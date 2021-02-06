const app=getApp();
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    title:'充值明细',
    Url:'/pages/recharge/recharge',
    date:new Date().getMonth()+1,
    payments:[],
    page:1,
    totalPage:1,
    row:10,
    start:'',
    end:'',
    token:'',
    total_paid:0
  },
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
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that=this;
    var token=options.token;
    wx.request({
      url: app.BASE_URL.globelUrl+'/user/api/service/0/payments/',
      data:{
         token:token,
         page:that.data.page,
         row:that.data.row,
         service:1
      },
      header:{
       "Content-Type": "application/json"
      },
      success:(res)=>{
        console.log(res)
        var total=res.data.total;
        // var row=Number(res.data.row);
        // var update_time=res.data.payments[row-1].update_time;
        // var month=Number(update_time.slice(5,7))
        // console.log(month) 
        that.setData({
          token,
          payments:res.data.payments,
        })
        wx.request({
          url: app.BASE_URL.globelUrl+'/user/api/service/0/payments/',
          data:{
             token:token,
             service:1,
             page:1,
             row:total
          },
          header:{
           "Content-Type": "application/json"
          },
          success:(res)=>{
            console.log(res)
           if(res.data.errmsg!='记录未查到'){
            var start=res.data.payments[total-1].update_time.slice(0,7);
            var end=res.data.payments[0].update_time.slice(0,7);
            console.log(start,end)
            var totalPage=Math.ceil(total/that.data.row);
            console.log(totalPage)
            var arr1=res.data.payments
            var total_pay=0;
          for(var key in arr1){
              total_pay+=arr1[key].pay
          }
          var total_paid=total_pay.toFixed(2)
           that.setData({
            start,
            end,
            totalPage,
            total_paid
          });
           }
          }
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
    var that=this;
    var page=that.data.page+1;
    page<=that.data.totalPage 
    that.setData({
      page:page
    })
    if(page<=that.data.totalPage){
         wx.showLoading({
           title:'加载中'
         })
    }
    wx.request({
      url: app.BASE_URL.globelUrl+'/user/api/service/0/payments/',
      data:{
         from:'2020-12-01',
         to:'2020-12-31',
         token:that.data.token,
         service:1,
         page:that.data.page,
         row:that.data.row
      },
      header:{
       "Content-Type": "application/json"
      },
      success:(res)=>{
        console.log(res)
        // var row=Number(res.data.row);
        // var update_time=res.data.payments[row-1].update_time;
        // var month=Number(update_time.slice(5,7))
        // console.log(month) 
        wx.hideLoading()
        that.setData({
          payments:that.data.payments.concat(res.data.payments),
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