

import { Api } from './api.js'
import { Base } from "../base/common.js"
const base = new Base

class cloudapi {
   constructor() {
      "use strict"
      this._db = base.setdb();
   }

   sendOrder(obj, callback) {
      this._db.collection('sendOrders').add({//新建表单
         data: {
            goodsName: obj.goodsName,
            goodsTitle: obj.goodsTitle,
            goodsType: obj.goodsType,
            goodsImage: obj.goodsImage,
            goodsMaxprice: obj.goodsMaxprice,
            goodsMinprice: obj.goodsMinprice,
            goodsNum:obj.goodsNum,
            goodsremark: obj.goodsremark,
            goodsphone: obj.goodsphone,
            goodswechat: obj.goodswechat,
            send_nickname: obj.send_nickname,
            send_avatarUrl: obj.send_avatarUrl,
            sender_gender: obj.sender_gender,
            sender_openid: obj.sender_openid,
            releaseTime: obj.releaseTime,
            goodsStatus: 0,
         },
         success(res) {
            callback();
         }
      })   
   }
   getOrderTypeList(obj, callback) {
      this._db.collection('sendOrders').where({
         goodsTitle: obj.searchMesg
      }).get().then(res => {
         if (res.data.length > 0) {//更新订单表单
           wx.setStorageSync(key, data)
         } else {
           
         }
      }).catch(res => {
         console.log(res);
      })
   }
   getOrderList(obj, callback) {
      this._db.collection('sendOrders').where({
         goodsType: obj.searchMesg
      }).get().then(res => {
         if (res.data.length > 0) {//更新订单表单
            wx.setStorageSync(key, data)
         } else {

         }
      }).catch(res => {
         console.log(res);
      })
   }
   getSelfOrderList(obj, callback) {
      this._db.collection('sendOrders').where({
         _openid: wx.getStorageSync("OPENID")
      }).get().then(res => {
         if (res.data.length > 0) {//更新订单表单
            wx.setStorageSync(key, data)
         } else {

         }
      }).catch(res => {
         console.log(res);
      })
   }
}

export { cloudapi }
