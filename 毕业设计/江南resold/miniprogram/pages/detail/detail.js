// pages/center/center.js

import { cloudapi } from "../cloud_api/api_delOrder.js"
const cloudApi = new cloudapi;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: {},
    id:'',
    type:'',
    forbidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this; 
    var id = options.id;
    var type = options.type;
    var orderType;
    if (type =="orderList"){
      orderType = "hisOrderList",
      this.setData({
         forbidden:true
      })
    }else{
      orderType= type == "买物" ? "bookOrderList" : "sellOrderList";
    }
    var goods = wx.getStorageSync(orderType);
    var good;
    for(var i=0;i<goods.length;i++){
       if (goods[i]._id == id) {
          good = goods[i];
          that.setData({
             good:good,
             id: id,
             type: type
          })
          break;
       }
    }
    console.log(good);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     wx.showShareMenu();
  },
   previewImage: function (e) {//预览图片
      var current = this.data.good.goodsImage[0];
      wx.previewImage({
         current: current, // 当前显示图片的http链接
         urls: this.data.good.goodsImage // 需要预览的图片http链接列表
      })
   },
   navshowLabel:function(){
      if(this.data.forbidden){
         return;
      }else{
         wx.navigateTo({
            url: '../center/showLabel/showLabel?openid=' + this.data.good.sender_openid,
         })
      }
   },
   bingo:function(){
     wx.showLoading({
        title: '预约中',
     })
     var that = this;
     var userInfo = wx.getStorageSync("userInfo");
     var time = new Date();
     var param = {
        _id: that.data.good._id,
        sender_openid: that.data.good.sender_openid,
        receive_openid: wx.getStorageSync("appUserInfo")[0]._openid,
        receiver_gender: userInfo.gender,
        receiver_avatarUrl: userInfo.avatarUrl,
        receiver_nickname: userInfo.nickName,
        receiverTime:time.toLocaleString()
     }
     var callback =function(){
        wx.showToast({
           title: '预约成功！',
        })
        setTimeout(function(){
           wx.redirectTo({
              url: '../center/orderList/orderList?type=selfReceive',
           })
        },500);
     }
     cloudApi.bingoOrder(param,callback);
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
})