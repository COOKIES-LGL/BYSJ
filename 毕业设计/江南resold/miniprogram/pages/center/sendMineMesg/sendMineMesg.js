import { cloudapi } from "../../cloud_api/api_center.js"
import { configData } from "../../config/configData.js/"
const cloudApi = new cloudapi
Page({

   /**
    * 页面的初始数据
    */
   data: {
     text:'',
     _id:'',
     message:
      {
         sender_openid:'',
         sender_avatarUrl:'',
         sender_nickName: '',
         receiver_openid:'',
         receiver_avatarUrl:'',
         receiver_nickName: '',
         messageList:[],
      },
   },

   bindInput: function (e) {
      this.setData({
         text: e.detail.value
      });
   },

   onSubmit: function (e) {
      var that = this;
      if (this.data.text == '') {
         wx.showToast({
            title: '亲，留言信息不能为空',
            icon: 'none',
         })
      } else {
         var up = "message.messageList";
         var time = (new Date()).toLocaleString();
         var param = {
            mesg: that.data.text,
            mesgType: "send",
            sendTime: time
         }
         var newList = this.data.message.messageList;
         newList.push(param);
         that.setData({
            [up]: newList,
         })
         wx.showLoading({
            title: '发送中',
         })
         var callback = function (res) {
            wx.hideLoading();
            that.setData({
               text: '',
               _id:res._id
            })
         }
         cloudApi.sendMessageList(this.data.message, callback,this.data._id);
      }
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      console.log(options);
      if(options.type=="send"){
         var up1 = "message.receiver_openid";
         var up2 = "message.receiver_avatarUrl";
         var up3 = "message.sender_openid";
         var up4 = "message.sender_avatarUrl";
         var up5 = "message.sender_nickName";
         var up6 = "message.receiver_nickName";
         this.setData({
            [up1]: options.openid,
            [up2]: options.avatarUrl,
            [up3]: wx.getStorageSync("OPENID"),
            [up4]: wx.getStorageSync("userInfo").avatarUrl,
            [up5]: wx.getStorageSync("userInfo").nickName,
            [up6]: options.nickName,
         })
         this.initData();
      } else if (options.type=="mineMesg"){
         var obj = wx.getStorageSync("currentDialogInfo");
         var up1 = "message.receiver_openid";
         var up2 = "message.receiver_avatarUrl";
         var up3 = "message.sender_openid";
         var up4 = "message.sender_avatarUrl";
         var up5 = "message.sender_nickName";
         var up6 = "message.receiver_nickName";
         var up7 = "message.messageList";
         this.setData({
            [up1]: obj.receiver_openid,
            [up2]: obj.receiver_avatarUrl,
            [up3]: obj.sender_openid,
            [up4]: obj.sender_avatarUrl,
            [up5]: obj.sender_nickName,
            [up6]: obj.receiver_nickName,
            [up7]: obj.messageList,
            _id: obj._id,

         })
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
   initData:function(){
      var that = this;
      var callback = function (res) {
         if(res.data.length>0){
            that.setData({
               _id: res.data[0]._id,
               message: res.data[0],
            })
         }
      }
      cloudApi.queryMessageList(this.data.message,callback);
   },
   onShow: function () {
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