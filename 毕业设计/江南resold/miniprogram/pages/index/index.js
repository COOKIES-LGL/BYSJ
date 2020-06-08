//index.js
const app = getApp()
import { Base } from '../base/common.js';
import { configData } from "../config/configData.js/"
import { cloudapi } from "../cloud_api/api_index.js"
import { cloudapi as managerapi } from "../cloud_api/api_manager.js"
const managerApi = new managerapi();
const cloudApi = new cloudapi
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
    banner:[],
    index:'',
    searchInput:'',
    hideSearch:false,
    if_phone_list: false,
    search_show_list: [],
    searchList:[],
    hasesellData:true,
    hasebookData:true,
    options:[
      {
       img:'../../images/icon8.png',
       name:'教材课本'
      },
      {
        img: '../../images/icon4.png',
        name: '考研资料'
      },
      {
        img: '../../images/icon6.png',
         name: '寝室用品'
      },
      {
        img: '../../images/icon5.png',
        name: '其它'
      },
    ],
    check1:"onchoiced",
    check2:"btn",
    toView:"demo1",
    book_order_items:[],
    sell_order_items:[],
    if_search_list:false,
    nosellListData:true,
    nobookListData:true,
    noListData:true,
    param1 : {
      searchMesg: "卖物",
      pageSize: 6,
      pageNum: 0
    },
    param2 : {
      searchMesg: "买物",
      pageSize: 6,
      pageNum: 0
    },
     param3: {
      searchMesg: "卖物",
      goodsName:'',
      pageSize: 6,
      pageNum: 0
     },
     param4: {
      searchMesg: "买物",
      goodsName: '',
      pageSize: 6,
      pageNum: 0
     }
  },
  init:function(){
     var up1 = "param1.pageNum";
     var up2 = "param2.pageNum";
     this.setData({
        [up1]: 0,
        [up2]: 0,
        hasesellData:true,
        hasebookData:true,
     });
     this.getsearchTips();
     
  },
  renderData:function(tag){
      if(tag){
         if (wx.getStorageSync("sellOrderList").length > 0) {
            this.setData({
               sell_order_items: wx.getStorageSync("sellOrderList"),
               nosellListData: true
            })
         } else {
            this.setData({
               nosellListData: false,
               noListData: false
            })
         }
      }

      if(wx.getStorageSync("bookOrderList").length>0){
         this.setData({
            book_order_items: wx.getStorageSync("bookOrderList"),
            nobookListData: true
         })
      }else{
         this.setData({
            nobookListData: false
         })
      }
  },
  getsearchTips:function(){
     var searchTextArr = configData[0].searchText;
     var searchtipArr = [];
     searchTextArr.find(function (item) {
        if (wx.getStorageSync("appUserInfo").length>0){
           if (item.college == wx.getStorageSync("appUserInfo")[0].college) {
              searchtipArr = item.searchtips;
           }
        }
     })
     if (searchtipArr.length>0){
        this.setData({
           search_show_list: searchtipArr
        })
        wx.setStorageSync("searchtipArr", searchtipArr);
     }
  },

   onPageScroll: function (e) {
      var that =this;
      clearTimeout(this.data.s_timer)
      this.data.s_timer = setTimeout(() => {
         that.setData({
            hideSearch: e.scrollTop >= 60 ? true : false,
            // fixTop: e.scrollTop >= 200 ? true : false,
         })
      }, 20)
      
   },
   tapschool:function(){
      wx.showModal({
         title: '提示',
         content: '亲,马上就会有更多的学校加入我们啦!请耐性等待！',
      })
   },
   seachAction: function (value) {
      var searchList = [];
      if (!value) { searchList = []; return; }
      this.data.search_show_list.find(function (item) {
         if (item.indexOf(value) == 0) {
            searchList.push(item);
         }
      })
      if (searchList.length > 0) {
         this.setData({
            if_search_list: true,
            searchList: searchList
         })
      } else {

      }
   },
   bindblur: function (e) {
      var that = this;
      var value = e.detail.value;
      if(value){
         setTimeout(function () { that.to_search(value);},300);
      }
   },
   to_search: function (value) {
      wx.navigateTo({
         url: './search/search?searchText=' + value,
      })
   },
   item_search_click: function (event) {
      var bookValue = base.getDataSet(event, "id");
      this.setData({
         searchInput: bookValue,
         if_search_list: false,
      })
      wx.navigateTo({
         url: './search/search?searchText=' + bookValue,
      })
   },
   bindInput: function (e) {
      var value = e.detail.value;
      if (value === "manager") {
         wx.navigateTo({
            url: '../innerManager/managerLogin/managerLogin',
         })
      } else {
         this.seachAction(value);
      }
   },
   item_search_click: function (event) {
      var bookValue = base.getDataSet(event, "id");
      this.setData({
         searchInput: bookValue,
         if_search_list: false,
      })
      this.to_search(bookValue)
   },
  toDetail:function(event){
    var order_id=base.getDataSet(event,"goodsid");
    var type = base.getDataSet(event,"type");
    wx.navigateTo({
      url: '../detail/detail?id='+order_id+"&&type="+type,
    })
  },
  typeCheck:function(event){
    var listtype = event.currentTarget.dataset.type;
    if(listtype==="物品发布"){
      this.setData({
        check1 : "onchoiced",
        check2 : "btn",
        toView: "demo1",
        noListData:this.data.nosellListData
      })
    }else{
      this.setData({
        check2: "onchoiced",
        check1: "btn",
        toView: "demo2",
         noListData: this.data.nobookListData
      })
    }
  },
  // catchtouchstart='touchstart' catchtouchend='touchend' 加到scrollview
//   touchstart: function (event) { 
//     touch.startX = event.touches[0].pageX;
//     touch.startY= event.touches[0].pageY;
//   },
//   touchend: function (e) {
//     var that = this;
//     touch.endX = e.changedTouches[0].clientX;
//     touch.endY = e.changedTouches[0].clientY;
//     if (Math.abs(touch.endX - touch.startX)<5){
//       that.toDetail(e);
//     }else if (touch.endX - touch.startX > 50 ) {      //右滑
//       that.setData({
//         check2: "btn",
//         check1: "onchoiced",
//         toView: "demo1",
//          noListData: this.data.nosellListData
//       })
//     } else if (touch.endX - touch.startX < -50 ) {   //左滑
//       that.setData({
//         check2: "onchoiced",
//         check1: "btn",
//         toView: "demo2",
//         noListData: this.data.nobookListData
//       })
//     }
//   },
   onShow: function () {
      wx.showLoading({
         title: '加载中',
      });
      this.loadData("firstLoad"); 
      this.init();
      let res = wx.getSystemInfoSync()
      wx.setStorageSync('height', res.screenHeight)//获取屏幕高度
   },
  loadData:function(res){
      var that = this;
      var callback1 = function(num,newData){
         console.log(newData);
         if(num==0){
            that.data.noData = false;
            that.data.hasesellData = false;
         }
         var up = "param1.pageNum";
         that.setData({
            [up]: num,
            sell_order_items: newData||that.data.sell_order_items
         });
         base.setTimeout(that.renderData,true);
      }
      var callback2 = function (num,newData) {
         console.log(newData);
         if (num == 0) {
            that.data.noData = false;
            that.data.hasebookData = false; 
         }
         var up = "param2.pageNum";
         that.setData({
            [up]: num,
            book_order_items: newData||that.data.book_order_items
         });
         base.setTimeout(that.renderData,false);
      }
      if (res == "firstLoad") {
         wx.setStorageSync("sellOrderList", []);
         wx.setStorageSync("bookOrderList", []);
         if (this.data.nosellListData) {
            cloudApi.getOrderTypeList(this.data.param1, callback1);
         }else{
            wx.hideLoading();
         }
         if (this.data.nobookListData) {
            cloudApi.getOrderTypeList(this.data.param2, callback2);
         } else {
            wx.hideLoading();
         }
      } else {
         if(this.data.toView=="demo1"){
            if (this.data.hasesellData){
               cloudApi.getOrderTypeList(this.data.param1, callback1);
            }else{
               wx.hideLoading();
            }
         }else{
            if (this.data.hasebookData){
               cloudApi.getOrderTypeList(this.data.param2, callback2);
            }else{
               wx.hideLoading()
            }
         }
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that =this;
     this._notice();
     var callback = function(res){
        var imageList = res[0].imageUrl;
        that.setData({//初始化轮播图
           banner: imageList.length > 0 ? imageList : ['../../images/nav1.png', '../../images/nav2.png']
        })
     }
     managerApi.queryNavImages(callback);
  },
  navTo:function(e){
     var Index = e.currentTarget.dataset.index;
     console.log(Index);
     switch(Index){
       case 0: wx.navigateTo({
         url: '../index/JCZL/JCZL',
       });break;
       case 1: wx.navigateTo({
           url: '../index/SFFW/SFFW',
       }); break;
       case 2: wx.navigateTo({
           url: '../index/QSYP/QSYP',
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },
  onPullDownRefresh:function(){
     wx.showLoading({
        title: '加载中..',
        mask: true,
     })
     this.init();
     this.loadData("firstLoad");
     wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    wx.showLoading({
       title: '载入更多',
    })
    this._loadMoreData()
  },
  _loadMoreData: function () {
    this.loadData();
  },


  _notice:function(){//欢迎界面

  }

})
