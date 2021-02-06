Component({
  data:{},
  options:{
    multipleSlots: true 
  },
  //组件的对外属性，是属性名到属性设置的映射表
  properties:{
    Url:{
      type:String,
      value:''
    },
    title:{
      type:String,
      value:'标题'
    },
  },
  //watch
  
  observers:{
    "title":function(title){
      console.log("title"+title)
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