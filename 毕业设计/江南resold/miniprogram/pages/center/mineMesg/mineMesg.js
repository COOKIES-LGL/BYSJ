import { cloudapi } from "../../cloud_api/api_center.js"
const cloudApi = new cloudapi
import { Base } from '../../base/common.js';
const base = new Base();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      sendmesgList:[],
      receivemesgList: [],
   },

   navTo:function(event){
      var _id = base.getDataSet(event, "id");
      var array = this.data.sendmesgList.concat(this.data.receivemesgList);
      for(var i=0;i<array.length;i++){
         if(array[i]._id==_id){
            wx.setStorageSync("currentDialogInfo",array[i]);
            wx:wx.navigateTo({
               url: '../sendMineMesg/sendMineMesg?type=mineMesg',
            });
            break;
         }
      }
   },
   initData:function(){
      var that = this;
      var callback1 = function (res) {
         console.log(res);
         if (res.data.length > 0) {
            that.setData({
               sendmesgList: res.data
            })
         }
      }
      var callback2 = function (res) {
         console.log(res);
         if (res.data.length > 0) {
            that.setData({
               receivemesgList: res.data
            })
         }
      }
      cloudApi.querySendMessage(callback1);
      cloudApi.queryRecceiveMessage(callback2);
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
     this.initData();
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