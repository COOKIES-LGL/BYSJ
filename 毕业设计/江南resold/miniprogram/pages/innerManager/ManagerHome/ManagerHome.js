import * as echarts from '../../../ec-canvas/echarts';
import { pieOption, initChart } from './func.js';
// pages/innerManager/ManagerHome/ManagerHome.js
Page({
   data: {
      ec: {
         onInit: initChart(pieOption)
      }
   },
  /**
   * 生命周期函数--监听页面加载
   */
   initOptions: function () {
      pieOption.series[0].data = [
         { value: 55, name: '北京' },
         { value: 20, name: '武汉' },
         { value: 10, name: '杭州' },
         { value: 20, name: '广州' },
         { value: 38, name: '上海' }
      ];
   },

   onLoad: function (options) {
      this.initOptions();
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