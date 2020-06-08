

import { Api } from './api.js'
import { Base } from "../base/common.js"
const base = new Base

class cloudapi{
   constructor() {
      "use strict"
      this._db = base.setdb();
   }
   getUserDate(param,callback){
      this._db.collection('user').where({
         _openid: param
      }).get().then(res => {
         if (res.data.length > 0) {//已注册过的用户
            callback(res.data);
         } else {
            return
         }
      }).catch(res => {
         console.log(res);
      })    
   }
   saveUserData(param) {//添加用户数据
     var that = this;
     var date = new Date();
     this._db.collection('user').where({
        _openid: wx.getStorageSync("OPENID")
     }).get().then(res => {
        if(res.data.length>0){//已注册过的用户
           return;
        }else{
           this._db.collection('user').add({//新用户
              data: {
                 userinfo: param,
                 registTime: date.toLocaleString(),
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
   sendFeedback(param,callback){//意见反馈
      var that = this;
      var datetime = (new Date()).toLocaleString();
      this._db.collection('recommendList').where({
         _openid: wx.getStorageSync("OPENID")
      }).get().then(res => {
         this._db.collection('recommendList').add({//新用户
            data: {
               detail: param.detail,
               senderNickname: param.senderNickname,
               senderGender: param.senderGender,
               senderimageUrl: param.senderimageUrl,
               senderPhone: param.senderPhone,
               sendTime: datetime,
            },
            success(res) {
               console.log(res);
               callback();
            }
         })
      }).catch(res => {
         console.log(res);
         callback();
      })    
   }
   
   querySendMessage(callback) {//查看我的留言列表
      var that = this;
      this._db.collection('messageList').where({
         sender_openid: wx.getStorageSync("OPENID"),
      }).get().then(res => {
         callback(res);
      })
   }

   queryRecceiveMessage(callback) {//查看我的私信列表
      var that = this;
      this._db.collection('messageList').where({
         sender_openid: wx.getStorageSync("OPENID"),
      }).get().then(res => {
         callback(res);
      })
   }

   queryMessageList(param,callback){//查看信息列表
      var that = this;
      this._db.collection('messageList').where({
         sender_openid: param.sender_openid,
         receiver_openid: param.receiver_openid,
      }).get().then(res => {
         callback(res);
      })
   }
   sendMessageList(param,callback,_id) {//意见反馈
      var that = this;
      this._db.collection('messageList').where({
         sender_openid: param.sender_openid,
         receiver_openid: param.receiver_openid,   
      }).get().then(res => {
         if(res.data.length>0){//更新
            this._db.collection('messageList').doc(_id).update({
               data: {
                  messageList: param.messageList,
               },
               success(res) {
                  callback();
               },
               fail(res) {
                  console.log(res, "更新失败！")
               }
            })
         }else{
            this._db.collection('messageList').add({//新增
               data: {
                  sender_openid:param.sender_openid,
                  sender_avatarUrl:param.sender_avatarUrl,
                  sender_nickName: param.sender_nickName,
                  receiver_openid:param.receiver_openid,
                  receiver_avatarUrl:param.receiver_avatarUrl,
                  receiver_nickName: param.receiver_nickName,
                  messageList:param.messageList,
               },
               success(res) {
                  console.log(res);
                  callback(res);
               }
            })
         }
      }).catch(res => {
         console.log(res);
         callback();
      })
   }

   saveAppUserInfo(obj,_id,callback,callback2){//保存用户平台信息
      this._db.collection('appUserInfo').where({
         _openid: wx.getStorageSync("OPENID")
      }).get().then(res => {
         if (res.data.length > 0) {//已填写过的表单用户
            wx.cloud.callFunction({
               name: 'updateData',
               data: {
                  action: 'update_appUserInfo',
                  formData: obj,
                  _id:_id
               },
               success:res=>{
                  wx.hideLoading();
                  callback2();
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
                  callback2();
                  callback(true, "表单提交成功!", "确认");
               }
            })
         }
      }).catch(res => {
         console.log(res);
      })     
   }

   updateHeartNum(num,_id) {//更新点赞数据
      wx.cloud.callFunction({
         name: 'updateData',
         data:{
            action: 'update_heartNum',
            heartNum:num,
            _id:_id
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
            receive_openid: wx.getStorageSync("OPENID"),
            goodsStatus: 1
         }
      ).count({
         success: function (res) {
            const batchTimes = Math.ceil(res.total / obj.pageSize)
            //可取的次数
            if (obj.pageNum < batchTimes) {
               that._db.collection('sendOrders').where({
                  receive_openid: wx.getStorageSync("OPENID"),
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
   getHisOrder(obj, callback) {//获取进行中订单
      var that = this;
      this._db.collection('sendOrders').where(
         {
            _openid: obj.openId,
            goodsStatus: 0
         }
      ).count({
         success: function (res) {
            const batchTimes = Math.ceil(res.total / obj.pageSize)
            //可取的次数
            if (obj.pageNum < batchTimes) {
               that._db.collection('sendOrders').where({
                  _openid: obj.openId,
                  goodsStatus: 0
               })
                  .skip(obj.pageNum * obj.pageSize)
                  .limit(obj.pageSize)
                  .orderBy('releaseTime', 'desc')
                  .get().then(res => {
                     if (res.data.length > 0) {//更新订单表单
                        var oldData = wx.getStorageSync("hisOrderList");
                        var newData = [];
                        if (oldData.length > 0) {
                           newData = oldData.concat(res.data);
                        } else {
                           newData = res.data;
                        }
                        wx.setStorageSync("hisOrderList", newData);
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
   
   querycustomizeLabel(openId,callback) {//查询用户平台信息
      this._db.collection('customizeLabel').where({
         _openid: openId
      }).get({
         success: res => {
            wx.setStorageSync("customizeLabel", res.data);
            console.log('[数据库] [查询记录] 成功: ', res.data);
            callback();
         },
         fail: err => {
            console.error('[数据库] [查询记录] 失败：', err)
         }
      })
   }

   savecustomizeLabel(obj, callback2,_openid,_id) {//保存用户标签
      this._db.collection('customizeLabel').where({
         _openid: _openid
      }).get().then(res => {
         if (res.data.length > 0) {//已填写过的表单用户
            wx.cloud.callFunction({
               name: 'updateData',
               data: {
                  action: 'update_customizeLabel',
                  formData: obj,
                  _id: _id,
                  _openid:_openid,
               },
               success: res => {
                  wx.hideLoading();
                  callback2();
                  // wx:wx.showToast({
                  //    title: '已保存',
                  //    duration: 800,
                  //    mask: true,
                  // })
               },
               fail: err => {
                  wx.hideLoading();
                  console.error('[云函数] [login] 调用失败', err)
               }
            })
         } else {
            this._db.collection('customizeLabel').add({//新用户 新建表单
               data: {
                  heartNum: obj.heartNum,
                  birstday: obj.birstday,
                  interest: obj.interest,
                  music: obj.music,
                  application: obj.application,
               },
               success(res) {
                  callback2();
               }
            })
         }
      }).catch(res => {
         console.log(res);
      })
   }
}
  
export { cloudapi }
