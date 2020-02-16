//index.js
const app = getApp()
import { Base } from '../base/common.js';
const base = new Base();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[
      '全部发布',
      "需求发布",
      "旧物发布",
      ],
    banner:['../../images/nav1.png','../../images/nav2.png'],
    index:'',
    options:[
      {
       img:'../../images/icon8.png',
       name:'教材课本'
      },
      {
        img: '../../images/icon7.png',
        name: '试卷资料'
      },
      {
        img: '../../images/icon2.png',
        name: '运动器材'
      },
      {
        img: '../../images/icon9.png',
        name: '官方发布'
      },
      {
        img: '../../images/icon3.png',
        name: '数码产品'
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
    ]
  },
  to_detail:function(event){
    var order_id=base.getDataSet(event,"id");
    console.log(order_id)
    wx.navigateTo({
      url: '../detail/detail?id='+order_id,
    })
  },
  bindPickerType:function(e){
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value,
        Changed: true
      })
      this._reloadData()
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
  nav_sort:function(){
  wx.navigateTo({
    url: '../sort/sort',
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
