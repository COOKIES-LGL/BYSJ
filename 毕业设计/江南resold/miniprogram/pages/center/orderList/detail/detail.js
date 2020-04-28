// pages/center/center.js
import { cloudapi } from "../../../cloud_api/api_delOrder.js"
const cloudApi = new cloudapi;
Page({

   /**
    * 页面的初始数据
    */
   data: {
      good: {
      }
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      var that = this;
      var id = options.id;
      var type = options.type;
      var goods = wx.getStorageSync("selfOrderList");
      console.log(goods);
      for (var i = 0; i < goods.length; i++) {
         if (goods[i]._id == id) {
            that.setData({
               good: goods[i]
            })
            break;
         }
      }
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },
   previewImage: function (e) {
      var current = this.data.good.goodsImage[0];
      wx.previewImage({
         current: current, // 当前显示图片的http链接
         urls: this.data.good.goodsImage // 需要预览的图片http链接列表
      })
   },
   cancalOrder:function(){
      wx.showLoading({
         title: '取消预约中',
      })
      var that = this;
      var userInfo = wx.getStorageSync("userInfo");
      var param = {
         _id: that.data.good._id,
         sender_openid: that.data.good.sender_openid,
         receive_openid: "",
         receiver_gender: "",
         receiver_avatarUrl: "",
         receiver_nickname: "",
         receiverTime:'',
      }
      var callback = function () {
         wx.showToast({
            title: '已取消预约！',
         })
         setTimeout(function () {
            wx.navigateBack({
               delta: 1
            })
         }, 500);
      }
      cloudApi.cancelOrder(param, callback);
   },
   finishOrder:function(){
      wx.showLoading({
         title: '完结订单中',
      })
      var that = this;
      var time = new Date();
      var userInfo = wx.getStorageSync("userInfo");
      var param = {
         _id: that.data.good._id,
         sender_openid: that.data.good.sender_openid,
         finishTime:time.toLocaleString()
      }
      var callback = function () {
         wx.showToast({
            title: '订单已完结！',
         })
         setTimeout(function () {
            wx.redirectTo({
               url: '../../payPage/payPage',
            })
         }, 200);
      }
      cloudApi.finishOrder(param, callback);
   },

   deleteOrder: function () {
      wx.showLoading({
         title: '取消订单中',
      })
      var that = this;
      var userInfo = wx.getStorageSync("userInfo");
      var param = {
         _id: that.data.good._id,
         sender_openid: that.data.good.sender_openid,
         goodsImage:that.data.good.goodsImage,
      }
      var callback = function () {
         wx.showToast({
            title: '订单已取消！',
         })
         setTimeout(function () {
            wx.navigateBack({
               delta: 1
            })
         }, 500);
      }
      cloudApi.deleteOrder(param, callback);
   },
   freeTell: function () {//拨打电话

      wx.makePhoneCall({

         phoneNumber: this.data.good.goodsphone,

      })

   },
   freeCopy: function (e) {
      wx.setClipboardData({
         data: this.data.good.goodswechat,
         success: function (res) {
            wx.getClipboardData({
               success: function (res) {
                  wx.showToast({
                     title: '微信号已复制'
                  })
               }
            })
         }
      })
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