// pages/center/mineLabel/mineLabel.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
     userinfo:'',
     appUserInfo:{
        eyeing:10,
        fans:24,
     },
     application:[
        {
          img:'',
          name:'',
        }
     ],
     job:[
        {
           
        }
     ]
   },
   toEyeing:function(){

   },
   toFans:function(){

   },
   /**
    * 生命周期函数--监听页面加载
    */
   init :function(){
     this.setData({
        userinfo:wx.getStorageSync("userInfo"),
      //   appUserInfo: wx.getStorageSync("appUserInfo")
     })
     
   },
   onLoad: function (options) {
  
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
     this.init();
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