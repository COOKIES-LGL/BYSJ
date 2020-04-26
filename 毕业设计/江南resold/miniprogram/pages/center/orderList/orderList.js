// pages/center/orderList/orderList.js
import { cloudapi } from "../../cloud_api/api_center.js";
import { Base } from '../../base/common.js';
const base = new Base();
const cloudApi = new cloudapi();
Page({
   data: {
      dataList:[],
      param: {
         searchMesg: "卖物",
         goodsStatus:0,
         pageSize: 6,
         pageNum: 0
      },
      noData:true,
      funcName:'',
      type:'',
   },
   toDetail: function (event) {
      var order_id = base.getDataSet(event, "goodsid");
      var type = base.getDataSet(event, "type");
      wx.navigateTo({
         url: './detail/detail?id=' + order_id + "&&type=" + type,
      })
   },
   loadData: function (res,tag) {
      var that = this;
      var callback1 = function (num, newData) {
         if (num == '0') {
            that.setData({
               noData:false
            })
         }
         var up = "param.pageNum";
         that.setData({
            [up]: num,
            dataList: newData || that.data.dataList
         });
      }
      if (tag == "firstLoad") {
         wx.setStorageSync("selfOrderList", []);
         var up = "param.pageNum";
         that.setData({
            dataList:[],
            [up]: 0,
         });
         cloudApi[that.data.funcName](that.data.param, callback1);
         wx.hideLoading(); 
      } else {
         if (that.data.noData) {
            cloudApi[that.data.funcName](that.data.param, callback1);
         } else {
            wx.hideLoading();
         }
      }

   },
   /**
    * 生命周期函数--监听页面加载
    */
   setTitle:function(title){
      wx.setNavigationBarTitle({
         title: title,
      })
   },
   initData:function(param){
      var that = this;
      var tag = "firstLoad"
      console.log(param);
      switch (param) {
         case "my_order": that.data.funcName = "getSelfOrderList"; that.setTitle("当前买入预约");
            that.data.param.searchMesg = "买物"; this.loadData(param, tag); break;
         case "my_sender": that.data.funcName = "getSelfOrderList"; that.setTitle("当前卖出发布");
            that.data.param.searchMesg = "卖物"; this.loadData(param, tag); break;
         case "my_history_order": that.setData({
            param: {
               goodsStatus: 2,
               pageSize: 6,
               pageNum: 0
            }
         }); that.setTitle("历史发单");
            that.data.funcName = "getHistoryOrderList1";
            this.loadData(param, tag); break;
         case "my_history_sender": that.setData({
            param: {
               goodsStatus: 2,
               pageSize: 6,
               pageNum: 0
            }
         }); that.setTitle("历史接单");
            that.data.funcName = "getHistoryOrderList1";
            this.loadData(param, tag); break;
         case 'selfReceive': that.data.funcName = "getOrderIng"; that.setTitle("我的接单");
            this.loadData(param, tag); break;
         default: break;
      } 
   },
   onLoad: function (options) {
      wx.showLoading({
         title: '加载中',
      })
      var param = options.type;
      this.setData({
         type: param,
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
      this.initData(this.data.type);
   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {
      wx.showLoading({
         title: '加载中..',
         mask: true,
      })
      this.init();
      this.loadData("firstLoad");
      wx.stopPullDownRefresh();
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {
      wx.showLoading({
         title: '加载中...',
      })
      this.loadData()
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})