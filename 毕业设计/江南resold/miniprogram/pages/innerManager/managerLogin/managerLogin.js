// pages/login/login.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      number: "66666666",
      code: "666666",
      school: " ",
      multiArray2: ["江南大学", "××××××大学", "××××大学", "××××大学", "××××××大学", "××××大学", "××××××大学"],
   },
   bindMultiPickerChange2: function (e) {
      console.log('picker发送选择改变,携带值为', e.detail.value)
      this.setData({
         multiIndex2: e.detail.value,
         changed2: true,
         school: this.data.multiArray2[e.detail.value]
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

   },
   login: function () {
      wx.showLoading({
         title: '加载中。。。',
      })
      if (this.data.input2) {
         console.log(this.data.input1, this.data.input2, this.data.school)
         if (this.data.input2 == this.data.code) {
            if (this.data.school == " ") {
               wx.showModal({
                  title: '提示',
                  content: '请选择您的学校'
               })
            } else {
               wx.hideLoading();
               wx.redirectTo({
                  url: '../ManagerHome/ManagerHome?school=' + this.data.school,
               })
            }
         } else {
            wx.showModal({
               title: '提示',
               content: '学号或密码不存在'
            })
         }

      } else {
         wx.showToast({
            title: '请输入登陆信息',
            icon: 'none'
         })
      }
   },
   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   // check_number: function (e) {
   //    var value = e.detail.value;
   //    value = value.split("");
   //    if (value.length != 8) {
   //       wx.showToast({
   //          title: '学号格式错误',
   //       })
   //    } else {
   //       this.setData({
   //          input1: value.join('')
   //       })
   //    }
   // },
   check_psd: function (e) {
      var value = e.detail.value;
      value = value.split("");
      if (!value) {
         wx.showToast({
            title: '密码不能为空',
         })
      } else {
         this.setData({
            input2: value.join("")
         })
      }
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