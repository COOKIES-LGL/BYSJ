

import { Api } from './api.js'
import { Base } from "../base/common.js"
const base = new Base

class cloudapi{
  constructor() {
    "use strict"
     this._db = base.setdb();
  }
  

   saveUserData(param) {//添加用户数据
     var that = this;
     var DATE = base.formatDate(new Date());
     this._db.collection('user').where({
        _openid: wx.getStorageSync("OPENID")
     }).get().then(res => {
        if(res.data.length>0){//已注册过的用户
           return;
        }else{
           db.collection('user').add({//新用户
              data: {
                 userinfo: param,
                 registTime: DATE,
              },
              success(res) {
                 console.log(res)
              }
           })
        }
     }).catch (res=> {
        console.log(res);
     })    
   }

   saveAppUserInfo(obj,callback){//保存用户平台信息
      this._db.collection('appUserInfo').where({
         _openid: wx.getStorageSync("OPENID")
      }).get().then(res => {
         if (res.data.length > 0) {//已填写过的表单用户
            wx.cloud.callFunction({
               name: 'updateData',
               data: {
                  action: 'update_appUserInfo',
                  formData: obj,
               },
               success:res=>{
                  wx.hideLoading();
                  callback(true, "表单提交成功!", "确认");
               },
               fail: err => {
                  wx.hideLoading();
                  console.error('[云函数] [login] 调用失败', err)
               }
            })
         } else {
            this._db.collection('appUserInfo').add({//新用户 新建表单
               data: {
                  heartNum: 0,
                  phone: obj.input_phone,
                  wechat:obj.input_wechat,
                  college:obj.collegeValue,
                  major: obj.majorValue,
                  grade:obj.radio_group                  
               },
               success(res) {
                  wx.hideLoading();
                  wx.setStorageSync("appUserInfo", data);
                  callback(true, "表单提交成功!", "确认");
               }
            })
         }
      }).catch(res => {
         console.log(res);
      })     
   }

   updateHeartNum(num) {//更新点赞数据
      wx.cloud.callFunction({
         name: 'updateData',
         data:{
            action: 'update_heartNum',
            heartNum:num
         },
         success:res=>{
            console.log('[云函数] [login] 调用成功', res)
         },
         fail: err => {
            console.error('[云函数] [login] 调用失败', err)
         }
      })
   
   }

   queryAppUserInfo(callback){//查询用户平台信息
      this._db.collection('appUserInfo').where({
         _openid: wx.getStorageSync("OPENID")
      }).get({  
         success: res => {
            wx.setStorageSync("appUserInfo", res.data);
            console.log('[数据库] [查询记录] 成功: ', res.data);
            callback();
         },
         fail: err => {
            console.error('[数据库] [查询记录] 失败：', err)
         }
      })
   }
   
   getOrderIng(obj, callback) {//获取进行中订单
      var that = this;
      this._db.collection('sendOrders').where(
         {
            receiver_openid: wx.getStorageSync("OPENID"),
            goodsStatus: 1
         }
      ).count({
         success: function (res) {
            const batchTimes = Math.ceil(res.total / obj.pageSize)
            //可取的次数
            if (obj.pageNum < batchTimes) {
               that._db.collection('sendOrders').where({
                  receiver_openid: wx.getStorageSync("OPENID"),
                  goodsStatus: 1
               })
                  .skip(obj.pageNum * obj.pageSize)
                  .limit(obj.pageSize)
                  .orderBy('releaseTime', 'desc')
                  .get().then(res => {
                     if (res.data.length > 0) {//更新订单表单
                        var oldData = wx.getStorageSync("selfOrderList");
                        var newData = [];
                        if (oldData.length > 0) {
                           newData = oldData.concat(res.data);
                        } else {
                           newData = res.data;
                        }
                        wx.setStorageSync("selfOrderList", newData);
                        wx.hideLoading();
                        callback(++obj.pageNum, newData);
                     } else {
                        callback(0);
                     }
                  }).catch(res => {
                     console.log(res);
                     callback(0);
                     wx.hideLoading();
                  })
            } else {
               callback(0);
               wx.hideLoading();
            }
         }
      })
   }

   getSelfOrderList(obj, callback) {//获取本人订单
      var that = this;
      this._db.collection('sendOrders').where(
         { 
            goodsType: obj.searchMesg,
            _openid: wx.getStorageSync("OPENID"),
            goodsStatus:0  
         }
      ).count({
         success: function (res) {
            const batchTimes = Math.ceil(res.total / obj.pageSize)
            //可取的次数
            if (obj.pageNum < batchTimes) {
               that._db.collection('sendOrders').where({
                  goodsType: obj.searchMesg,
                  _openid: wx.getStorageSync("OPENID"),
                  goodsStatus: 0  
               })
               .skip(obj.pageNum * obj.pageSize)
               .limit(obj.pageSize)
               .orderBy('releaseTime', 'desc')
               .get().then(res => {
                  if (res.data.length > 0) {//更新订单表单
                        var oldData = wx.getStorageSync("selfOrderList");
                        var newData = [];
                        if (oldData.length > 0) {
                           newData = oldData.concat(res.data);
                        } else {
                           newData = res.data;
                        }
                        wx.setStorageSync("selfOrderList", newData);
                        wx.hideLoading();
                        callback(++obj.pageNum, newData);
                  } else {
                     callback(0);
                  }
               }).catch(res => {
                  console.log(res);
                  callback(0);
                  wx.hideLoading();
               })
            } else {
               callback(0);
               wx.hideLoading();
            }
         }
      })
   }

   getHistoryOrderList1(obj, callback) {//获取本人历史发单
      var that = this;
      this._db.collection('sendOrders').where(
         { 
           sender_openid: wx.getStorageSync("OPENID"),
           goodsStatus: obj.goodsStatus, 
         }
      ).count({
         success: function (res) {
            const batchTimes = Math.ceil(res.total / obj.pageSize)
            //可取的次数
            if (obj.pageNum < batchTimes) {
               that._db.collection('sendOrders').where({                  
                  sender_openid: wx.getStorageSync("OPENID"),
                  goodsStatus: obj.goodsStatus,
               })
                  .skip(obj.pageNum * obj.pageSize)
                  .limit(obj.pageSize)
                  .orderBy('releaseTime', 'desc')
                  .get().then(res => {
                     if (res.data.length > 0) {//更新订单表单
                        var oldData = wx.getStorageSync("selfOrderList");
                        var newData = [];
                        if (oldData.length > 0) {
                           newData = oldData.concat(res.data);
                        } else {
                           newData = res.data;
                        }
                        wx.setStorageSync("selfOrderList", newData);
                        wx.hideLoading();
                        callback(++obj.pageNum, newData);
                     } else {
                        callback(0);
                     }
                  }).catch(res => {
                     console.log(res);
                     callback(0);
                     wx.hideLoading();
                  })
            } else {
               callback(0);
               wx.hideLoading();
            }
         }
      })
   }

   getHistoryOrderList2(obj, callback) {//获取本人历史接单
      var that = this;
      this._db.collection('sendOrders').where(
         {
            receiver_openid: wx.getStorageSync("OPENID"),
            goodsStatus: obj.goodsStatus,
         }
      ).count({
         success: function (res) {
            const batchTimes = Math.ceil(res.total / obj.pageSize)
            //可取的次数
            if (obj.pageNum < batchTimes) {
               that._db.collection('sendOrders').where({
                  sender_openid: wx.getStorageSync("OPENID"),
                  goodsStatus: obj.goodsStatus,
               })
                  .skip(obj.pageNum * obj.pageSize)
                  .limit(obj.pageSize)
                  .orderBy('releaseTime', 'desc')
                  .get().then(res => {
                     if (res.data.length > 0) {//更新订单表单
                        var oldData = wx.getStorageSync("selfOrderList");
                        var newData = [];
                        if (oldData.length > 0) {
                           newData = oldData.concat(res.data);
                        } else {
                           newData = res.data;
                        }
                        wx.setStorageSync("selfOrderList", newData);
                        wx.hideLoading();
                        callback(++obj.pageNum, newData);
                     } else {
                        callback(0);
                     }
                  }).catch(res => {
                     console.log(res);
                     callback(0);
                     wx.hideLoading();
                  })
            } else {
               callback(0);
               wx.hideLoading();
            }
         }
      })
   }
}
  
export { cloudapi }
