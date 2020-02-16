// pages/center/center.js
import {Base} from "../base/common.js"
const base = new Base;
Page({

  /**
   * 页面的初始数据
   */
  data: {
        user:{
          image:"../../images/user-unlogin.png",
          nickname:"年少有为",
        },
        show_alert:false,
        alert:{
          show_alert: false,
          show_btn: true,
          title: "是否授权登陆？",
          cancel_text: "取消",
          submit_text: "同意",
        }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  turndown: function (a, b, c, d, e) {
    this.setData({
      alert: {
        show_alert: a,
        show_btn: b,
        title: c,
        cancel_text: d,
        submit_text: e,
      }
    })
  },
  checkstate:function(){//检测是否授权
    var state=wx.getStorageSync("userInfo");
    console.log(state);
    if(state=="" || undefined){
      this.turndown(true, true, "是否授权登陆？", "取消", "同意");
    }
  },
  
  bind_ok:function(){
    this.turndown(false, true, "是否授权登陆？","取消","同意");
  },
  bind_cancel:function(){
    this.turndown(false, true, "是否授权登陆？", "取消", "同意");

  },
  bindGetUserInfo:function(){
    this.turndown(false, true, "是否授权登陆？", "取消", "同意");
    var that=this
      wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
  
          wx.getUserInfo({
            success(res) {
              console.log(res);
              const userInfo = res.userInfo
              wx.setStorageSync("userInfo", userInfo);
              that.insert_user();
            }
          })
        }
      }
    })
  },
  insert_user:function(){
    var DATE = base.formatDate(new Date());
    const db = base.setdb();
    console.log(db)
    db.collection('user').add({
      data: {
        userinfo:wx.getStorageSync("userInfo"),
        due: DATE,
        openid:wx.getStorageSync("OPENID")
      },
      success(res) {
        console.log(res)
      }
    })
  },

  onLoad: function (options) {
    
  },
//------------------------------------------------
  /**
   * 生命周期函数--监听页面显示
   */
  login:function(){
    wx.cloud.callFunction({
      name: 'user',
      complete: res => {
        wx.setStorageSync("OPENID", res.result.OPENID);
      }
    })
  },
  onShow: function () {
    this.checkstate();
    this.login();
  },

  to_order_list:function(order_Type){
    wx.navigateTo({
      url: '../order_list/order_list?type='+order_Type,
      success: function(res) {console.log("nav_to"+order_Type)},
    })
  },
  to_my_history_order:function(){
    this.to_order_list("my_history_order");
  },
  to_my_history_sender: function () {
    this.to_order_list("my_history_sender");
  },
  to_my_order: function () {
    this.to_order_list("my_order");
  },
  to_my_sender: function () {
    this.to_order_list("my_sender");
  }

})