// pages/center/center.js
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