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
    var that =this; 
    var id = options.id;
    var type = options.type;
    var type = type =="买物"?"bookOrderList":"sellOrderList";
    var goods = wx.getStorageSync(type);
    var good;
    for(var i=0;i<goods.length;i++){
       if (goods[i]._id == id) {
          good = goods[i];
          that.setData({
             good:good
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