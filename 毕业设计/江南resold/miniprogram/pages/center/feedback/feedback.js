import { cloudapi } from "../../cloud_api/api_center.js"
import { configData } from "../../config/configData.js/"
const cloudApi = new cloudapi
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subLists:[
        '隐私泄露','交易失败','平台Bug','优化建议'
        ],
    text:''
  },

  bindInput: function (e) {
      this.setData({
          text: e.detail.value
      });
  },

  onAddInfo: function(e) {
      let id = e.currentTarget.dataset.id
      console.log(this.data.subLists[id])
      this.setData({
          text: this.data.text + this.data.subLists[id]+'，'
      })

  },

  onSubmit: function(e) {
       var that = this;
      if(this.data.text==''){
        wx.showToast({
          title: '亲，反馈信息不能为空',
          icon:'none',
        })
      }else{
         wx.showLoading({
            title: '提交中',
         })
         var callback=function(){
            wx.hideLoading();
            wx.showToast({
               title: '提交成功',
            })
            that.setData({
               text:'',
            })
         }
         var param={
            detail: this.data.text,
            senderNickname:wx.getStorageSync("userInfo").nickName,
            senderGender: wx.getStorageSync("userInfo").gender,
            senderimageUrl: wx.getStorageSync("userInfo").avatarUrl,
            senderPhone:wx.getStorageSync("appUserInfo")[0].phone,
         }
         cloudApi.sendFeedback(param,callback);
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
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