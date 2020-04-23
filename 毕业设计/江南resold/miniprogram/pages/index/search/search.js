//index.js
const app = getApp()
import { Base } from '../../base/common.js';
import { configData } from "../../config/configData.js/"
import { cloudapi } from "../../cloud_api/api_index.js"
const cloudApi = new cloudapi
const base = new Base();

var touch = {
   startX: "",
   startY: "",
   endX: "",
   endY: ""
}
Page({

   data: {
      index: '',
      searchInput: '',
      hideSearch: false,
      if_phone_list: false,
      search_show_list: [],
      searchList: [],
      hasesellData: true,
      hasebookData: true,
      multiIndex: [0, 0],
      multiArray: [],
      options: [
         {
            img: '../../images/icon8.png',
            name: '教材资料'
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
      check1: "onchoiced",
      check2: "btn",
      toView: "demo1",
      book_order_items: [],
      sell_order_items: [],
      if_search_list: false,
      nosellListData: true,
      nobookListData: true,
      noListData: true,
      noData: true,
      param3: {
         searchMesg: "卖物",
         goodsName: '',
         pageSize: 6,
         pageNum: 0,
         goodsTitle: '教材课本',
      },
      param4: {
         searchMesg: "买物",
         goodsName: '',
         pageSize: 6,
         pageNum: 0,
         goodsTitle: '教材课本',
      }
   },
   init: function () {
      var up1 = "param3.pageNum";
      var up2 = "param4.pageNum";
      this.setData({
         [up1]: 0,
         [up2]: 0,
      });
      this.getsearchTips();
   },
  
   renderData: function (tag) {
      if(tag){
         if (wx.getStorageSync("searchSellOrderList").length > 0) {
            this.setData({
               sell_order_items: wx.getStorageSync("searchSellOrderList"),
               nosellListData: true
            })
         } else {
            this.setData({
               nosellListData: false,
               noListData: false,
            })
         }
      }
      if (wx.getStorageSync("searchBookOrderList").length > 0) {
         this.setData({
            book_order_items: wx.getStorageSync("searchBookOrderList"),
            nobookListData: true
         })
      } else {
         this.setData({
            nobookListData: false
         })
      }
   },
   getsearchTips: function () {
      var searchTextArr = configData[0].searchText;
      var searchtipArr = [];
      searchTextArr.find(function (item) {
         if (wx.getStorageSync("appUserInfo").length > 0) {
            if (item.college == wx.getStorageSync("appUserInfo")[0].college) {
               searchtipArr = item.searchtips;
            }
         }
      })
      if (searchtipArr.length > 0) {
         this.setData({
            search_show_list: searchtipArr
         })
         wx.setStorageSync("searchtipArr", searchtipArr);
      }
   },
   onPageScroll: function (e) {
      var that = this;
      clearTimeout(this.data.s_timer)
      this.data.s_timer = setTimeout(() => {
         that.setData({
            hideSearch: e.scrollTop >= 60 ? true : false,
            // fixTop: e.scrollTop >= 200 ? true : false,
         })
      }, 20)
   },
   seachAction:function(value){
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
         this.to_search(value,"firstLoad")
      }
   },
   bindInput: function (e) {
      var value = e.detail.value;
      if (value === "jndx") {
         wx.navigateTo({
            url: '../innerManager/ManagerHome/ManagerHome',
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
      this.to_search(bookValue,"firstLoad")
   },
   to_search: function (value,res) {
      var that = this;
      var callback3 = function (num, newData) {
         if (num == 0) {
            that.setData({
               noData: false,
               hasesellData: false,
            })
         }
         var up = "param3.pageNum";
         that.setData({
            [up]: num,
            sell_order_items: newData || that.data.sell_order_items
         });
         base.setTimeout(that.renderData,true);
      }
      var callback4 = function (num, newData) {
         if (num == 0) {
            that.setData({
               noData: false,
               hasebookData: false,
            })
         }
         var up = "param4.pageNum";
         that.setData({
            [up]: num,
            book_order_items: newData || that.data.book_order_items
         });
         base.setTimeout(that.renderData,false);
      }
      if (res == "firstLoad") {
         wx.setStorageSync("searchSellOrderList", []);
         wx.setStorageSync("searchBookOrderList", []);
         if (this.data.nosellListData) {
            this.data.param3.goodsName = value;
            cloudApi.getOrderList(this.data.param3, callback3);
         } else {
            wx.hideLoading();
         }
         if (this.data.nobookListData) {
            this.data.param4.goodsName = value;
            cloudApi.getOrderList(this.data.param4, callback4);
         } else {
            wx.hideLoading();
         }
      } else {
         if (this.data.toView == "demo1") {
            if (this.data.hasesellData) {
               cloudApi.getOrderList(this.data.param3, callback3);
            } else {
               wx.hideLoading();
            }
         } else {
            if (this.data.hasebookData) {
               cloudApi.getOrderList(this.data.param4, callback4);
            } else {
               wx.hideLoading()
            }
         }
      }
   },
   toDetail: function (event) {
      var order_id = base.getDataSet(event, "goodsid");
      var type = base.getDataSet(event, "type");
      wx.navigateTo({
         url: '../../detail/detail?id=' + order_id + "&&type=" + type,
      })
   },
   typeCheck: function (event) {
      var listtype = event.currentTarget.dataset.type;
      if (listtype === "物品发布") {
         this.setData({
            check1: "onchoiced",
            check2: "btn",
            toView: "demo1",
            noListData: this.data.nosellListData
         })
      } else {
         this.setData({
            check2: "onchoiced",
            check1: "btn",
            toView: "demo2",
            noListData: this.data.nobookListData
         })
      }
   },

   onShow: function () {
      wx.showLoading({
         title: '加载中',
      });
      this.init();
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.setData({
         multiArray: [configData[0].campus, configData[0].north_college]
      });
      console.log(options)
      if(options.searchText){
         this.setData({
            searchInput: options.searchText,
         })
         this.seachAction(options.searchText);
      }
   },
   navTo: function (e) {
      var Index = e.currentTarget.dataset.index;
      switch (Index) {
         case 0: wx.navigateTo({
            url: '../index/JCZL/JCZL',
         }); break;
         case 1: wx.navigateTo({
            url: '../index/QSYP/QSYP',
         }); break;
         case 2: wx.navigateTo({
            url: '../index/SFFW/SFFW',
         }); break;
         case 3: wx.navigateTo({
            url: '../index/QT/QT',
         }); break;
         default: break;
      }
   },
   rankList: function () {
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
   onPullDownRefresh: function () {
      wx.showLoading({
         title: '加载中..',
         mask: true,
      })
      this.init();
      this.loadData("firstLoad");
      wx.stopPullDownRefresh();
   },
   onReachBottom: function () {
      wx.showToast({
         title: '获取更多订单中',
         icon: 'loading',
         duration: 500
      });
      this._loadMoreData()
   },
   _loadMoreData: function () {
      this.to_search();
   },


   _notice: function () {//欢迎界面

   }

})
