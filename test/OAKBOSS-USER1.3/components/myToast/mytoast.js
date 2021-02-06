Component({
  data:{},
  //组件的对外属性，是属性名到属性设置的映射表
  properties:{
    message:{
      type:String,
      value:""
    }
  },
  //watch
  observers:{
    "message":function(title){
      console.log("message"+title)
    }
  },
  lifetimes:{
    //组件的生命周期
    attached:function(){

    },
    moved:function(){

    },
    detached:function(){

    }
  },
  pageLifetimes:{
     // 组件所在页面的生命周期函数
     show: function () { },
     hide: function () { },
     resize: function () { },
  }
})