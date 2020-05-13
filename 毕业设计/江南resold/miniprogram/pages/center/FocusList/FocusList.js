
import { Base } from '../../base/common.js';
const base = new Base();
Page({
   data: {
      dataList: [],
      noData: true,
      funcName: '',
      type: '',
   },
   toDetail: function (event) {
      var _openid = base.getDataSet(event, "goodsid");
      console.log(_openid);
      wx.navigateTo({
         url: '../showLabel/showLabel?openid=' + _openid+"&&type=List",
      })
   },
   setTitle: function (title) {
      wx.setNavigationBarTitle({
         title: title,
      })
   },
  
   onLoad: function (options) {
      if (options.type) {
         var param = options.type;
         console.log(param)
         this.setData({
            type:param
         })
         var value;
         if(param=="focused"){
            value = wx.getStorageSync("focusedList");
            wx.setNavigationBarTitle({
               title: '我的粉丝',
            })
         }else{
            value = wx.getStorageSync("focusList");
            wx.setNavigationBarTitle({
               title: '我的关注',
            })
         }
         if (value.length <= 0) {
            this.setData({
               noData: false,
            })
         }else{
            this.setData({
               dataList: value
            })
         }

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
   onShow: function () {
      // this.initData(this.data.type);
   },
})