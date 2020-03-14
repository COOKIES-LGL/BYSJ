//index.js
const app = getApp()
import { Base } from '../base/common.js';
const base = new Base();

var touch={
   startX:"",
   startY:"",
   endX:"",
   endY:""
}
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    banner:['../../images/nav1.png','../../images/nav2.png'],
    index:'',
    searchInput:'',
    options:[
      {
       img:'../../images/icon8.png',
       name:'教材资料'
      },
      {
        img: '../../images/icon4.png',
        name: '寝室用品'
      },
      {
        img: '../../images/icon6.png',
        name: '三方服务'
      },
      {
        img: '../../images/icon5.png',
        name: '其它'
      },
    ],
    check1:"onchoiced",
    check2:"btn",
    toView:"demo1",
    order_items:[
      {
        id:'0',
        title:"书籍",
        price_max:20,
        price_min:15,
        image:"../../images/book1.png",
        remark:'完好如新',
        phone:"17766457213",
        time:"2019-2-2",
        type:"one",
      },
      {
        id:'1',
        title: "书籍2",
        price_max: 20,
        price_min: 15,
        image: "../../images/book2.png",
        remark: '完好如新',
        phone: "17766457213",
        time: "2019-2-2",
        type:'two',
      },
      {
        id: '3',
        title: "书籍2",
        price_max: 20,
        price_min: 15,
        image: "../../images/book2.png",
        remark: '完好如新',
        phone: "17766457213",
        time: "2019-2-2",
        type: 'two',
      },
      {
        id: '4',
        title: "书籍2",
        price_max: 20,
        price_min: 15,
        image: "../../images/book2.png",
        remark: '完好如新',
        phone: "17766457213",
        time: "2019-2-2",
        type: 'two',
      },
    ]
  },
  bindInput:function(e){
    var value = e.detail.value;
    if(value==="jndx"){
      wx.navigateTo({
        url: '../innerManager/ManagerHome/ManagerHome',
      })
    }else{
      this.setData({
        searchInput: value,
      })
      //执行搜索
    }

  },
  to_detail:function(event){
    var order_id=base.getDataSet(event,"id");
    console.log(order_id)
    wx.navigateTo({
      url: '../detail/detail?id='+order_id,
    })
  },
  typeCheck:function(event){
    var listtype = event.currentTarget.dataset.type;
    if(listtype==="物品发布"){
      this.setData({
        check1 : "onchoiced",
        check2 : "btn",
        toView: "demo1"
      })
    }else{
      this.setData({
        check2: "onchoiced",
        check1: "btn",
        toView: "demo2"
      })
    }
  },
  touchstart: function (event) { 
    touch.startX = event.touches[0].pageX;
    touch.startY= event.touches[0].pageY;
  },
  touchend: function (e) {
    var that = this;
    touch.endX = e.changedTouches[0].clientX;
    touch.endY = e.changedTouches[0].clientY;
    if (touch.endX - touch.startX > 50 && Math.abs(touch.endY - touch.startY) < 50) {      //右滑
      that.setData({
        check2: "btn",
        check1: "onchoiced",
        toView: "demo1"
      })
    } else if (touch.endX - touch.startX < -50 && Math.abs(touch.endY - touch.startY) < 50) {   //左滑
      that.setData({
        check2: "onchoiced",
        check1: "btn",
        toView: "demo2"
      })
    }
  },
  _reloadData:function(){

  },
  loadData:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  navTo:function(e){
     var Index = e.currentTarget.dataset.index;
     switch(Index){
       case 0: wx.navigateTo({
         url: '../index/JCZL/JCZL',
       });break;
       case 1: wx.navigateTo({
         url: '../index/QSYP/QSYP',
       }); break;
       case 2: wx.navigateTo({
         url: '../index/SFFW/SFFW',
       }); break;
       case 3: wx.navigateTo({
         url: '../index/QT/QT',
       }); break;
       default:break;
     }
  },
  rankList:function(){
      wx.navigateTo({
        url: '../rankList/rankList',
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

  onReachBottom: function () {
    wx.showToast({
      title: '获取更多订单中',
      icon: 'loading',
      duration: 500
    });
    if (this.data.end == false)
    this._loadMoreData()
  },
  _loadMoreData: function () {
    var page = this.data.nowPaginate + 1;
    this.setData({
      nowPaginate: page,
    })
    this._reloadData()
  },
  _reloadData: function () {  //TODO:向服务器发送相关筛选项，获取新的数据
    this._loadData()
  },
  onPullDownRefresh: function (e) {
    this.setData({
      nowPaginate: 1
    })
    wx.showNavigationBarLoading()
    this._reloadData()
    setTimeout(function () { }, 1000)
    wx.stopPullDownRefresh()
  },

  onShow: function () {  
    wx.showLoading({
      title: '加载中',
    });
    this._loadData();
    this._notice();
    let res = wx.getSystemInfoSync()
    wx.setStorageSync('height', res.screenHeight)
  },
  _loadData:function(){//加载数据
    wx.hideLoading();
  },
  _notice:function(){//欢迎界面

  }

})
