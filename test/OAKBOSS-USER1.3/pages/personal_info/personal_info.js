// pages/personal_info/personal_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     title:"个人信息",
     Url:'/pages/personal_center/pensonal_center',
     aimgurl: "", // //临时图片的路径
     countIndex: 1, // 可选图片剩余的数量
     imageData: [] // 所选上传的图片数据
  },
 /*图片浏览及上传 */
 takephoto: function(e) {
  let that = this;
  wx.showActionSheet({
    itemList: ['拍照','从相册中选择' ],
    itemColor: "#000",
    success: function(res) {
      if (!res.cancel) {
        if (res.tapIndex == 0) {
          that.chooseWxImage('camera');
        } else if (res.tapIndex == 1) {
          that.chooseWxImage('album');
        }
      }
    }
  })
},
 /*打开相册、相机 */
 chooseWxImage: function(type) {
  let that = this;
  wx.chooseImage({
    count: that.data.countIndex,
    sizeType: ['original', 'compressed'],
    sourceType: [type],
    success: function(res) {
      // 选择图片后的完成确认操作
      that.setData({
        aimgurl: res.tempFilePaths
      });
      console.log(that.data.aimgurl);
    }
  })
},
/**上传：图片到服务器 */
upLoadImgFun: function(tempFilePathsData) {
  let that = this;
  let orderCommentMaterial = []; // 每次选择添加的图片并上传到服务器后的图片信息
  tempFilePathsData.forEach((item, index) => {
    wx.uploadFile({
      url: HTTP.uploadFileUrl(), // 上传服务器的后台请求接口地址
      filePath: item, // 要上传的图片数据对象
      name: 'file', // 上传类型
      header: {
        'content-Type': 'multipart/form-data' // 此处加上，用form表单的格式传
      },
      // 要携带的参数
      formData: {
        "systemCode": "aaa",
        "belongCode": "cccccc",
        "belongID": "123456"
      },
      success(res) {
        console.log(res);
      },
      fail(err) {
        console.log(err);
      },
      complete(all) {
        console.log(all);
      }
    });
  });
},
  onLoad: function(options){
 
  }
  // pic(e){
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType:["originail","compressed"],//可以指定是原图还是压缩图，默认二者都有
  //     sourceType:["album","camera"],//可以指定来源是相册还是相机，默认二者都有
  //     success:function(res){
  //       //返回选定照片的本地文件路径，tempFilePath可以作为img标签的src属性显示图片
  //       var tempFilePaths=res.tempFilePaths
  //     }
  //   })
  // },
  // fail:function(res){
  //   console.log(res.errMsg)
  // },
  //  //点击我显示底部弹出框
  //  clickshow: function () {
  //   this.showModal();
  // },

  // //显示对话框
  // showModal: function () {
  //   // 显示遮罩层
  //   var animation = wx.createAnimation({
  //     duration: 100,
  //     timingFunction: "linear",
  //     delay: 0
  //   })
  //   this.animation = animation
  //   animation.translateY(300).step()
  //   this.setData({
  //     animationData: animation.export(),
  //     showModalStatus: true
  //   })
  //   setTimeout(function () {
  //     animation.translateY(0).step()
  //     this.setData({
  //       animationData: animation.export()
  //     })
  //   }.bind(this), 200)
  // },
  // //隐藏对话框
  // hideModal: function () {
  //   // 隐藏遮罩层
  //   var animation = wx.createAnimation({
  //     duration: 200,
  //     timingFunction: "linear",
  //     delay: 0
  //   })
  //   this.animation = animation
  //   animation.translateY(300).step()
  //   this.setData({
  //     animationData: animation.export(),
  //   })
  //   setTimeout(function () {
  //     animation.translateY(0).step()
  //     this.setData({
  //       animationData: animation.export(),
  //       showModalStatus: false
  //     })
  //   }.bind(this), 200)
  // }
})