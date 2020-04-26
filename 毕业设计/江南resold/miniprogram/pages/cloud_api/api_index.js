

import { Api } from './api.js'
import { Base } from "../base/common.js"
const base = new Base

class cloudapi {
   constructor() {
      "use strict"
      this._db = base.setdb();
      this._ = this._db.command;
   }

   getOrderTypeList(obj, callback) {
      var that = this;
      this._db.collection('sendOrders').where({
         goodsType: obj.searchMesg,
         goodsStatus:0,
      }).count({
         success: function (res) {
            const batchTimes = Math.ceil(res.total / obj.pageSize)
            //可取的次数
            if (obj.pageNum < batchTimes) {
               that._db.collection('sendOrders').where({
                  goodsType: obj.searchMesg,
                  goodsStatus: 0,
               })
               .skip(obj.pageNum * obj.pageSize)
               .limit(obj.pageSize)
               .orderBy('releaseTime', 'desc')
               .get().then(res => {
                  if (res.data.length > 0) {//更新订单表单
                     if (obj.searchMesg == "卖物") {
                        var oldData = wx.getStorageSync("sellOrderList");
                        var newData = [];
                        if (oldData.length > 0) {
                           newData = oldData.concat(res.data);
                        } else {
                           newData = res.data;
                        }
                        wx.setStorageSync("sellOrderList", newData);
                        wx.hideLoading();
                        callback(++obj.pageNum,newData);
                     } else {
                        var oldData = wx.getStorageSync("bookOrderList");
                        var newData = [];
                        if (oldData.length > 0) {
                           newData = oldData.concat(res.data);
                        } else {
                           newData = res.data;
                        }
                        wx.setStorageSync("bookOrderList", newData);
                        wx.hideLoading();
                        callback(++obj.pageNum,newData);
                     }
                  }else{
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
   getOrdercollegeList(obj, callback) {//教材资料/寝室用品//三方服务//其它
      var that = this;
      this._db.collection('sendOrders').where({
         goodsTitle: obj.goodsTitle,
         goodsType: obj.searchMesg,
         goodscollege: obj.college,
         goodsStatus: 0,
      }).count({
         success: function (res) {
            const batchTimes = Math.ceil(res.total / obj.pageSize)
            //可取的次数
            if (obj.pageNum < batchTimes) {
               that._db.collection('sendOrders').where({
                  goodsType: obj.searchMesg,
                  goodsTitle: obj.goodsTitle,
                  goodscollege: obj.college,
                  goodsStatus: 0,
               })
                  .skip(obj.pageNum * obj.pageSize)
                  .limit(obj.pageSize)
                  .orderBy('releaseTime', 'desc')
                  .get().then(res => {
                     if (res.data.length > 0) {//更新订单表单
                        if (obj.searchMesg == "卖物") {
                           var oldData = wx.getStorageSync("TopsellOrderList");
                           var newData = [];
                           if (oldData.length > 0) {
                              newData = oldData.concat(res.data);
                           } else {
                              newData = res.data;
                           }
                           wx.setStorageSync("TopsellOrderList", newData);
                           wx.hideLoading();
                           callback(++obj.pageNum, newData);
                        } else {
                           var oldData = wx.getStorageSync("TopbookOrderList");
                           var newData = [];
                           if (oldData.length > 0) {
                              newData = oldData.concat(res.data);
                           } else {
                              newData = res.data;
                           }
                           wx.setStorageSync("TopbookOrderList", newData);
                           wx.hideLoading();
                           callback(++obj.pageNum, newData);
                        }
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
   getOrderMajorList(obj, callback) {//教材资料/寝室用品//三方服务//其它
      var that = this;
      this._db.collection('sendOrders').where({
         goodsTitle: obj.goodsTitle,
         goodsType: obj.searchMesg,
         goodsmajor: obj.major,
         goodsStatus: 0,
      }).count({
         success: function (res) {
            const batchTimes = Math.ceil(res.total / obj.pageSize)
            //可取的次数
            if (obj.pageNum < batchTimes) {
               that._db.collection('sendOrders').where({
                  goodsType: obj.searchMesg,
                  goodsTitle: obj.goodsTitle,
                  goodsmajor: obj.major,
                  goodsStatus: 0,
               })
               .skip(obj.pageNum * obj.pageSize)
               .limit(obj.pageSize)
               .orderBy('releaseTime', 'desc')
               .get().then(res => {
                  if (res.data.length > 0) {//更新订单表单
                     if (obj.searchMesg == "卖物") {
                        var oldData = wx.getStorageSync("TopsellOrderList");
                        var newData = [];
                        if (oldData.length > 0) {
                           newData = oldData.concat(res.data);
                        } else {
                           newData = res.data;
                        }
                        wx.setStorageSync("TopsellOrderList", newData);
                        wx.hideLoading();
                        callback(++obj.pageNum, newData);
                     } else {
                        var oldData = wx.getStorageSync("TopbookOrderList");
                        var newData = [];
                        if (oldData.length > 0) {
                           newData = oldData.concat(res.data);
                        } else {
                           newData = res.data;
                        }
                        wx.setStorageSync("TopbookOrderList", newData);
                        wx.hideLoading();
                        callback(++obj.pageNum, newData);
                     }
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

   getOrderTopList(obj, callback) {//教材资料/寝室用品//三方服务//其它
      var that = this;
      this._db.collection('sendOrders').where({
         goodsTitle: obj.goodsTitle,
         goodsType: obj.searchMesg,
         goodsStatus: 0,
      }).count({
         success: function (res) {
            const batchTimes = Math.ceil(res.total / obj.pageSize)
            //可取的次数
            if (obj.pageNum < batchTimes) {
               that._db.collection('sendOrders').where({
                  goodsType: obj.searchMesg,
                  goodsTitle: obj.goodsTitle,
                  goodsStatus: 0,
               })
                  .skip(obj.pageNum * obj.pageSize)
                  .limit(obj.pageSize)
                  .orderBy('releaseTime', 'desc')
                  .get().then(res => {
                     if (res.data.length > 0) {//更新订单表单
                        if (obj.searchMesg == "卖物") {
                           var oldData = wx.getStorageSync("TopsellOrderList");
                           var newData = [];
                           if (oldData.length > 0) {
                              newData = oldData.concat(res.data);
                           } else {
                              newData = res.data;
                           }
                           wx.setStorageSync("TopsellOrderList", newData);
                           wx.hideLoading();
                           callback(++obj.pageNum, newData);
                        } else {
                           var oldData = wx.getStorageSync("TopbookOrderList");
                           var newData = [];
                           if (oldData.length > 0) {
                              newData = oldData.concat(res.data);
                           } else {
                              newData = res.data;
                           }
                           wx.setStorageSync("TopbookOrderList", newData);
                           wx.hideLoading();
                           callback(++obj.pageNum, newData);
                        }
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

   getOrderList(obj, callback) {
      var that = this;
      this._db.collection('sendOrders').where({
         goodsName:obj.goodsName,
         goodsType: obj.searchMesg,
         goodsStatus: 0,       
      }).count({
         success: function (res) {
            const batchTimes = Math.ceil(res.total / obj.pageSize)
            //可取的次数
            if (obj.pageNum < batchTimes) {
               that._db.collection('sendOrders').where({
                  goodsName: obj.goodsName,
                  goodsType: obj.searchMesg,
                  goodsStatus: 0,
               })
                  .skip(obj.pageNum * obj.pageSize)
                  .limit(obj.pageSize)
                  .orderBy('releaseTime', 'desc')
                  .get().then(res => {
                     if (res.data.length > 0) {//更新订单表单
                        if (obj.searchMesg == "卖物") {
                           var oldData = wx.getStorageSync("searchSellOrderList");
                           var newData = [];
                           if (oldData.length > 0) {
                              newData = oldData.concat(res.data);
                           } else {
                              newData = res.data;
                           }
                           wx.setStorageSync("searchSellOrderList", newData);
                           wx.hideLoading();
                           callback(++obj.pageNum, newData);
                        } else {
                           var oldData = wx.getStorageSync("searchBookOrderList");
                           var newData = [];
                           if (oldData.length > 0) {
                              newData = oldData.concat(res.data);
                           } else {
                              newData = res.data;
                           }
                           wx.setStorageSync("searchBookOrderList", newData);
                           wx.hideLoading();
                           callback(++obj.pageNum, newData);
                        }
                     } else {
                        callback(0);
                     }
                  }).catch(res => {
                     wx.hideLoading();
                     callback(0);
                  })
            } else {
               wx.hideLoading();
               callback(0);   
            }
         }
      })
   }
   
  
}

export { cloudapi }
