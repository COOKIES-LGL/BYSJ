

import { Api } from './api.js'
import { Base } from "../base/common.js"
const base = new Base

class cloudFocusapi {
   constructor() {
      "use strict"
      this._db = base.setdb();
   }

   addFocus(param, callback) {//添加关注
      var that = this;
      var date = new Date();
      this._db.collection('focusMap').add({//新用户
         data: {
            focus_openid: param.focus_openid,
            focus_nickname: param.focus_nickname,
            focus_avatarUrl: param.focus_avatarUrl,
            focused_openid: param.focused_openid,
            focused_nickname: param.focused_nickname,
            focused_avatarUrl: param.focused_avatarUrl,
            focusTime: date.toLocaleString()
         },
         success(res) {
            console.log(res);
            callback();
         }
      })
   }
   removeFocus(focused_openid , callback) {//移除关注
      var that = this;
      var DATE = base.formatDate(new Date());
      this._db.collection('focusMap').doc(focused_openid).remove({
         success(res) {
            console.log(res);
            callback();
         }
      })
   }
   checkFocus(focused_openid,callback){
      this._db.collection('focusMap').where({
         _openid: wx.getStorageSync("OPENID"),
         focused_openid: focused_openid
      }).get().then(res => {
         if (res.data.length > 0) {//更新订单表单
            callback("取消关注",res.data[0]);
         } else {
            callback("关注");
         }
      }).catch(res => {
         console.log(res);
      })
   }
   getFocusList(callback) {
      this._db.collection('focusMap').where({
         _openid:wx.getStorageSync("OPENID")
      }).get().then(res => {
         if (res.data.length > 0) {//更新订单表单
            callback(res.data);
         } else {
            wx.hideLoading();
            return
         }
      }).catch(res => {
         console.log(res);
      })
   }
   getFocusedList(callback) {
      this._db.collection('focusMap').where({
         focused_openid: wx.getStorageSync("OPENID")
      }).get().then(res => {
         if (res.data.length > 0) {//更新订单表单
            callback(res.data);
         } else {
            wx.hideLoading();
            return
         }
      }).catch(res => {
         console.log(res);
      })
   }
}

export { cloudFocusapi }
