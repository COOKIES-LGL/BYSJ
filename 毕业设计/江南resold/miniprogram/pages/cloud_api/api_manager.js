

import { Api } from './api.js'
import { Base } from "../base/common.js"
const base = new Base

class cloudapi {
   constructor() {
      "use strict"
      this._db = base.setdb();
   }
   addNavImages(param, navImageListId){//添加轮播图
      var that = this;
      this._db.collection('rankList').where({
         _openid: wx.getStorageSync("OPENID")
      }).get().then(res => {
         if(res.data.length>0){
            this._db.collection('rankList').doc(navImageListId).update({//新用户
               data: {
                  imageUrl: param,
               },
               success(res) {
                  console.log(res);
                  // callback();
               }
            })  
         }else{
            this._db.collection('rankList').add({//新用户
               data: {
                  imageUrl: param,
               },
               success(res) {
                  console.log(res);
                  // callback();
               }
            })  
         }
      })
   }

   queryNavImages(callback){//查询轮播图片
      this._db.collection('rankList').where({
         _openid: wx.getStorageSync("OPENID")
      }).get().then(res => {
         callback(res.data);
      })
   }

   queryFeedback(callback) {//意见反馈
      var that = this;
      this._db.collection('recommendList').orderBy('sendTime', 'desc').get().then(res => {
         callback(res.data);
      }).catch(res => {
         console.log(res);
      })
   }
   
   queryUserInfo(callback){//用户信息统计
      this._db.collection('user').get().then(res => {
         callback(res.data);
      })
   }

   queryappUserInfo(callback2) {//用户信息统计
      this._db.collection('appUserInfo').get().then(res => {
         callback2(res.data);
      })
   }

   queryOrderInfo1(callback){//订单信息统计  当前发布
      this._db.collection('sendOrders').where({
         goodsStatus:0
      }).get().then(res => {
         callback(res.data);
      })
   }
   queryOrderInfo2(callback) {//订单信息统计  已预约
      this._db.collection('sendOrders').where({
         goodsStatus: 1
      }).get().then(res => {
         callback(res.data);
      })
   }
   queryOrderInfo3(callback) {//订单信息统计  已完结
      this._db.collection('sendOrders').where({
         goodsStatus: 2
      }).get().then(res => {
         callback(res.data);
      })
   }

   queryAllMessage(callback) {//所有用户留言信息
      this._db.collection('messageList').get().then(res => {
         callback(res.data);
      })
   }

}

export { cloudapi }
