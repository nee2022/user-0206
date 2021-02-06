const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: 0,
    token: '',
    tickets: [],
    deposit: 0,
    income: 0,
    score: 0,
    telephone: '',
     portrait:'',
     nickname:'',
    cards: [],
    plans: [],
    deals1: [],
    ports: [],
    start_time1: '',
    start_time2: '',
    soc: 0,
    hidden1: false,
    hiddena: false,
    hiddenb: true,
    none: true,
    hiddenb1: false,
    hidden: true,
    name: '登录/注册',
    src: '../static/user.png',
    plates: [],
    ids: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMyInfo: function (e) {
    // wx.login({
    //   success(res) {
    //     console.log(res);
    //     if (res.code) {
    //       // console.log(res.code);
    //       var code = res.code;
    //       wx.request({
    //         url: 'https://www.api.sqjtjt.com/user/api/token',
    //         method: "POST",
    //         header: {
    //           "Content-Type": "application/json"
    //         },
    //         data: {
    //           type: 4,
    //           appid: "wx659896642ff371ea",
    //           code: code,
    //         },
    //         success(res) {
    //           // console.log(res);
    //           // console.log(111)
    //           // console.log(res)
    //           if (res.data.error == 0) {
    //             let openid = res.data.openid;
    //             let token = res.data.token;
    //             let user = res.data.user
    //             //保存到客户端
    //             //做后期逻辑处理
    //             wx.setStorage({
    //               data: openid,
    //               key: 'openid',
    //             })
    //             wx.setStorage({
    //               data: token,
    //               key: 'token',
    //             })
    //             wx.setStorage({
    //               data: user,
    //               key: 'user',
    //             })
    //           } else {
    //             wx.removeStorage(
    //               {
    //                 key: 'openid',
    //                 success(res) {
    //                   //  console.log(res.data)
    //                 }
    //               },
    //               {
    //                 key: 'token',
    //                 success(res) {
    //                   // console.log(res.data)
    //                 }
    //               }
    //             )
    //           }
    //           // console.log(res.data)
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
    var token = wx.getStorageSync('token')
    var that = this;
    let info = e.detail.userInfo;
    var name = info.nickName;
    var src = info.avatarUrl
    var rawData = e.detail.rawData
    console.log(rawData)
    console.log(e.detail)
    console.log(info)
    that.setData({
      name,
      src
    })

    if (that.data.name == '登录/注册') {
      that.setData({
        hiddena: false,
        hiddenb: true
      })
    } else {
      that.setData({
        hiddena: true,
        hiddenb: false
      })
    }
    wx.request({
      url: app.BASE_URL.globelUrl + '/user/api/wechat/profile',
      method: 'PUT',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        token,
        data: rawData
      },
      success: (res) => {
        console.log(res)
      }
    })
  },
  getPhoneNumber: function (e) {
    var that = this;
    var token = wx.getStorageSync('token');
    var openid = wx.getStorageSync('openid');
    console.log(e.detail)
    console.log(token, openid)
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    console.log(encryptedData)
    console.log(iv)
    wx.request({
      url: app.BASE_URL.globelUrl + '/user/api/wechat/telephone',
      data: {
        token,
        data: encryptedData,
        iv: iv,
        appid: 'wx659896642ff371ea',
        openid
      },
      method: 'PUT',
      success: (res) => {
        console.log(res)
        var telephone1 = res.data.telephone;
        that.setData({
          telephone: telephone1,
          none: false,
          hiddenb: true
        })
      }
    })
  },
  deleteCar(e) {
    var ids = e.currentTarget.dataset.ids;
    console.log(ids);
    this.setData({
      ids
    })
    this.showModal();
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  abolish() {
    this.hideModal();
  },
  identificationCar(e) {
    var e = e.currentTarget.dataset.id;
    console.log(e)
    var color = e[0];
    var plate = e[1];
    wx.redirectTo({
      url: `/pages/identification_car/identification_car?color=${color}&plate=${plate}`,
    })
  },
  bindingCar() {
    wx.redirectTo({
      url: '/pages/binding_car/binding_car',
    })
  },
  buy_meal(e) {
    var e = e.currentTarget.dataset.info
    console.log(e)
    var text = e[1].slice(0, 1);
    var value = e[1].slice(1);
    var color = e[0]
    console.log(text, value, color)
    wx.setStorageSync('text', text);
    wx.setStorageSync('value', value);
    wx.setStorageSync('color', color);
    wx.redirectTo({
      url: '/pages/set_meal/set_meal?currentTab=1',
    })
  },
  remove_binding(e) {
    var that = this;
    wx.showModal({
      content: '您确定要解绑该车辆吗？',
      success(res) {
        if (res.confirm) {
          var ids = that.data.ids;
          var token = wx.getStorageSync('token');
          wx.request({
            url: app.BASE_URL.globelUrl + '/user/api/plates',
            method: 'DELETE',
            data: {
              ids: [ids],
              token
            },
            success: (res) => {
              if (res.data.error == 0) {
                wx.showToast({
                  title: '解绑成功',
                  icon: 'success',
                  duration: 1500,
                  success() {
                    that.plate();
                    that.hideModal();
                  }
                })
              } else {
                wx.showToast({
                  title: '解绑失败',
                  icon: 'error',
                  duration: 1500,
                  success() {
                    that.plate();
                    that.hideModal();
                  }
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('解绑失败');
          that.hideModal();
        }
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: (res) => {
        console.log(res)
        var amount = res.data.amount;
        var deposit = res.data.deposit;
        var income = res.data.income;
        var score = res.data.score;
        var name = res.data.nickname;
        if (name != '') {
          that.setData({
            name
          })
        }
        var telephone = res.data.telephone;
        if (telephone != '') {
          that.setData({
            telephone
          })
        }
        var src = res.data.portrait;
        that.setData({
          amount,
          deposit,
          income,
          score
        })
        if (telephone != '') {
          that.setData({
            none: false
          })
        }
        if (name != '' || src != '') {
          that.setData({
            hiddena: true
          })
        }
        if (src != '') {
          that.setData({
            src
          })
        }
      }
    })
    wx.getStorage({
      key: 'token',
      success: (res) => {
        //  console.log(res)
        that.setData({
          token: res.data
        })
        wx.request({
          url: app.BASE_URL.globelUrl + '/user/api/profile',
          method: 'GET',
          header: {
            "Content-Type": "application/json"
          },
          data: {
            token: that.data.token
          },
          success: (res) => {
            // console.log(res)
            var user = res.data.user
            that.setData({
              amount: user.amount,
              score: user.score,
              portait: user.score,
              username: user.username,
              telephone: user.telephone
            })
          }
        })
        wx.request({
          url: app.BASE_URL.globelUrl + '/user/api/assets',
          method: 'GET',
          data: {
            token: that.data.token
          },
          header: {
            "Content-Type": "application/json"
          },
          success: (res) => {
            // console.log(res);
            var tickets = res.data.tickets;
            var cards = res.data.cards;
            var plans = res.data.plans;
            this.setData({
              tickets,
              plans,
              cards
            })
          }
        })
        wx.request({
          url: app.BASE_URL.globelUrl + '/user/api/deals',
          method: 'GET',
          data: {
            token: that.data.token
          },
          header: {
            "Content-Type": "application/json"
          },
          success: (res) => {
            // console.log(res)
            var deals = res.data.deals;
            var deals1 = [];
            for (var key in deals) {
              if (deals[key].service == 13) {
                deals1.push(deals[key])
              }
              // console.log(deals1)
            }
            that.setData({
              deals1
            })
            if (deals1.length == 0) {
              that.setData({
                hidden1: false,
                hidden2: true
              })
            } else {
              that.setData({
                hidden1: true,
                hidden2: false
              })
            }
          }
        })
        var i = setInterval(() => {
          wx.request({
            url: app.BASE_URL.globelUrl + '/user/api/deals',
            method: 'GET',
            data: {
              token: that.data.token
            },
            header: {
              "Content-Type": "application/json"
            },
            success: (res) => {
              // console.log(res)
              var deals = res.data.deals;
              var deals1 = [];
              for (var key in deals) {
                if (deals[key].service == 13) {
                  deals1.push(deals[key])
                }
                // console.log(deals1)
              }
              that.setData({
                deals1
              })
              if (deals1.length == 0) {
                that.setData({
                  hidden1: false,
                  hidden2: true
                })
              } else {
                that.setData({
                  hidden1: true,
                  hidden2: false
                })
              }
            }
          })
        }, 5000)
        if (that.data.soc == 100) {
          clearInterval(i)
        }
        that.plate();
      }
    })
  },
  plate() {
    var that = this;
    wx.request({
      url: app.BASE_URL.globelUrl + '/user/api/plates',
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        token: that.data.token
      },
      success: (res) => {
        console.log(res);
        var plates = res.data.plates;
        that.setData({
          plates
        })
      }
    })
  },
  charge_end(e) {
    var e = e.currentTarget.dataset.end;
    console.log(e)
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定要结束充电吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.BASE_URL.globelUrl + '/user/api/charger/session',
            data: {
              token: that.data.token,
              dealno: e
            },
            header: {
              "Content-Type": "x-www-form-urlencoded"
            },
            method: 'DELETE',
            success: (res) => {
              //  console.log(res)
              console.log(1111)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  nav_process(e) {
    var e = e.currentTarget.dataset.process;
    var service = e[2];
    var deal_no = e[0];
    var pay = e[1];
    if (service == '13') {
      setTimeout(() => {
        wx.redirectTo({
          url: `/pages/bicycle_charge/bicycle_charge?dealno=${deal_no}&pay=${pay}`,
        })
      }, 1000);
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
    // console.log(1111)
    // var token = wx.getStorageSync('token');
    // console.log(token)

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